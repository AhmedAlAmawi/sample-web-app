/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Colors {
  primary: string;
  secondary: string;
}

export interface LineItem {
  name: string;
  description: string;
  price: number;
  qty: number;
  total: number;
}
export interface InvoiceDetails {
  invoiceNumber?: string;
  date: string;
  dueDate: string;
  billToName: string;
  billToAddress: string;
  billToPhone: string;
  paymentTerms: string;
  termsAndConditions: string;
}

export interface CompanyDetails {
  name: string;
  address: string;
  phone: string;
  logo?: string;
}
export enum SelectedComponent {
  CompanyDetails = "company-details",
  LineItems = "line-items",
  InvoiceDetails = "invoice-details",
  InvoiceStyling = "invoice-styling",
  NA = "NA",
}

export interface PdfState {
  lineItems: LineItem[];
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceDetails;
  total: number;
  subtotal: number;
  tax: number;
  taxRate: number;
  discountAmount: number;
  font: string;
  colors: Colors;
  logoUrl: string;
  selectedComponent: SelectedComponent;
  status: "idle" | "loading" | "failed";
  lastUpdated: Date;
}

const initialState: PdfState = {
  lineItems: [
    {
      name: "Branding Design",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      price: 1000,
      qty: 1,
      total: 1000,
    },
    {
      name: "Web Design",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      price: 3000,
      qty: 1,
      total: 3000,
    },
    {
      name: "Brochure",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      price: 80,
      qty: 10,
      total: 800,
    },
    {
      name: "Copy Writing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      price: 500,
      qty: 1,
      total: 500,
    },
  ],
  companyDetails: {
    name: "Giggling Platypus co.",
    address: "1234 Main St. Anytown, USA",
    phone: "123-456-7890",
  },
  invoiceDetails: {
    invoiceNumber: "#1234",
    date: "2021-01-01",
    dueDate: "2021-01-01",
    billToName: "Ahmed Amawi",
    billToAddress: "123 Anywhere st., Any City,CA ",
    billToPhone: "123-456-7890",
    paymentTerms: "Central Bank \n Samira Hadid \n123-456-7890",
    termsAndConditions:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },

  selectedComponent: SelectedComponent.CompanyDetails,
  total: 5520,
  subtotal: 4800,
  tax: 720,
  taxRate: 0.15,
  discountAmount: 0,
  font: "Courier",
  colors: {
    primary: "#000000",
    secondary: "#FFFFFF",
  },
  logoUrl: "",
  status: "idle",
  lastUpdated: new Date(),
};

export const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    setLineItems: (state, action: PayloadAction<LineItem[]>) => {
      state.lineItems = action.payload;
      state.subtotal = state.lineItems.reduce(
        (sum, item) => sum + item.price * (item.qty || 1),
        0
      );
      state.tax = state.subtotal * state.taxRate;
      state.total = state.subtotal + state.tax - state.discountAmount;
      state.lastUpdated = new Date();
    },
    setCompanyDetails: (state, action: PayloadAction<CompanyDetails>) => {
      state.companyDetails = action.payload;
      state.lastUpdated = new Date();
    },
    setInvoiceDetails: (state, action: PayloadAction<InvoiceDetails>) => {
      state.invoiceDetails = action.payload;
      state.lastUpdated = new Date();
    },
    setSelectedComponent: (state, action: PayloadAction<SelectedComponent>) => {
      state.selectedComponent = action.payload;
    },
    setFont: (state, action: PayloadAction<string>) => {
      state.font = action.payload;
      state.lastUpdated = new Date();
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setSubtotal: (state, action: PayloadAction<number>) => {
      state.subtotal = action.payload;
    },
    setTax: (state, action: PayloadAction<number>) => {
      state.tax = action.payload;
    },
    setDiscountAmount: (state, action: PayloadAction<number>) => {
      state.discountAmount = action.payload;
    },
    setColors: (state, action: PayloadAction<Colors>) => {
      state.colors = action.payload;
      state.lastUpdated = new Date();
    },
    setLogoUrl: (state, action: PayloadAction<string>) => {
      state.logoUrl = action.payload;
    },
  },
});
