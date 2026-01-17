import http from "./http";
import axios from "axios";
import { BASE_URL } from "./endpoint";

export const _makeGetRequest = async (
  endpoint: string,
  params?: Record<string, any>
): Promise<any> => {
  try {
    const response = await http.get(endpoint, {
      params,
    });
    return response;
  } catch (error: any) {
    // Don't return the error object directly, throw it so it can be handled properly
    throw error;
  }
};

export const _makeAuthenticatedGetRequest = async (
  endpoint: string,
  token: string,
  params?: Record<string, any>
): Promise<any> => {
  try {
    const response = await http.get(endpoint, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const _makePostRequest = async (
  endpoint: string,
  data: any
): Promise<any> => {
  try {
    const response = await http.post(endpoint, data, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const _makeUnauthenticatedPostRequest = async (
  endpoint: string,
  data: any
): Promise<any> => {
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
  } catch (error: any) {
    // Handle error similar to the interceptor
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};


export const _makeFormDataMultipartRequest = async (
  endpoint: string,
  data: any
): Promise<any> => {
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
        formData.append(key, value);
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
  } catch (error: any) {
    // Laravel returns errors in error.response.data
    if (error.response) {
      console.error("Laravel error:", error.response.data);
      throw error.response.data;
    }
    throw error;
  }
};

export const _makeDeleteRequest = async (
  endpoint: string,
  params?: Record<string, any>
): Promise<any> => {
  try {
    const response = await http.delete(endpoint, {
      params,
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};

export const _makePutRequest = async (url: string, data: any, config: any = {}) => {
  try {
    const response = await http.put(url, data, config);
    return response;
  } catch (error: any) {
    throw error;
  }
};