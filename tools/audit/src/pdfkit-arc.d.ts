// `arc` existe en pdfkit (API vectorial tipo canvas) pero falta en @types/pdfkit.
declare namespace PDFKit {
  interface PDFDocument {
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this;
  }
}
