"use client";
import React, { useEffect } from "react";
import FontSelector from "@/UI/fontSelector";
import {
  useSelector,
  selectLineItems,
  selectCompanyDetails,
  selectLastUpdated,
  LineItem,
  CompanyDetails,
} from "@/lib/redux";
import { useForm, useFieldArray } from "react-hook-form";
import { usePDF } from "@react-pdf/renderer";
import PDFDocument from "@/components/pdfDocument";
import LineItems from "@/UI/lineItems";
import CompanyDetailsView from "@/UI/companyDetails";

interface FormValues {
  lineItems: LineItem[];
  companyDetails: CompanyDetails;
}

const PDFViewerComponent = () => {
  const initialLineItems = useSelector(selectLineItems);
  const initialCompanyDetails = useSelector(selectCompanyDetails);
  const lastUpdated = useSelector(selectLastUpdated);
  const { register, control, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      lineItems: initialLineItems,
      companyDetails: initialCompanyDetails,
    },
  });
  const fieldArray = useFieldArray({
    control,
    name: "lineItems",
  });
  const formData = watch("lineItems");
  const companyData = watch("companyDetails");
  const { MyDocument } = PDFDocument();
  const [instance, updateInstance] = usePDF({ document: MyDocument });

  useEffect(() => {
    if (lastUpdated) updateInstance(MyDocument);
  }, [lastUpdated]);

  return (
    <div className="h-screen p-4 grid grid-cols-2 gap-8 max-w-7xl mx-auto">
      <div className="w-full flex flex-col ">
        <form>
          <CompanyDetailsView companyData={companyData} register={register} />
          <LineItems
            fieldArray={fieldArray}
            formData={formData}
            register={register}
            setValue={setValue}
          />
          <FontSelector />
        </form>
      </div>
      <div className="w-full">
        {instance.loading ? (
          <p>Loading PDF...</p>
        ) : (
          <iframe
            src={instance.url as string}
            className="border border-gray-300"
            style={{
              width: "100%",
              height: "90vh",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PDFViewerComponent;
