import { QueryClient } from 'react-query';

export const AppQueryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 0,
    },
  },
});
