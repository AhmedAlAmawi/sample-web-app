"use client";
import {
  Image,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  useSelector,
  selectLineItems,
  selectTotal,
  selectSubtotal,
  selectTax,
  selectDiscountAmount,
  selectFont,
  selectCompanyDetails,
  selectInvoiceDetails,
} from "@/lib/redux";
import { formatDollarValue } from "@/utils/formatters";

export default function PDFDocument() {
  const lineItems = useSelector(selectLineItems);
  const companyDetails = useSelector(selectCompanyDetails);
  const invoiceDetails = useSelector(selectInvoiceDetails);
  const font = useSelector(selectFont);
  const totalAmount = formatDollarValue(useSelector(selectTotal));
  const subTotalAmount = formatDollarValue(useSelector(selectSubtotal));
  const taxAmount = formatDollarValue(useSelector(selectTax));
  const discountAmount = formatDollarValue(useSelector(selectDiscountAmount));

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      flexDirection: "column",
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
      fontSize: 18,
      fontWeight: "medium",
      fontFamily: `${font}-Bold`,
    },
    subtitle: {
      fontSize: 16,
      color: "#4B5563",
      maxWidth: "50%",
      flexWrap: "wrap",
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
      flexWrap: "wrap",
    },
    tableCellPrice: {
      width: "19%",
    },
    itemTitle: {
      fontSize: 12,
      fontFamily: `${font}-Bold`,
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
      marginTop: 24,
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
    logo: {
      height: 50,
      width: 50,
      marginBottom: 10,
    },
  });

  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {companyDetails.logo && (
            <Image src={companyDetails.logo} style={styles.logo} />
          )}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>{companyDetails.name}</Text>
              <Text style={styles.subtitle}>{companyDetails.address}</Text>
              <Text style={styles.subtitle}>{companyDetails.phone}</Text>
            </View>
            <View>
              <Text style={styles.title}>INVOICE</Text>
              <Text style={styles.subtitle}>
                Invoice Number: {invoiceDetails.invoiceNumber}
              </Text>
              <Text style={styles.subtitle}>Date: {invoiceDetails.date}</Text>
              <Text style={styles.subtitle}>
                Due Date: {invoiceDetails.dueDate}
              </Text>
            </View>
          </View>
          <View style={styles.billToPaymentRow}>
            <View>
              <Text style={styles.title}>BILL TO:</Text>
              <Text style={styles.subtitle}>{invoiceDetails.billToName}</Text>
              <Text style={styles.subtitle}>
                {invoiceDetails.billToAddress}
              </Text>
              <Text style={styles.subtitle}>{invoiceDetails.billToPhone}</Text>
            </View>
            <View>
              <Text style={styles.title}>Payment Method</Text>
              <Text style={styles.subtitle}>{invoiceDetails.paymentTerms}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader} fixed>
              <Text style={[styles.tableHeaderText, styles.tableCellNo]}>
                NO
              </Text>
              <Text
                style={[styles.tableHeaderText, styles.tableCellDescription]}
              >
                ITEM
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
              <View key={index} style={styles.tableRow} wrap={false}>
                <Text style={[styles.tableCell, styles.tableCellNo]}>
                  {index + 1}
                </Text>
                <Text style={[styles.tableCell, styles.tableCellDescription]}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text>{`\n${item.description}`}</Text>
                </Text>
                <Text style={[styles.tableCell, styles.tableCellPrice]}>
                  {item.price}
                </Text>
                <Text style={[styles.tableCell, styles.tableCellQty]}>
                  {item.qty}
                </Text>
                <Text style={[styles.tableCell, styles.tableCellTotal]}>
                  {item.total}
                </Text>
              </View>
            ))}
            <View style={{ marginTop: 12 }} wrap={false}>
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
                <Text style={[styles.tableCellEnd, styles.tableCellQty]}>
                  {" "}
                </Text>
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
                <Text style={[styles.tableCellEnd, styles.tableCellQty]}>
                  {" "}
                </Text>
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
