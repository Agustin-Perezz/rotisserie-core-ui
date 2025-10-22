import { goto } from '$app/navigation';
import { base } from '$app/paths';

export const navigate = (path: string) => {
  goto(`${base}${path}`);
};

export const navigateToShop = (shopId: string) => {
  navigate(`/shop/${shopId}/dashboard`);
};

export const navigateToShopNew = () => {
  navigate('/shop/new');
};

export const navigateToLogin = () => {
  navigate('/login');
};

export const navigateToNewItem = (shopId: string) => {
  navigate(`/shop/${shopId}/dashboard/new-item`);
};

export const navigateToEditItem = (shopId: string, itemId: string) => {
  navigate(`/shop/${shopId}/dashboard/edit-item/${itemId}`);
};
