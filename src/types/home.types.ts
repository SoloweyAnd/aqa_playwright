import { HomePage } from "ui/pages/home.page";
import { IResponseFields } from "./api.types";

export type ModuleName = "Customers" | "Products" | "Orders";

interface ICustomerMetrics {
  customerGrowth: object[];
  topCustomers: object[];
  totalNewCustomers: number;
}

interface IOrdersMetrics {
  averageOrderValue: number;
  ordersCountPerDay: object[];
  recentOrders: object[];
  totalCanceledOrders: number;
  totalOrders: number;
  totalRevenue: number;
}

interface IProductsMetrics {
  topProducts: object[];
}
interface IMetrics {
  customers: ICustomerMetrics;
  orders: IOrdersMetrics;
  products: IProductsMetrics;
}

export interface IMetricsResponse extends IResponseFields {
  Metrics: IMetrics;
}

export interface IMertricsData {
  testName: string;
  data: IMetricsResponse;
  expected: string;
  locator: keyof HomePage;
}
