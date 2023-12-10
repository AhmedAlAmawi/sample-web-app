"use client";
import React, { useCallback } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { UseFieldArrayReturn } from "react-hook-form";
import {
  pdfSlice,
  useSelector,
  selectSelectedComponent,
  useDispatch,
  SelectedComponent,
} from "@/lib/redux";
import Header from "@/UI/header";

export default function LineItems({
  fieldArray,
  formData,
  register,
  setValue,
}: {
  fieldArray: UseFieldArrayReturn;
  register: any;
  setValue: any;
  formData: any;
}) {
  const dispatch = useDispatch();
  const selectedComponent = useSelector(selectSelectedComponent);
  const { fields, append, remove } = fieldArray;
  const handleBlur = useCallback(() => {
    formData.forEach((item: any, index: number) => {
      const total = (item.qty || 0) * (item.price || 0);
      setValue(`lineItems.${index}.total`, total);
    });
    const clonedLineItems = JSON.parse(JSON.stringify(formData));
    dispatch(pdfSlice.actions.setLineItems(clonedLineItems));
  }, [formData]);

  return (
    <div className="flex flex-col border-b border-gray-100">
      <Header component="LineItems" title="Line Items" />

      <div
        className={classNames(
          "flex flex-col transition-all duration-500 ",
          selectedComponent === SelectedComponent.LineItems
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 visibility-hidden"
        )}
      >
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="descriptionColumn p-2 text-sm font-medium leading-6 text-gray-900 text-left">
                Item
              </th>
              <th className="quantityColumn p-2 text-sm font-medium leading-6 text-gray-900 text-left">
                Quantity
              </th>
              <th className="priceColumn p-2 text-sm font-medium leading-6 text-gray-900 text-left">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {fields.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-jackOrange border-dashed border-opacity-30"
              >
                <td className="descriptionColumn p-2 w-full">
                  <div className="relative">
                    <div className="absolute -left-6 top-1 text-jackOrange">
                      {index + 1}.
                    </div>
                    <div>
                      <input
                        className=" w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                        {...register(`lineItems.${index}.description`)}
                        placeholder="Description"
                        onBlur={handleBlur}
                      />
                      <label
                        htmlFor="description"
                        className="block text-xs leading-6 text-gray-500 mt-1"
                      >
                        Description
                      </label>
                      <div className="mt-0.5">
                        <textarea
                          className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                          {...register(`lineItems.${index}.description`)}
                          placeholder="Description"
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                </td>

                <td className="quantityColumn p-2 align-top	">
                  <input
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    type="number"
                    {...register(`lineItems.${index}.qty`, {
                      valueAsNumber: true,
                    })}
                    placeholder="Quantity"
                    onBlur={handleBlur}
                  />
                </td>
                <td className="priceColumn p-2 align-top	">
                  <input
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    type="number"
                    {...register(`lineItems.${index}.price`, {
                      valueAsNumber: true,
                    })}
                    placeholder="Price"
                    onBlur={handleBlur}
                  />
                </td>
                <td className="cursor-pointer align-top	pt-3 ">
                  <button
                    type="button"
                    className="cursor-pointer	 "
                    onClick={() => remove(index)}
                  >
                    <TrashIcon className="cursor-pointer	 text-red-600 hover:text-red-800 h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-2">
          <button
            type="button"
            className="rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            onClick={() =>
              append({ description: "", qty: 0, price: 0, total: 0 })
            }
          >
            Add Line Item
          </button>
        </div>
      </div>
    </div>
  );
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
