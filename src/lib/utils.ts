import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { TOrderItemContext } from './types/order';
import { TOrderStatus } from './types/order';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTotalPrice(items: TOrderItemContext[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function getOrderStatusLabel(status: TOrderStatus): string {
  const labels: Record<TOrderStatus, string> = {
    [TOrderStatus.PENDING]: 'Pendiente',
    [TOrderStatus.PREPARING]: 'En Preparación',
    [TOrderStatus.READY]: 'Listo',
    [TOrderStatus.SENT]: 'Enviado',
    [TOrderStatus.COMPLETED]: 'Completado',
    [TOrderStatus.CANCELLED]: 'Cancelado'
  };
  return labels[status];
}

export function getOrderStatusClasses(status: TOrderStatus): string {
  const classes: Record<TOrderStatus, string> = {
    [TOrderStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [TOrderStatus.PREPARING]: 'bg-orange-100 text-orange-800',
    [TOrderStatus.READY]: 'bg-green-100 text-green-800',
    [TOrderStatus.SENT]: 'bg-blue-100 text-blue-800',
    [TOrderStatus.COMPLETED]: 'bg-emerald-100 text-emerald-800',
    [TOrderStatus.CANCELLED]: 'bg-red-100 text-red-800'
  };
  return classes[status];
}

export function getInitials(
  email: string | null,
  displayName: string | null
): string {
  if (displayName) {
    const names = displayName.split(' ');
    return names.length > 1
      ? `${names[0][0]}${names[1][0]}`.toUpperCase()
      : displayName.slice(0, 2).toUpperCase();
  }
  return email ? email[0].toUpperCase() : 'U';
}

export function objectToFormData(obj: Record<string, unknown>): FormData {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      if (value.length > 0 && value[0] instanceof File) {
        value.forEach((file) => {
          formData.append(`${key}`, file);
        });
      }
    } else if (typeof value === 'number') {
      formData.append(key, value.toString());
    } else if (typeof value === 'string') {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
  ? Omit<T, 'children'>
  : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};
