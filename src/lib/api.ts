'use server';

import { headers } from "next/headers";


const headersList = headers();
const cookie = headersList.get('cookie');


const handleResponse = async <T>(
  response: Response,
): Promise<T> => {
  const isJson =
    response.headers
      .get('content-type')
      ?.includes('application/json') ||
    response.headers
      .get('content-type')
      ?.includes('application/hal+json');
  const isNull = response.headers.get('content-type') === null;
  if (
    response.headers.get('content-length') === '0' ||
    !isJson ||
    isNull
  ) {
    return {} as T;
  }
  const data = await response.json();
  if (!response.ok) {
    return {
      error: true,
      message: data.message,
      statusCode: response.status,
    } as T;
  }

  return data;
};

const fetchData = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 100000);
  const defaultOptions: RequestInit = {
    method: options?.method || 'GET',
    headers: {
      Accept: '*/*',
      'Cookie': cookie || '',
    },
    signal: controller.signal,
    body: options?.body,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api${url}`,
      defaultOptions,
    );
    clearTimeout(timeoutId);
    const data = await handleResponse<T>(response);

    return data;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out');
    } else {
      throw error;
    }
  }
};

const get = async <T>(url: string): Promise<T> => {
  return fetchData<T>(url);
};

const post = async <T>(url: string, body?: any): Promise<T> => {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetchData<T>(url, options);
};

const put = async <T>(url: string, body?: any): Promise<T> => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  };
  return fetchData<T>(url, options);
};

// Function for DELETE requests
const del = async <T>(url: string, body?: any): Promise<T> => {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  };
  return fetchData<T>(url, options);
};

export { del, get, post, put };
