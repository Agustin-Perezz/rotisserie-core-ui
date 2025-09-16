import api from '$lib/axios';
import type { TMpLoginResponse } from '$lib/types/mp';

export const mpLogin = async (sellerId: string): Promise<TMpLoginResponse> => {
  const response = await api.get<TMpLoginResponse>('/mp/login', {
    params: { sellerId }
  });
  return response.data;
};
