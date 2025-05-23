import numeral from "numeral";
import { IMertricsData } from "types/home.types";

const performer = {
  _id: "67c4fd63735ace5b03527f81",
  username: "test@gmail.com",
  firstName: "Anatoly",
  lastName: "Karpovich",
  roles: ["USER"],
  createdOn: "2025/03/03 01:52:51",
};

const products = [
  {
    _id: "67dd3f03d006ba3d475f35ab",
    name: "Bacon108",
    amount: 427,
    price: 93970,
    manufacturer: "Sony",
    notes: "Notes",
    received: false,
  },
  {
    _id: "6813e87bd006ba3d476052f1",
    name: "Cheese72285",
    amount: 135,
    price: 98664,
    manufacturer: "Sony",
    notes: "Notes",
    received: false,
  },
];

const customer = {
  _id: "67da8789d006ba3d475eed7c",
  email: "1742374793031Romaine.Keebler28@hotmail.com",
  name: "ArYdNbUxEbYkMhmgWBEpReOQmZgyXwkbtoy",
  country: "Great Britain",
  city: "City pObKNUjAiTPtkDH",
  street: "Street u2oqBYeHT40t4PmZQcsCcjPicx5OJc8dh",
  house: 137,
  flat: 4568,
  phone: "+81463758682",
  createdOn: "2025-03-19T08:59:53.000Z",
  notes: "Notes",
};

export const ordersMetric = {
  orders: {
    totalRevenue: 1195782,
    totalOrders: 14,
    averageOrderValue: 85413,
    totalCanceledOrders: 2,
    recentOrders: [
      {
        _id: "6826414cd006ba3d47616f17",
        status: "Canceled",
        customer,
        products,
        delivery: null,
        total_price: 192634,
        createdOn: "2025-05-15T19:32:28.000Z",
        comments: [],
        history: [
          {
            status: "Canceled",
            customer: customer._id,
            products,
            total_price: 192634,
            delivery: null,
            changedOn: "2025-05-15T19:37:01.000Z",
            action: "Order canceled",
            performer,
          },
          {
            status: "Draft",
            customer: customer._id,
            products,
            total_price: 192634,
            delivery: null,
            changedOn: "2025-05-15T19:32:28.000Z",
            action: "Order created",
            performer,
          },
        ],
        assignedManager: performer,
      },
    ],
    ordersCountPerDay: [
      {
        date: { day: 15, month: 5, year: 2025 },
        count: 2,
      },
    ],
  },
  customers: {
    totalNewCustomers: 14,
    topCustomers: [
      {
        _id: "68263e17d006ba3d47616b96",
        totalSpent: 407484,
        ordersCount: 1,
        customerName: "Test oLkAAzQUjIGJGPAbrfyHRHKHOInFhYOeVcw",
        customerEmail: "test1747336726866@gmail.com",
      },
    ],
    customerGrowth: [
      {
        date: { year: 2025, month: 5, day: 17 },
        count: 5,
      },
    ],
  },
  products: {
    topProducts: [
      {
        name: "Ball54972",
        sales: 10,
      },
    ],
  },
};

export const testMetricsData: IMertricsData[] = [
  {
    testName: "Should display valid totalOrders metric",
    data: {
      Metrics: {
        ...ordersMetric,
        orders: { ...ordersMetric.orders, totalOrders: 1111 },
      },
      ErrorMessage: null,
      IsSuccess: true,
    },
    expected: "1111",
    locator: "totalOrders",
  },
  {
    testName: "Should display valid NewCustomers metric",
    data: {
      Metrics: {
        ...ordersMetric,
        customers: {
          ...ordersMetric.customers,
          totalNewCustomers: 2222,
        },
      },
      ErrorMessage: null,
      IsSuccess: true,
    },
    expected: "2222",
    locator: "totalCustomers",
  },
  {
    testName: "Should display valid CanceledOrders metric",
    data: {
      Metrics: {
        ...ordersMetric,
        orders: {
          ...ordersMetric.orders,
          totalCanceledOrders: 3333,
        },
      },
      ErrorMessage: null,
      IsSuccess: true,
    },
    expected: "3333",
    locator: "canceledOrders",
  },
  {
    testName: "Should display valid TotalRevenue metric",
    data: {
      Metrics: {
        ...ordersMetric,
        orders: { ...ordersMetric.orders, totalRevenue: 44444 },
      },
      ErrorMessage: null,
      IsSuccess: true,
    },
    expected: "$" + numeral(44444).format("0.0a"),
    locator: "totalRevenue",
  },
  {
    testName: "Should display valid AvgOrdersValue metric",
    data: {
      Metrics: {
        ...ordersMetric,
        orders: {
          ...ordersMetric.orders,
          averageOrderValue: 5555,
        },
      },
      ErrorMessage: null,
      IsSuccess: true,
    },
    expected: "$" + numeral(5555).format("0.0a"),
    locator: "avgOrdersValue",
  },
];
