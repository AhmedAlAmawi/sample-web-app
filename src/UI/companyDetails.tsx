"use client";
import React, { useCallback } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import {
  pdfSlice,
  useSelector,
  selectSelectedComponent,
  useDispatch,
  SelectedComponent,
} from "@/lib/redux";

export default function CompanyDetails({
  companyData,
  register,
}: {
  companyData: any;
  register: any;
}) {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(selectSelectedComponent);
  const handleBlur = useCallback(() => {
    const clonedLineItems = JSON.parse(JSON.stringify(companyData));
    dispatch(pdfSlice.actions.setCompanyDetails(clonedLineItems));
  }, [companyData]);

  return (
    <div className="flex flex-col border-b border-gray-100">
      <div className="flex flex-row justify-between items-center my-4">
        <h2 className="text-xl font-bold">Company Details</h2>
        <button
          type="button"
          onClick={() =>
            dispatch(
              pdfSlice.actions.setSelectedComponent(
                selectedComponent !== SelectedComponent.CompanyDetails
                  ? SelectedComponent.CompanyDetails
                  : SelectedComponent.NA
              )
            )
          }
        >
          <ChevronDownIcon
            className="h-6 w-6 text-jackOrange"
            aria-hidden="true"
          />
        </button>
      </div>
      <div
        className={classNames(
          "grid grid-cols-2 gap-6 transition-all duration-500 ",
          selectedComponent === SelectedComponent.CompanyDetails
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 visibility-hidden"
        )}
      >
        <div>
          <label
            htmlFor="company-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Company Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="company-name"
              id="company-name"
              {...register(`companyDetails.name`)}
              onBlur={handleBlur}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="company-phone"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Company Phone
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="company-phone"
              id="company-phone"
              {...register(`companyDetails.phone`)}
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
            Company Address
          </label>
          <div className="mt-2">
            <textarea
              type="text"
              name="company-address"
              id="company-address"
              {...register(`companyDetails.address`)}
              onBlur={handleBlur}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Company Logo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-jackOrange focus-within:outline-none focus-within:ring-2 focus-within:ring-jackOrange focus-within:ring-offset-2 hover:text-jackOrange"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
