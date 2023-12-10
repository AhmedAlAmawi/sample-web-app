import dynamic from "next/dynamic";
const PDFViewerComponent = dynamic(() => import("@/components/pdfEditor"), {
  ssr: false,
});

export default async function Home() {
  return (
    <div className="bg-gray-50">
      <PDFViewerComponent />
    </div>
  );
}
