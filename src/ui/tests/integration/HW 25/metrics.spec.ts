import { expect, test } from "fixtures/ui-services.fixture";
import { testMetricsData } from "data/metrics/mock-metrics.data";
import { Locator } from "@playwright/test";

test.describe("[UI] [Home] [Metrics]", async () => {
  testMetricsData.forEach((metrics) => {
    test(metrics.testName, async ({ homeUiService, homePage, mock }) => {
      await mock.metric(metrics.data);
      await homeUiService.openAsLoggedInUser();
      expect(homePage[metrics.locator] as Locator).toHaveText(metrics.expected);
    });
  });
});
