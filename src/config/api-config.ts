export const apiConfig = {
  BASE_URL: "https://aqa-course-project.app",
  ENDPOINTS: {
    CUSTOMERS: "/api/customers",
    LOGIN: "/api/login",
    CUSTOMER_BY_ID: (id: string) => `/api/customers/${id}`,
    METRIKS: "/api/metrics",
    PRODUCTS: "/api/products",
    PRODUCTS_BY_ID: (id: string) => `/api/products/${id}/`,
  },
} as const;
