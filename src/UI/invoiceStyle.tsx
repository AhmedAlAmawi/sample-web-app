"use client";
import React from "react";
import {
  useSelector,
  selectSelectedComponent,
  SelectedComponent,
} from "@/lib/redux";
import Header from "@/UI/header";
import FontSelector from "@/UI/fontSelector";
import ColorSelector from "@/UI/colorSelector";

export default function InvoiceStyle({
  isPremium,
  setOpenModal,
}: {
  isPremium: boolean;
  setOpenModal: any;
}) {
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
        <div className="col-span-2">
          <ColorSelector isPremium={isPremium} setOpenModal={setOpenModal} />
        </div>
      </div>
    </div>
  );
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
