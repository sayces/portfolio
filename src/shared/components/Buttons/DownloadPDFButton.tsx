import { useState } from "react";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";

export const DownloadPDFButton = () => {
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    setLoading(true);

    const element = document.querySelector(
      "section.min-h-screen",
    ) as HTMLElement;

    if (!element) {
      console.error("Main section not found");
      setLoading(false);
      return;
    }

    try {
      element.classList.add("pdf-generating");
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toJpeg(element, {
        quality: 0.98,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
        filter: (node) => {
          if (node.id === "login") return false;
          if ((node as HTMLElement).classList?.contains("socials-toggler"))
            return false;
          return true;
        },
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Sasha_Makarov_Resume_CV.pdf");
    } catch (error) {
      console.error("PDF generation failed", error);
    } finally {
      element.classList.remove("pdf-generating");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={loading}
      className={`pdf-button px-3 py-0.75 rounded-full text-sm transition-colors ${
        loading
          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {loading ? "Generating PDF" : "Download PDF"}
    </button>
  );
};
