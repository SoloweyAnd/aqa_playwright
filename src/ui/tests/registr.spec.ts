import test, { expect } from "@playwright/test";

test.describe("[UI][1.2 Smoke] Registration form", () => {
  const validValues = {
    firstName: "Andrei",
    lastName: "Salaveika",
    address: "San Francisco",
    email: "qaAoW@example.com",
    phone: "123456789",
    language: "English",
    password: "1234567!",
    confirmPassword: "1234567!",
    country: "Canada",
    gender: "male",
    skills: "JavaScript",
    hobbies: "Movies",
    dateOfBirth: "19 December 1993",
  };
  test("Fill registration form", async ({ page }) => {
    await page.goto(
      "https://anatoly-karpovich.github.io/demo-registration-form/"
    );
    await page.locator("#firstName").fill(validValues.firstName);
    await page.locator("#lastName").fill(validValues.lastName);
    await page.locator("#address").fill(validValues.address);
    await page.locator("#email").fill(validValues.email);
    await page.locator("#phone").fill(validValues.phone);

    const country = page.locator("#country");
    await country.selectOption("Canada");

    await page.locator("input[name='gender'][value='male']").click();

    await page.locator('.hobby[value="Movies"]').click();

    await page.locator("#language").fill(validValues.language);

    const skills = page.locator("#skills");
    await skills.selectOption("JavaScript");

    const yearOfBirthdate = page.locator("#year");
    await yearOfBirthdate.selectOption("1993");

    const monthOfBirthdate = page.locator("#month");
    await monthOfBirthdate.selectOption("December");

    const dayOfBirthdate = page.locator("#day");
    await dayOfBirthdate.selectOption("19");

    await page.locator("#password").fill(validValues.password);
    await page.locator("#password-confirm").fill(validValues.confirmPassword);
    await page.locator('button[type="submit"]').click();

    //проверки
    await expect(page.locator("h2.text-center")).toContainText(
      "Registration Details"
    );

    await expect(page.locator("#fullName")).toContainText(
      `${validValues.firstName} ${validValues.lastName}`
    );
    await expect(page.locator("#address")).toContainText(
      `${validValues.address}`
    );
    await expect(page.locator("#email")).toContainText(`${validValues.email}`);
    await expect(page.locator("#phone")).toContainText(`${validValues.phone}`);
    await expect(page.locator("#country")).toContainText(
      `${validValues.country}`
    );
    await expect(page.locator("#gender")).toContainText(
      `${validValues.gender}`
    );
    await expect(page.locator("#language")).toContainText(
      `${validValues.language}`
    );
    await expect(page.locator("#skills")).toContainText(
      `${validValues.skills}`
    );
    await expect(page.locator("#hobbies")).toContainText(
      `${validValues.hobbies}`
    );
    await expect(page.locator("#dateOfBirth")).toContainText(
      `${validValues.dateOfBirth}`
    );
    await expect(page.locator("#password")).toContainText(`********`);
  });
});
