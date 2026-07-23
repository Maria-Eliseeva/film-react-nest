const defaultApiUrl = import.meta.env.PROD
  ? 'https://api.film.mary.nomorepartiessite.ru/api/afisha'
  : '/api/afisha';

export const API_URL = import.meta.env.VITE_API_URL ?? defaultApiUrl;
export const CDN_URL = import.meta.env.VITE_CDN_URL ?? '/content/afisha';