"use client";
import React, { useCallback } from "react";
import {
  pdfSlice,
  useSelector,
  selectSelectedComponent,
  useDispatch,
  SelectedComponent,
} from "@/lib/redux";
import Header from "@/UI/header";
import FontSelector from "@/UI/fontSelector";

export default function InvoiceDetails({
  invoiceData,
  register,
}: {
  invoiceData: any;
  register: any;
}) {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(selectSelectedComponent);
  return (
    <div className="flex flex-col border-b border-gray-100">
      <Header component="InvoiceStyling" title="Custom Styling" />
      <div
        className={classNames(
          "grid grid-cols-2 gap-6 transition-all duration-500 ",
          selectedComponent === SelectedComponent.InvoiceStyling
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 visibility-hidden"
        )}
      >
        <div>
          <FontSelector />
        </div>
      </div>
    </div>
  );
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
