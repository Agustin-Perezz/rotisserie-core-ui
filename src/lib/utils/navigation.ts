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

export const navigateToLoginWithRedirect = (redirectPath: string) => {
  const encoded = encodeURIComponent(redirectPath);
  goto(`${base}/login?redirect=${encoded}`);
};

export const handlePostLoginRedirect = (
  searchParams: URLSearchParams,
  fallbackPath: string = '/shops'
) => {
  const redirect = searchParams.get('redirect');

  if (redirect) {
    goto(redirect);
    return;
  }

  navigate(fallbackPath);
};

export const navigateToShops = () => {
  navigate('/shops');
};

export const navigateToNewItem = (shopId: string) => {
  navigate(`/shop/${shopId}/dashboard/new-item`);
};

export const navigateToEditItem = (shopId: string, itemId: string) => {
  navigate(`/shop/${shopId}/dashboard/edit-item/${itemId}`);
};
