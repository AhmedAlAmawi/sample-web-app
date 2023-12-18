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
import Input from "@/UI/input";
export default function InvoiceDetails({
  invoiceData,
  register,
}: {
  invoiceData: any;
  register: any;
}) {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(selectSelectedComponent);
  const handleBlur = useCallback(() => {
    const clonedInvoiceData = JSON.parse(JSON.stringify(invoiceData));
    clonedInvoiceData.paymentTerms = clonedInvoiceData.paymentTerms.replace(
      /\n/g,
      "\n"
    );
    clonedInvoiceData.termsAndConditions =
      clonedInvoiceData.termsAndConditions.replace(/\n/g, "\n");
    clonedInvoiceData.billToAddress = clonedInvoiceData.billToAddress.replace(
      /\n/g,
      "\n"
    );

    dispatch(pdfSlice.actions.setInvoiceDetails(clonedInvoiceData));
  }, [invoiceData]);

  return (
    <div className="flex flex-col border-b border-gray-100">
      <Header component="InvoiceDetails" title="Invoice Details" />
      <div
        className={classNames(
          "grid grid-cols-2 gap-6 transition-all duration-500 ",
          selectedComponent === SelectedComponent.InvoiceDetails
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 visibility-hidden"
        )}
      >
        <Input
          title="Invoice Number"
          registerName="invoiceDetails.invoiceNumber"
          handleBlur={handleBlur}
          register={register}
        />
        <Input
          title="Invoice Creation Date"
          registerName="invoiceDetails.date"
          type="date"
          handleBlur={handleBlur}
          register={register}
        />
        <Input
          title="Invoice Due Date"
          registerName="invoiceDetails.dueDate"
          type="date"
          handleBlur={handleBlur}
          register={register}
        />
        <Input
          title=" Bill To Name"
          registerName="invoiceDetails.billToName"
          handleBlur={handleBlur}
          register={register}
        />
        <Input
          title=" Bill To Phone"
          registerName="invoiceDetails.billToPhone"
          handleBlur={handleBlur}
          register={register}
        />
        <div className="col-span-2">
          <label
            htmlFor="company-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Bill To Address
          </label>
          <div className="mt-2">
            <textarea
              type="text"
              {...register(`invoiceDetails.billToAddress`)}
              onBlur={handleBlur}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="col-span-2">
          <label
            htmlFor="company-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Payment Method
          </label>
          <div className="mt-2">
            <textarea
              type="text"
              {...register(`invoiceDetails.paymentTerms`)}
              onBlur={handleBlur}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="col-span-2">
          <label
            htmlFor="company-address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Terms & Conditions
          </label>
          <div className="mt-2">
            <textarea
              type="text"
              {...register(`invoiceDetails.termsAndConditions`)}
              onBlur={handleBlur}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              placeholder="you@example.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
