// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

import test, { expect } from "@playwright/test";

interface IRegistrationTestData {
  testName: string;
  username: string;
  password: string;
  message: string;
}

const URL = "https://anatoly-karpovich.github.io/demo-login-form/";
const SELECTORS = {
  registerLink: "#registerOnLogin",
  form: ".registerForm",
  username: "#userNameOnRegister",
  password: "#passwordOnRegister",
  submit: "#register",
  error: "#errorMessageOnRegister",
};

const registrationInvalidTestData: IRegistrationTestData[] = [
  {
    testName: "Registered with min username",
    username: "aB",
    password: "123AAbb!1",
    message: "Username should contain at least 3 characters",
  },
  {
    testName: "Registered with min password",
    username: "Test1!",
    password: "12a!Aba",
    message: "Password should contain at least 8 characters",
  },
  {
    testName: "Registered with empty username",
    username: "",
    password: "123AAbb!1",
    message: "Username is required",
  },
  {
    testName: "Registered with empty password",
    username: "Test1!",
    password: "",
    message: "Password is required",
  },
  {
    testName: "Username with leading space",
    username: " Test1!sw1",
    password: "123AAbb!1",
    message: "Prefix and postfix spaces are not allowed is username",
  },
  {
    testName: "Username with trailing space",
    username: "TestUser1! ",
    password: "123AAbb!1",
    message: "Prefix and postfix spaces are not allowed is username",
  },
  {
    testName: "Username with only spaces",
    username: "     ",
    password: "123AAbb!1",
    message: "Prefix and postfix spaces are not allowed is username",
  },
  {
    testName: "Password with only spaces",
    username: "TestUser1!",
    password: "        ",
    message: "Password is required",
  },
  {
    testName: "Password without lowercase letter",
    username: "ValidUser1",
    password: "123ABB!@#",
    message: "Password should contain at least one character in lower case",
  },
];

async function submitRegistrationForm(
  page,
  username: string,
  password: string
) {
  const form = page.locator(SELECTORS.form);
  await form.locator(SELECTORS.username).fill(username);
  await form.locator(SELECTORS.password).fill(password);
  await form.locator(SELECTORS.submit).click();
  return form;
}

test.describe("[UI] [Registration] Negative scenarios", () => {
  registrationInvalidTestData.forEach(
    ({ testName, username, password, message }) => {
      test(testName, async ({ page }) => {
        await page.goto(URL);
        await page.locator(SELECTORS.registerLink).click();
        const form = await submitRegistrationForm(page, username, password);
        await expect(form.locator(SELECTORS.error)).toHaveText(message);
      });
    }
  );
});
