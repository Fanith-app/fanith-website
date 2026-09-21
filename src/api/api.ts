import http from "./http";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "./endpoint";

// Backend JSON payloads are not typed at this layer; callers narrow what they need.
type ApiPayload = AxiosResponse["data"];

export const _makeGetRequest = async (
  endpoint: string,
  params?: Record<string, unknown>
): Promise<AxiosResponse> => {
  return http.get(endpoint, {
    params,
  });
};

export const _makeAuthenticatedGetRequest = async (
  endpoint: string,
  token: string,
  params?: Record<string, unknown>
): Promise<AxiosResponse> => {
  return http.get(endpoint, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,

      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
};

export const _makePostRequest = async (
  endpoint: string,
  data: unknown
): Promise<AxiosResponse> => {
  return http.post(endpoint, data, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
};

export const _makeUnauthenticatedPostRequest = async (
  endpoint: string,
  data: unknown
): Promise<ApiPayload> => {
  try {
    // Create a direct axios call without interceptors to avoid automatic token addition
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      timeout: 60000,
    });

    // Return the data directly to match the interceptor behavior
    return response.data;
  } catch (error) {
    // Handle error similar to the interceptor
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};


export const _makeFormDataMultipartRequest = async (
  endpoint: string,
  data: Record<string, unknown>
): Promise<ApiPayload> => {
  try {
    // Create a new FormData object
    const formData = new FormData();

    // Append each field to FormData (handles nested objects & files)
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value)); // convert nested objects
      } else {
        formData.append(key, String(value));
      }
    });

    // Send as multipart/form-data (Laravel will read it properly)
    console.log('enquiry formdata ====>', formData)
    const response = await http.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    // Laravel returns errors in error.response.data
    if (axios.isAxiosError(error) && error.response) {
      console.error("Laravel error:", error.response.data);
      throw error.response.data;
    }
    throw error;
  }
};

export const _makeDeleteRequest = async (
  endpoint: string,
  params?: Record<string, unknown>
): Promise<AxiosResponse> => {
  return http.delete(endpoint, {
    params,
  });
};

export const _makePutRequest = async (
  url: string,
  data: unknown,
  config: AxiosRequestConfig = {}
) => {
  return http.put(url, data, config);
};
