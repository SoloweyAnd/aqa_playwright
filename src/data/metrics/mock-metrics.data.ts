import { MetricsResponse } from "types/home.types";

export const mockMetricsResponse: MetricsResponse = {
  IsSuccess: true,
  Metrics: {
    orders: {
      totalRevenue: 1111,
      totalOrders: 2222,
      averageOrderValue: 3333,
      totalCanceledOrders: 4444,
      recentOrders: [],
      ordersCountPerDay: [],
    },
    customers: {
      totalNewCustomers: 5555,
      topCustomers: [],
      customerGrowth: [],
    },
    products: {
      topProducts: [],
    },
  },
  ErrorMessage: null,
};
