/* eslint-disable */
import { writable } from 'svelte/store';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { processPayment } from '$lib/services/mp/index.js';
import { TMpPaymentMethod, type TMpPaymentRequest } from '$lib/types/mp';
import { errorToast } from '$lib/alerts/toast';

export function useCheckoutBrick() {
  const mp = writable<any>(null);
  const isLoading = writable(false);

  const initializeMp = async (sellerPublicKey: string): Promise<void> => {
    if (get(mp)) {
      return;
    }

    isLoading.set(true);

    try {
      await loadMercadoPago();
      const mercadoPagoInstance = new (window as any).MercadoPago(
        sellerPublicKey,
        {
          locale: 'es-AR'
        }
      );
      mp.set(mercadoPagoInstance);
    } catch (error) {
      throw new Error('Failed to load MercadoPago SDK');
    } finally {
      isLoading.set(false);
    }
  };

  const createPaymentBrick = async (
    containerId: string,
    preferenceId: string,
    sellerPublicKey: string,
    amount: number
  ) => {
    await initializeMp(sellerPublicKey);

    return new Promise<void>((resolve, reject) => {
      const mpInstance = get(mp);
      if (!mpInstance) {
        reject(new Error('MercadoPago not initialized'));
        return;
      }

      mpInstance.bricks().create('payment', containerId, {
        initialization: {
          amount,
          preferenceId,
          marketplace: true
        },
        customization: {
          paymentMethods: {
            creditCard: 'all',
            debitCard: 'all',
            ticket: 'all',
            mercadoPago: 'all'
          }
        },
        callbacks: {
          onReady: () => {
            resolve();
          },
          onSubmit: ({
            selectedPaymentMethod,
            formData
          }: TMpPaymentRequest) => {
            if (selectedPaymentMethod === TMpPaymentMethod.WALLET_PURCHASE) {
              resolve();
              return;
            }

            return new Promise<void>((resolve, reject) => {
              processPayment({ selectedPaymentMethod, formData })
                .then(() => {
                  resolve();
                })
                .catch(() => {
                  reject();
                });
            });
          },
          onError: (error: Error) => {
            errorToast(error.message);
            reject(error);
          },
          onBinChange: (bin: string) => {
            console.log('BIN changed:', bin);
          }
        }
      });
    });
  };

  return {
    isLoading,
    initializeMp,
    createPaymentBrick
  };
}

function get<T>(store: {
  subscribe: (fn: (value: T) => void) => () => void;
}): T {
  let value: T;
  const unsubscribe = store.subscribe((v) => (value = v));
  unsubscribe();
  return value!;
}
