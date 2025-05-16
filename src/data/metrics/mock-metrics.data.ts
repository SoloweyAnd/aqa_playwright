import { MetricsResponse } from "types/home.types";

export const mockMetricsResponse: MetricsResponse = {
  IsSuccess: true,
  Metrics: {
    orders: {
      totalRevenue: 123456,
      totalOrders: 999,
      averageOrderValue: 111,
      totalCanceledOrders: 5,
      recentOrders: [],
      ordersCountPerDay: [],
    },
    customers: {
      totalNewCustomers: 42,
      topCustomers: [],
      customerGrowth: [],
    },
    products: {
      topProducts: [],
    },
  },
  ErrorMessage: null,
};
