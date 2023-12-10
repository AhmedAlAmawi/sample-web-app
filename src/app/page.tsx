import dynamic from "next/dynamic";
const PDFViewerComponent = dynamic(() => import("@/components/pdf"), {
  ssr: false,
});

export default async function Home() {
  return (
    <div>
      <PDFViewerComponent />
    </div>
  );
}
