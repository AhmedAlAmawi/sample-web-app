"use client";
import React, { useState, useEffect } from "react";
import {
  useSelector,
  selectLineItems,
  selectCompanyDetails,
  selectInvoiceDetails,
  selectLastUpdated,
  LineItem,
  CompanyDetails,
  InvoiceDetails,
} from "@/lib/redux";
import { useForm, useFieldArray } from "react-hook-form";
import { usePDF } from "@react-pdf/renderer";
import PDFDocument from "@/components/pdfDocument";
import LineItems from "@/UI/lineItems";
import CompanyDetailsView from "@/UI/companyDetails";
import InvoiceDetailsView from "@/UI/invoiceDetails";
import InvoiceStyleView from "@/UI/invoiceStyle";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { getPremiumStatus } from "@/lib/getPremiumStatus";
import UpgradeModal from "@/components/upgradeModal";

interface FormValues {
  lineItems: LineItem[];
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceDetails;
}

const PDFViewerComponent = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const initialLineItems = useSelector(selectLineItems);
  const initialCompanyDetails = useSelector(selectCompanyDetails);
  const initialInvoiceDetails = useSelector(selectInvoiceDetails);
  const lastUpdated = useSelector(selectLastUpdated);
  const { register, control, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      lineItems: initialLineItems,
      companyDetails: initialCompanyDetails,
      invoiceDetails: initialInvoiceDetails,
    },
  });
  const fieldArray = useFieldArray({
    control,
    name: "lineItems",
  }) as any;
  const formData = watch("lineItems");
  const companyData = watch("companyDetails");
  const invoiceData = watch("invoiceDetails");
  const { MyDocument } = PDFDocument();
  const [instance, updateInstance] = usePDF({ document: MyDocument });
  const [isPremium, setIsPremium] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (lastUpdated) updateInstance(MyDocument);
  }, [lastUpdated]);

  useEffect(() => {
    const checkPremium = async () => {
      const newPremiumStatus = auth.currentUser
        ? await getPremiumStatus(app)
        : false;
      setIsPremium(newPremiumStatus);
    };
    checkPremium();
  }, [app, auth.currentUser?.uid]);
  return (
    <div className="p-4 flex flex-col lg:grid grid-cols-2 gap-8 max-w-7xl mx-auto">
      <UpgradeModal open={openModal} setOpen={setOpenModal} />
      <div className="w-full flex flex-col ">
        <form>
          <CompanyDetailsView
            isPremium={isPremium}
            setOpenModal={setOpenModal}
            companyData={companyData}
            register={register}
          />
          <InvoiceDetailsView invoiceData={invoiceData} register={register} />
          <LineItems
            fieldArray={fieldArray}
            formData={formData}
            register={register}
            setValue={setValue}
          />
          <InvoiceStyleView
            fieldArray={fieldArray}
            formData={formData}
            register={register}
            setValue={setValue}
          />
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
              height: "87vh",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PDFViewerComponent;
