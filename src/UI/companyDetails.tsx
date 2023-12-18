"use client";
import React, { useCallback } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import {
  pdfSlice,
  useSelector,
  selectSelectedComponent,
  useDispatch,
  SelectedComponent,
} from "@/lib/redux";
import CrownIcon from "./crownIcon";
import Header from "@/UI/header";
import Input from "@/UI/input";
export default function CompanyDetails({
  isPremium,
  companyData,
  setOpenModal,
  register,
}: {
  isPremium: boolean;
  companyData: any;
  setOpenModal: any;
  register: any;
}) {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(selectSelectedComponent);
  const [file, setFile] = React.useState({ name: "", base64: "" });

  const handleBlur = useCallback(() => {
    const clonedCompanyData = JSON.parse(JSON.stringify(companyData));
    clonedCompanyData.address = clonedCompanyData.address.replace(/\n/g, "\n");
    clonedCompanyData.logo = file.base64;
    dispatch(pdfSlice.actions.setCompanyDetails(clonedCompanyData));
  }, [companyData, file]);

  const premiumStyle =
    (!isPremium && "pointer-events-none  bg-jackOrange/20 opacity-40") || "";

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const clonedCompanyData = JSON.parse(JSON.stringify(companyData));
        clonedCompanyData.logo = base64String;
        const fileObject = { name: file.name, base64: base64String as string };
        setFile(fileObject);
        dispatch(pdfSlice.actions.setCompanyDetails(clonedCompanyData));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col border-b border-gray-100">
      <Header component="CompanyDetails" title="Company Details" />
      <div
        className={classNames(
          "grid grid-cols-2 gap-6 transition-all duration-500 ",
          selectedComponent === SelectedComponent.CompanyDetails
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 visibility-hidden"
        )}
      >
        <Input
          title="Company Name"
          registerName="companyDetails.name"
          handleBlur={handleBlur}
          register={register}
        />
        <Input
          title="Company Phone"
          registerName="companyDetails.phone"
          handleBlur={handleBlur}
          register={register}
        />

        <div className="col-span-full">
          <label
            htmlFor="cover-photo"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            <div className="flex flex-row items-center justify-between">
              <span className="flex flex-row items-center gap-2">
                Company Logo
                {!isPremium && <CrownIcon />}
              </span>
              {!isPremium && (
                <button
                  type="button"
                  className="text-jackOrange hover:text-orange-800 "
                  onClick={() => setOpenModal(true)}
                >
                  Upgrade to Premium
                </button>
              )}
            </div>
          </label>
          <p className="text-xs my-0.5 text-jackOrange">{file.name}</p>
          <div
            className={`mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ${premiumStyle}`}
          >
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md  font-semibold text-jackOrange focus-within:outline-none focus-within:ring-2 focus-within:ring-jackOrange focus-within:ring-offset-2 hover:text-jackOrange"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleLogoUpload}
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
      </div>
    </div>
  );
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
