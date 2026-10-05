import { createWriteStream } from 'node:fs';
import PDFDocument from 'pdfkit';
import { dictFor, type AuditDict } from './i18n';
import { tierFor } from './score';
import type { AuditReport, Check, CheckStatus } from './types';

const COLORS = {
  ink: '#16150f',
  muted: '#6b6859',
  line: '#e4dfd2',
  paper: '#f8f5ee',
  accent: '#c84b31',
  pass: '#3e6b4f',
  warn: '#c9962b',
  fail: '#c84b31',
  info: '#6b6859',
};

const PAGE = { width: 595.28, height: 841.89, margin: 48 };

/** Genera el informe PDF (A4) a partir de un AuditReport. */
export class PdfRenderer {
  private readonly doc: PDFKit.PDFDocument;
  private readonly t: AuditDict['report'];

  constructor(private readonly report: AuditReport) {
    this.doc = new PDFDocument({ size: 'A4', margin: PAGE.margin, bufferPages: true, info: { Title: `${report.business} — audit`, Author: 'Obrim' } });
    this.t = dictFor(report.lang).report;
  }

  async writeTo(path: string): Promise<void> {
    const stream = createWriteStream(path);
    const done = new Promise<void>((resolve, reject) => {
      stream.on('finish', () => resolve());
      stream.on('error', reject);
    });
    this.doc.pipe(stream);
    this.render();
    this.doc.end();
    await done;
  }

  private render(): void {
    this.header();
    if (this.report.fetch.status === 0) {
      this.unreachable();
    } else {
      this.scoreBlock();
      this.recommendations();
      this.doc.addPage();
      this.findings();
    }
    this.nextStep();
    this.footers();
  }

  private get contentWidth(): number {
    return PAGE.width - PAGE.margin * 2;
  }

  // ---------- bloques ----------

