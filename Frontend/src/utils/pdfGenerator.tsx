import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { PDFDocument } from "pdf-lib";

export const generateEmployeeCard = async (
  element: HTMLDivElement
) => {

  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    backgroundColor: "#ffffff",
    scrollX: 0,
    scrollY: -window.scrollY,
    width: element.scrollWidth,
    height: element.scrollHeight,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });



  const pdf = new jsPDF({
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(
     canvas.toDataURL("image/png"),
    "PNG",
    0,
    0,
    canvas.width,
    canvas.height
  );

  return pdf.output("arraybuffer");
};

export const mergeEmployeeWithResume = async (
  employeeCard: ArrayBuffer,
  resumeUrl: string,
  employeeName: string
) => {

  // Create a new PDF
  const mergedPdf = await PDFDocument.create();

  // Load employee card PDF
  const employeePdf = await PDFDocument.load(employeeCard);

  // Fetch resume PDF
  const resumeBytes = await fetch(resumeUrl).then(res =>
    res.arrayBuffer()
  );

  // Load resume PDF
  const resumePdf = await PDFDocument.load(resumeBytes);

  // Copy employee card pages
  const employeePages = await mergedPdf.copyPages(
    employeePdf,
    employeePdf.getPageIndices()
  );

  employeePages.forEach(page => mergedPdf.addPage(page));

  // Copy resume pages
  const resumePages = await mergedPdf.copyPages(
    resumePdf,
    resumePdf.getPageIndices()
  );

  resumePages.forEach(page => mergedPdf.addPage(page));

  // Save merged PDF
  const pdfBytes = await mergedPdf.save();

  // Download
  const blob = new Blob([pdfBytes], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = `${employeeName}.pdf`;

  a.click();

  URL.revokeObjectURL(url);
};