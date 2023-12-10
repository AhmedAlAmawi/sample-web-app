"use client";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import {
  useSelector,
  selectLineItems,
  selectTotal,
  selectSubtotal,
  selectTax,
  selectDiscountAmount,
  selectFont,
} from "@/lib/redux";
import { formatDollarValue } from "@/utils/formatters";

export default function PDFDocument() {
  const lineItems = useSelector(selectLineItems);
  const font = useSelector(selectFont);
  const totalAmount = formatDollarValue(useSelector(selectTotal));
  const subTotalAmount = formatDollarValue(useSelector(selectSubtotal));
  const taxAmount = formatDollarValue(useSelector(selectTax));
  const discountAmount = formatDollarValue(useSelector(selectDiscountAmount));

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 30,
      backgroundColor: "#fff",
      fontFamily: font,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    billToPaymentRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
    },
    title: {
      fontSize: 20,
      fontWeight: "medium",
      fontFamily: `${font}-Bold`,
    },
    subtitle: {
      fontSize: 16,
      color: "#4B5563",
    },
    table: {
      marginTop: 16,
    },
    tableHeader: {
      flexDirection: "row",
    },
    tableHeaderText: {
      fontSize: 15,
      fontWeight: "bold",
      padding: 8,
    },
    tableRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    tableCell: {
      fontSize: 13,
      padding: 8,
      color: "#4B5563",
    },
    tableCellEnd: {
      fontSize: 16,
      padding: 8,
      color: "#4B5563",
    },
    startingBorder: {
      borderTopWidth: 1,
    },
    tableCellNo: {
      width: "8%",
    },
    tableCellDescription: {
      width: "44%",
    },
    tableCellPrice: {
      width: "19%",
    },
    tableCellQty: {
      width: "10%",
    },
    tableCellTotal: {
      width: "19%",
    },
    totalsRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingTop: 8,
      marginTop: 8,
    },
    totalsTitle: {
      marginRight: 10,
    },
    footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    footerTitle: {
      fontSize: 12,
      fontWeight: "semibold",
      color: "#374151",
    },
    footerContent: {
      fontSize: 10,
      color: "#9CA3AF",
    },
  });

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>Giggling Platypus co.</Text>
              <Text style={styles.subtitle}>123 Anywhere st., Any City</Text>
              <Text style={styles.subtitle}>123-456-7890</Text>
            </View>
            <View>
              <Text style={styles.title}>INVOICE</Text>
              <Text style={styles.subtitle}>Invoice Number: #1234</Text>
              <Text style={styles.subtitle}>Date: June 13, 2021</Text>
              <Text style={styles.subtitle}>Due Date: June 16, 2021</Text>
            </View>
          </View>
          <View style={styles.billToPaymentRow}>
            <View>
              <Text style={styles.title}>BILL TO:</Text>
              <Text style={styles.subtitle}>Murad Naser</Text>
              <Text style={styles.subtitle}>123 Anywhere st., Any City</Text>
              <Text style={styles.subtitle}>123-456-7890</Text>
            </View>
            <View>
              <Text style={styles.title}>Payment Method</Text>
              <Text style={styles.subtitle}>Central Bank</Text>
              <Text style={styles.subtitle}>Samira Hadid</Text>
              <Text style={styles.subtitle}>123-456-7890</Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.tableCellNo]}>
                NO
              </Text>
              <Text
                style={[styles.tableHeaderText, styles.tableCellDescription]}
              >
                ITEM DESCRIPTION
              </Text>
              <Text style={[styles.tableHeaderText, styles.tableCellPrice]}>
                PRICE
              </Text>
              <Text style={[styles.tableHeaderText, styles.tableCellQty]}>
                QTY
              </Text>
              <Text style={[styles.tableHeaderText, styles.tableCellTotal]}>
                TOTAL
              </Text>
            </View>
            {lineItems.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.tableCellNo]}>
                  {index + 1}
                </Text>
                <Text style={[styles.tableCell, styles.tableCellDescription]}>
                  {item.description}
                </Text>
                <Text style={[styles.tableCell, styles.tableCellPrice]}>
                  {item.price}
                </Text>
                <Text style={[styles.tableCell, styles.tableCellQty]}>1</Text>
                <Text style={[styles.tableCell, styles.tableCellTotal]}>
                  {item.price}
                </Text>
              </View>
            ))}

            <View style={styles.tableRow}>
              <Text style={styles.tableCellNo}></Text>
              <Text style={styles.tableCellDescription}></Text>
              <Text
                style={[
                  styles.tableCellEnd,
                  styles.startingBorder,
                  styles.tableCellPrice,
                ]}
              >
                Sub Total
              </Text>
              <Text
                style={[
                  styles.tableCellEnd,
                  styles.startingBorder,
                  styles.tableCellQty,
                ]}
              >
                {" "}
              </Text>
              <Text
                style={[
                  styles.tableCellEnd,
                  styles.startingBorder,
                  styles.tableCellTotal,
                ]}
              >
                {subTotalAmount}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellNo}></Text>
              <Text style={styles.tableCellDescription}></Text>
              <Text style={[styles.tableCellEnd, styles.tableCellPrice]}>
                Tax
              </Text>
              <Text style={[styles.tableCellEnd, styles.tableCellQty]}> </Text>
              <Text style={[styles.tableCellEnd, styles.tableCellTotal]}>
                {taxAmount}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellNo}></Text>
              <Text style={styles.tableCellDescription}></Text>
              <Text style={[styles.tableCellEnd, styles.tableCellPrice]}>
                Discount
              </Text>
              <Text style={[styles.tableCellEnd, styles.tableCellQty]}> </Text>
              <Text style={[styles.tableCellEnd, styles.tableCellTotal]}>
                {discountAmount}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellNo}></Text>
              <Text style={styles.tableCellDescription}></Text>
              <Text
                style={[
                  styles.tableCellEnd,
                  styles.startingBorder,
                  styles.tableCellPrice,
                ]}
              >
                Total
              </Text>
              <Text
                style={[
                  styles.tableCellEnd,
                  styles.startingBorder,
                  styles.tableCellQty,
                ]}
              >
                {" "}
              </Text>
              <Text
                style={[
                  styles.tableCellEnd,
                  styles.startingBorder,
                  styles.tableCellTotal,
                ]}
              >
                {totalAmount}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.footerRow}>
          <View>
            <Text style={styles.footerTitle}>Term and Conditions:</Text>
            <Text style={styles.footerContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Text>
          </View>
          <View>
            <Text style={styles.footerTitle}>Samira Hadid</Text>
            <Text style={styles.footerContent}>Manager</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  return { MyDocument };
}
