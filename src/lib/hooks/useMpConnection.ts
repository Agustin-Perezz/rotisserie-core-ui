import { getSellerPublicKey } from '$lib/services/mp';

export async function checkMpConnection(
  ownerId: string | undefined
): Promise<boolean> {
  try {
    if (!ownerId) {
      return false;
    }

    await getSellerPublicKey(ownerId);
    return true;
  } catch {
    return false;
  }
}
