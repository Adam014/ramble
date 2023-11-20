import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, API_BASE_URL, API_HOST } from './apiConfig';

const costApiHeader = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': API_HOST,
}

const createRequest = (url: string, params?: { city: string, country_name: string }) => ({
  url,
  headers: costApiHeader,
  params, // Add the params to the request
});

export const costApi = createApi({
  reducerPath: 'costApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getCost: builder.query({
      query: ({ city, country_name }) => createRequest(`/prices`, { city, country_name }),
    }),
  }),
});

export const { useGetCostQuery } = costApi;