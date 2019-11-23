export const localeOptions = { day: '2-digit', year: '2-digit', month: 'short' };

export const SERVER_URL = 'http://localhost';
export const PORT = 8080;
export const TRANSACTIONS_API = 'transactions';

export const currencyFormats = {
  GBP: new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  }),
  USD: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }),
};
export const statusHash = {
  CANCELLED: { label: 'Cancelled', color: '#cc3333', order: 0 },
  ESCROW: { label: 'Escrow', color: '#3333cc', order: 1 },
  FL_APPROVED: { label: 'Approved', color: '#33cc99', order: 2 },
  PAID: { label: 'Paid', color: '#00cc33', order: 3 },
  PRE_AUTHORIZED: { label: 'Pre-authorized', color: '#3399aa', order: 4 },
  PRE_AUTHORIZED_CANCELLED: { label: 'Cancelled (Auth)', color: '#cc3333', order: 5 },
};
