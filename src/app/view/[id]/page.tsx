import SiteHeader from "@/UI/siteHeader";
import dynamic from "next/dynamic";

const ViewPoem = dynamic(() => import("@/components/viewPoemComponent"), {
  ssr: false,
});

export default async function CreatePage() {
  return (
    <div className="bg-gray-50 max-h-screen h-screen">
      <SiteHeader />
      <ViewPoem />
    </div>
  );
}
