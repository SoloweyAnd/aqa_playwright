import { test, expect } from "fixtures/businessSteps.fixture";
import { mockMetricsResponse } from "data/metrics/mock-metrics.data";

test.describe("[UI] [Home] [Metrics]", () => {
  test("Should display metrics", async ({
    loginAsLocalUser,
    homePage,
    mock,
  }) => {
    await mock.metrics(mockMetricsResponse);
    await loginAsLocalUser();

    const expected = {
      ordersThisYear: mockMetricsResponse.Metrics.orders.totalOrders.toString(),
      newCustomers:
        mockMetricsResponse.Metrics.customers.totalNewCustomers.toString(),
      canceledOrders:
        mockMetricsResponse.Metrics.orders.totalCanceledOrders.toString(),
    };

    const actual = {
      ordersThisYear: await homePage.ordersThisYearMetric.innerText(),
      newCustomers: await homePage.newCustomersMetric.innerText(),
      canceledOrders: await homePage.canceledOrdersMetric.innerText(),
    };

    expect(actual).toEqual(expected);
  });
});
