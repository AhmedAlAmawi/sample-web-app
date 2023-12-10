"use client";
import React, { useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { usePDF } from "@react-pdf/renderer";
import PDFDocument from "@/components/pdfDocument";

interface LineItem {
  time: number;
  price: number;
}

interface FormData {
  lineItems: LineItem[];
}

const PDFViewerComponent = () => {
  const { register, control, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  });
  const formData = watch();
  const taxRate = 0.15; // 15% Tax
  const subtotal = formData.lineItems?.reduce(
    (acc: any, item: { price: any }) => acc + (item.price || 0),
    0
  );
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;
  const { MyDocument } = PDFDocument({ formData, subtotal, taxAmount, total });
  const [instance, updateInstance] = usePDF({ document: MyDocument });

  const handleBlur = useCallback(() => {
    updateInstance(MyDocument);
  }, [formData]);

  return (
    <div className="grid grid-cols-2 gap-4 h-screen max-w-7xl mx-auto">
      <div className="w-full flex flex-co">
        <form>
          <h1>Invoice Line Items</h1>
          {fields.map((item, index) => (
            <div key={item.id}>
              <input
                className="border border-gray-300"
                {...register(`lineItems.${index}.description`)}
                placeholder="Description"
                onBlur={handleBlur}
              />
              <input
                className="border border-gray-300"
                type="number"
                {...register(`lineItems.${index}.price`)}
                placeholder="Price"
                onBlur={handleBlur}
              />
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ description: "", price: 0 })}
          >
            Add Line Item
          </button>
        </form>
      </div>
      <div className="w-full">
        {instance.loading ? (
          <p>Loading PDF...</p>
        ) : (
          <iframe
            src={instance.url as string}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
    </div>
  );
};

export default PDFViewerComponent;