  private header(): void {
    const { doc, t, report } = this;
    doc.rect(0, 0, PAGE.width, 110).fill(COLORS.ink);
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(22).text('obrim.', PAGE.margin, 34);
    doc.font('Helvetica').fontSize(10).fillColor('#cfcabd').text(t.title.toUpperCase(), PAGE.margin, 64, { characterSpacing: 1.5 });
    doc.fontSize(9).fillColor('#cfcabd').text(t.subtitle, PAGE.margin, 80, { width: this.contentWidth });

    doc.fillColor(COLORS.ink);
    const top = 130;
    const col = this.contentWidth / 3;
    this.meta(t.business, report.business, PAGE.margin, top, col);
    this.meta(t.url, report.finalUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''), PAGE.margin + col, top, col * 1.3);
    this.meta(t.date, formatDate(report.generatedAt, report.lang), PAGE.margin + col * 2.3, top, col * 0.7);
    doc.moveTo(PAGE.margin, top + 40).lineTo(PAGE.width - PAGE.margin, top + 40).strokeColor(COLORS.line).lineWidth(1).stroke();
    doc.y = top + 56;
  }

  private meta(label: string, value: string, x: number, y: number, width: number): void {
    this.doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.muted).text(label.toUpperCase(), x, y, { width, characterSpacing: 1 });
    this.doc.font('Helvetica-Bold').fontSize(10.5).fillColor(COLORS.ink).text(value, x, y + 12, { width, ellipsis: true, lineBreak: false });
  }

  private unreachable(): void {
    const { doc, t, report } = this;
    const y = doc.y + 10;
    doc.roundedRect(PAGE.margin, y, this.contentWidth, 120, 10).fill('#fbeae5');
    doc.fillColor(COLORS.fail).font('Helvetica-Bold').fontSize(18).text(t.unreachableTitle, PAGE.margin + 20, y + 22, { width: this.contentWidth - 40 });
    doc.fillColor(COLORS.ink).font('Helvetica').fontSize(10.5).text(t.unreachableBody, PAGE.margin + 20, y + 54, { width: this.contentWidth - 40 });
    doc.fillColor(COLORS.muted).fontSize(9).text(report.fetch.error ?? '', PAGE.margin + 20, y + 94, { width: this.contentWidth - 40 });
    doc.y = y + 150;
  }

  private scoreBlock(): void {
    const { doc, t, report } = this;
    const y = doc.y;
    const boxH = 170;
    doc.roundedRect(PAGE.margin, y, this.contentWidth, boxH, 12).fill(COLORS.paper);

    // círculo de puntuación
    const cx = PAGE.margin + 80;
    const cy = y + boxH / 2;
    const r = 52;
    doc.lineWidth(9).strokeColor('#e8e3d6').circle(cx, cy, r).stroke();
    if (report.score > 0) {
      const end = -Math.PI / 2 + (report.score / 100) * Math.PI * 2;
      doc.lineCap('round').strokeColor(scoreColor(report.score)).arc(cx, cy, r, -Math.PI / 2, end, false).stroke();
    }
    doc.fillColor(COLORS.ink).font('Helvetica-Bold').fontSize(34).text(String(report.score), cx - 40, cy - 22, { width: 80, align: 'center' });
    doc.font('Helvetica').fontSize(8).fillColor(COLORS.muted).text('/ 100', cx - 40, cy + 16, { width: 80, align: 'center' });

    // texto y barras por categoría
    const tx = cx + r + 36;
    const tw = PAGE.width - PAGE.margin - tx - 20;
    doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.muted).text(t.scoreLabel.toUpperCase(), tx, y + 18, { characterSpacing: 1 });
    doc.font('Helvetica-Bold').fontSize(14).fillColor(scoreColor(report.score)).text(t.tiers[tierFor(report.score)], tx, y + 30, { width: tw });

    let by = y + 60;
    for (const cat of report.categories) {
      doc.font('Helvetica').fontSize(8.5).fillColor(COLORS.ink).text(t.categories[cat.category], tx, by, { width: tw - 40, lineBreak: false });
      doc.font('Helvetica-Bold').text(`${cat.score}`, tx + tw - 30, by, { width: 30, align: 'right' });
      const barY = by + 12;
      doc.roundedRect(tx, barY, tw, 4, 2).fill('#e8e3d6');
      if (cat.score > 0) doc.roundedRect(tx, barY, Math.max(4, (tw * cat.score) / 100), 4, 2).fill(scoreColor(cat.score));
      by += 18;
    }
    doc.y = y + boxH + 22;
  }

  private recommendations(): void {
    const { doc, t, report } = this;
    this.sectionTitle(t.recommendations, t.recommendationsIntro);
    report.recommendations.forEach((check, i) => {
      const y = doc.y;
      const numW = 26;
      doc.circle(PAGE.margin + 10, y + 9, 10).fill(COLORS.ink);
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(9.5).text(String(i + 1), PAGE.margin, y + 4, { width: 20, align: 'center' });
      doc.fillColor(COLORS.ink).font('Helvetica-Bold').fontSize(10.5).text(check.title, PAGE.margin + numW + 6, y + 2, { width: this.contentWidth - numW - 6 });
      doc.font('Helvetica').fontSize(9.5).fillColor(COLORS.muted).text(check.detail, PAGE.margin + numW + 6, doc.y + 1, { width: this.contentWidth - numW - 6 });
      doc.y += 10;
    });
  }

  private findings(): void {
    const { doc, t, report } = this;
    this.sectionTitle(t.findings);
    for (const cat of report.categories) {
      this.ensureSpace(60);
      const y = doc.y;
      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.ink).text(t.categories[cat.category], PAGE.margin, y, { continued: true });
      doc.font('Helvetica').fillColor(scoreColor(cat.score)).text(`  ${cat.score}/100`);
      doc.moveTo(PAGE.margin, doc.y + 4).lineTo(PAGE.width - PAGE.margin, doc.y + 4).strokeColor(COLORS.line).lineWidth(0.8).stroke();
      doc.y += 10;
      for (const check of cat.checks) this.findingRow(check);
      doc.y += 8;
    }
    if (report.psi && report.psi.performanceScore !== null) this.psiBlock();
  }

  private findingRow(check: Check): void {
    const { doc, t } = this;
    this.ensureSpace(34);
    const y = doc.y;
    const labelW = 150;
    const dotX = PAGE.margin + 5;
    doc.circle(dotX, y + 6, 4).fill(statusColor(check.status));
    doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.ink).text(check.title, PAGE.margin + 16, y, { width: labelW - 16 });
    const titleEnd = doc.y;
    doc.font('Helvetica').fontSize(7).fillColor(statusColor(check.status)).text(t.status[check.status].toUpperCase(), PAGE.margin + 16, titleEnd, { characterSpacing: 0.8 });
    const leftEnd = doc.y;
    doc.font('Helvetica').fontSize(9).fillColor(COLORS.muted).text(check.detail, PAGE.margin + labelW + 10, y, { width: this.contentWidth - labelW - 10 });
    doc.y = Math.max(leftEnd, doc.y) + 7;
  }

  private psiBlock(): void {
    const { doc, t, report } = this;
    const psi = report.psi!;
    this.ensureSpace(90);
    const y = doc.y + 6;
    doc.roundedRect(PAGE.margin, y, this.contentWidth, 72, 10).fill(COLORS.paper);
    doc.font('Helvetica-Bold').fontSize(10.5).fillColor(COLORS.ink).text(t.psiTitle, PAGE.margin + 18, y + 14, { width: this.contentWidth - 140 });
    doc.font('Helvetica').fontSize(8.5).fillColor(COLORS.muted).text(t.psiBody, PAGE.margin + 18, y + 30, { width: this.contentWidth - 140 });
    const metrics = [psi.lcp && `LCP ${psi.lcp}`, psi.cls && `CLS ${psi.cls}`, psi.tbt && `TBT ${psi.tbt}`].filter(Boolean).join('  ·  ');
    doc.fontSize(8).text(metrics, PAGE.margin + 18, y + 56, { width: this.contentWidth - 140 });
    doc.font('Helvetica-Bold').fontSize(30).fillColor(scoreColor(psi.performanceScore!)).text(String(psi.performanceScore), PAGE.width - PAGE.margin - 110, y + 18, { width: 92, align: 'right' });
    doc.y = y + 90;
  }

  private nextStep(): void {
    const { doc, t } = this;
    this.ensureSpace(130);
    const y = doc.y + 8;
    doc.roundedRect(PAGE.margin, y, this.contentWidth, 96, 12).fill(COLORS.ink);
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(14).text(t.nextStep, PAGE.margin + 22, y + 20, { width: this.contentWidth - 44 });
    doc.font('Helvetica').fontSize(10).fillColor('#dcd7ca').text(t.nextStepBody, PAGE.margin + 22, y + 44, { width: this.contentWidth - 44 });
    doc.y = y + 110;
  }

  private footers(): void {
    const { doc, t } = this;
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      // Sin esto, escribir dentro del margen inferior hace que pdfkit añada páginas en blanco.
      doc.page.margins.bottom = 0;
      const y = PAGE.height - 30;
      doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.muted);
      doc.text(t.footer, PAGE.margin, y, { width: this.contentWidth - 60, lineBreak: false });
      doc.text(`${t.page} ${i - range.start + 1}/${range.count}`, PAGE.width - PAGE.margin - 60, y, { width: 60, align: 'right', lineBreak: false });
    }
  }

  // ---------- utilidades ----------

  private sectionTitle(title: string, intro?: string): void {
    const { doc } = this;
    doc.font('Helvetica-Bold').fontSize(16).fillColor(COLORS.ink).text(title, PAGE.margin, doc.y, { width: this.contentWidth });
    if (intro) doc.font('Helvetica').fontSize(9.5).fillColor(COLORS.muted).text(intro, { width: this.contentWidth });
    doc.y += 12;
  }

  private ensureSpace(height: number): void {
    if (this.doc.y + height > PAGE.height - PAGE.margin - 20) {
      this.doc.addPage();
    }
  }
}

function scoreColor(score: number): string {
  if (score >= 80) return COLORS.pass;
  if (score >= 50) return COLORS.warn;
  return COLORS.fail;
}

function statusColor(status: CheckStatus): string {
  return COLORS[status];
}

function formatDate(iso: string, lang: string): string {
  const locale = lang === 'en' ? 'en-GB' : lang === 'es' ? 'es-ES' : 'ca-ES';
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
}
