import { mockMetricsResponse } from "data/metrics/mock-metrics.data";
import { expect, test } from "fixtures/businessSteps.fixture";

test.describe("[UI] [Home] Dashboard metrics", () => {
  test.beforeEach(async ({ mock, loginAsLocalUser }) => {
    await mock.metrics(mockMetricsResponse);
    await loginAsLocalUser();
  });

  test("Should display correct 'Orders this year'", async ({ homePage }) => {
    const { totalOrders } = await homePage.getMetricValues("totalOrders");
    expect(totalOrders).toBe(mockMetricsResponse.Metrics.orders.totalOrders);
  });

  test("Should display correct 'Canceled Orders'", async ({ homePage }) => {
    const { totalCanceledOrders } = await homePage.getMetricValues(
      "totalCanceledOrders"
    );
    expect(totalCanceledOrders).toBe(
      mockMetricsResponse.Metrics.orders.totalCanceledOrders
    );
  });

  test("Should display correct 'New Customers'", async ({ homePage }) => {
    const { totalNewCustomers } = await homePage.getMetricValues(
      "totalNewCustomers"
    );
    expect(totalNewCustomers).toBe(
      mockMetricsResponse.Metrics.customers.totalNewCustomers
    );
  });
});
