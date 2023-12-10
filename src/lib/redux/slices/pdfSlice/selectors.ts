/* Instruments */
import type { ReduxState } from "@/lib/redux";

export const selectLineItems = (state: ReduxState) => state.pdf.lineItems;
export const selectTotal = (state: ReduxState) => state.pdf.total;
export const selectSubtotal = (state: ReduxState) => state.pdf.subtotal;
export const selectTax = (state: ReduxState) => state.pdf.tax;
export const selectFont = (state: ReduxState) => state.pdf.font;
export const selectDiscountAmount = (state: ReduxState) =>
  state.pdf.discountAmount;
export const selectColors = (state: ReduxState) => state.pdf.colors;
export const selectLogoUrl = (state: ReduxState) => state.pdf.logoUrl;
export const selectLastUpdated = (state: ReduxState) => state.pdf.lastUpdated;
export const selectSelectedComponent = (state: ReduxState) =>
  state.pdf.selectedComponent;
export const selectCompanyDetails = (state: ReduxState) =>
  state.pdf.companyDetails;
