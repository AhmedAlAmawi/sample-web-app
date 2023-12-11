import dynamic from "next/dynamic";
import Link from "next/link";

const PDFViewerComponent = dynamic(() => import("@/components/pdfEditor"), {
  ssr: false,
});

export default async function CreatePage() {
  return (
    <div className="bg-gray-50 max-h-screen h-screen lg:overflow-hidden">
      <header className="">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-9 w-auto" src="/box.svg" alt="" />
            </Link>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            <Link
              href="/create"
              className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Create Your Invoice
            </Link>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>
      <PDFViewerComponent />
    </div>
  );
}
