export type ModuleName = "Customers" | "Products" | "Orders";

export interface MetricsResponse {
  IsSuccess: boolean;
  Metrics: Metrics;
  ErrorMessage: string | null;
}

export interface Metrics {
  orders: OrdersMetrics;
  customers: CustomersMetrics;
  products: ProductsMetrics;
}

export interface OrdersMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: RecentOrder[];
  ordersCountPerDay: OrdersPerDay[];
}

export interface CustomersMetrics {
  totalNewCustomers: number;
  topCustomers: TopCustomer[];
  customerGrowth: CustomerGrowthPoint[];
}

export interface ProductsMetrics {
  topProducts: TopProduct[];
}

export interface RecentOrder {
  id: string;
  status: string;
  customerName: string;
  totalPrice: number;
  createdAt: string;
}

export interface OrdersPerDay {
  date: string;
  count: number;
}

export interface TopCustomer {
  id: string;
  name: string;
  totalSpent: number;
}

export interface CustomerGrowthPoint {
  date: string;
  newCustomers: number;
}

export interface TopProduct {
  id: string;
  name: string;
  totalSold: number;
}
