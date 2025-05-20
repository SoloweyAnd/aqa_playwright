// Реализовать E2E тест по созданию продукта (модуль Products) по аналогии c Customers с шагами
//   - залогиниться
//   - Перейти на страницу Products List
//   - Перейти на страницу Add New Product
//   - Заполнить поля валидными данными
//   - Сохранить продукт
//   - Проверить наличие продукта в таблице

import { STATUS_CODES } from "data/statusCodes";
import { expect, test } from "fixtures/ui-services.fixture";
import _ from "lodash";

test.describe("[E2E] [UI] [Products] [Create]", () => {
  let id = "";
  let token = "";
  test("Create product with smoke data", async ({
    signInUiService,
    homeUiService,
    productsUiService,
    addNewProductUiService,
    productController,
    productsPage,
  }) => {
    token = await signInUiService.signInAsLocalUser();
    await homeUiService.openModule("Products");

    await productsUiService.openAddNewProductPage();
    const createdProduct = await addNewProductUiService.create();
    const response = await productController.getById(createdProduct._id, token);
    id = createdProduct._id;
    expect(response.status).toBe(STATUS_CODES.OK);

    const actualProductData = await productsPage.getProductData(
      createdProduct.name
    );
    expect(actualProductData).toEqual(
      _.pick(createdProduct, ["name", "price", "manufacturer"])
    );
  });

  test.afterEach(async ({ productController }) => {
    await productController.delete(id, token);
  });
});
