import { PDFDocument } from "pdf-lib";

export async function BenefitsPDF(benefits: number[]): Promise<void> {
  const BenefitsFile = await fetch(
    "../../public/assets/KerenHasiyuaBenefits.pdf"
  ).then((res) => res.arrayBuffer());

  const originalPDF = await PDFDocument.load(BenefitsFile);
  const userPDF = await PDFDocument.create();

  for (const pageIndex of benefits) {
    const [copiedPage] = await userPDF.copyPages(originalPDF, [pageIndex]);
    userPDF.addPage(copiedPage);
  }

  const userPDFFile = await userPDF.save();

  const blob = new Blob([userPDFFile], { type: "application/pdf" });
  const blobURL = URL.createObjectURL(blob);
  window.open(blobURL, "_blank");
}
