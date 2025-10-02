export type TMpLoginResponse = {
  url: string;
  codeVerifier: string;
};

export enum TMpPaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  TICKET = 'ticket',
  WALLET_PURCHASE = 'wallet_purchase'
}

export type TMpFormData = {
  cardholderName?: string;
  identificationType?: string;
  identificationNumber?: string;
  installments?: number;
  issuer_id?: string;
  payment_method_id?: string;
  token?: string;
  transaction_amount?: number;
  description?: string;
  payer?: {
    email?: string;
    identification?: {
      type: string;
      number: string;
    };
  };
};

export type TMpPaymentRequest = {
  selectedPaymentMethod: TMpPaymentMethod;
  formData: TMpFormData;
};

export type TMpPaymentResponse = {
  status: string;
  id?: string;
  message?: string;
  detail?: string;
  status_detail?: string;
};

export type TMpPreferenceRequest = {
  ownerId: string;
  orderId: string;
};

export type TMpPreferenceResponse = {
  preferenceId: string;
};
