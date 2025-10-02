import api from '$lib/axios';
import type {
  TMpLoginResponse,
  TMpPaymentRequest,
  TMpPaymentResponse,
  TMpPreferenceRequest,
  TMpPreferenceResponse
} from '$lib/types/mp';

export const mpLogin = async (sellerId: string): Promise<TMpLoginResponse> => {
  const response = await api.get<TMpLoginResponse>('/mp/login', {
    params: { sellerId }
  });
  return response.data;
};

export const processPayment = async (
  paymentData: TMpPaymentRequest
): Promise<TMpPaymentResponse> => {
  const response = await api.post<TMpPaymentResponse>('/mp/process_payment', {
    ...paymentData,
    ownerId: '7jgY7UTPMDbtJVhn5IoYzdHAVOD2'
  });
  return response.data;
};

export const createPreference = async (
  preferenceData: TMpPreferenceRequest
): Promise<TMpPreferenceResponse> => {
  const response = await api.post<TMpPreferenceResponse>(
    '/mp/preference',
    preferenceData
  );
  return response.data;
};
