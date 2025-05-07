export const apiConfig = {
  BASE_URL: "https://aqa-course-project.app",
  ENDPOINTS: {
    CUSTOMERS: "/api/customers",
    LOGIN: "/api/login",
    CUSTOMER_BY_ID: (id: string) => `/api/customers/${id}`,
  },
} as const;
