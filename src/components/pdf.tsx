"use client";
import React, { useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { usePDF } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
  },
  header: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  invoiceNumber: {
    marginTop: 20,
    marginBottom: 10,
  },
  billTo: {
    marginBottom: 20,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontWeight: "bold",
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
  totals: {
    marginTop: 20,
    borderTopWidth: 2,
    borderTopStyle: "solid",
    paddingTop: 10,
  },
  // Add more styles as needed
});

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

  console.log(subtotal);
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Invoice</Text>

        <View style={styles.invoiceNumber}>
          <Text>Invoice #: 12345</Text>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.billTo}>
          <Text>Bill To:</Text>
          <Text>John Doe</Text>
          <Text>123 Business Rd.</Text>
          <Text>Business City, BX 12345</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text>Description</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Price</Text>
            </View>
          </View>
          {formData.lineItems?.map((item: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.description}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.price}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <Text>Subtotal: ${subtotal}</Text>
          <Text>Tax (15%): ${taxAmount}</Text>
          <Text>Total: ${total}</Text>
        </View>
      </Page>
    </Document>
  );

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
