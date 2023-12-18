import SiteHeader from "@/UI/siteHeader";
import dynamic from "next/dynamic";

const PDFViewerComponent = dynamic(() => import("@/components/pdfEditor"), {
  ssr: false,
});

export default async function CreatePage() {
  return (
    <div className="bg-gray-50 max-h-screen h-screen">
      <SiteHeader />
      <PDFViewerComponent />
    </div>
  );
}
