import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest<T = any>(
  urlOrMethod: string,
  urlOrData?: string | unknown,
  optionalData?: unknown
): Promise<T> {
  // Handle both function signatures:
  // 1. apiRequest<T>(url) - GET request
  // 2. apiRequest<T>(method, url, data) - Other methods with data
  
  let method: string;
  let url: string;
  let body: unknown | undefined;
  
  const argCount = urlOrData === undefined ? 1 : (optionalData === undefined ? 2 : 3);
  const isSecondArgString = typeof urlOrData === 'string';
  
  if (argCount === 1 || (argCount === 2 && !isSecondArgString)) {
    // apiRequest<T>(url, data?) - GET request
    method = 'GET';
    url = urlOrMethod;
    body = urlOrData;
  } else {
    // apiRequest<T>(method, url, data) - Other methods
    method = urlOrMethod;
    url = urlOrData as string;
    body = optionalData;
  }

  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return await res.json() as T;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
