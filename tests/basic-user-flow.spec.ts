import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://127.0.0.1:3000/");
});

const credentials = {
  name: "Summer",
  email: "summer@pup.com",
};

test.describe("Basic user flow", () => {
  test("should navigate to sign in", async ({ page }) => {
    await page.goto("http://127.0.0.1:3000/sign-in");
  });

  test("should sign in user", async ({ page }) => {
    const nameInput = page.getByTestId("sign-in-name-input");
    await nameInput.fill(credentials.name);

    await nameInput.press("Tab");

    const emailInput = page.getByTestId("sign-in-email-input");
    await emailInput.fill(credentials.email);
    await emailInput.press("Enter");

    await page.waitForTimeout(500);

    // TODO: Fix assertions
    //   await expect(page.getByTestId("sign-in-name-input")).toHaveText([credentials.name]);
    //   await expect(page.getByTestId("sign-in-email-input")).toHaveText([credentials.email]);
  });

  test("should open search modal, select German Shepherd and Malamute, input an age range of 2-5, submit, sort descending then ascending, scroll to next page, go to dog info page on second page", async ({
    page,
  }) => {
    const nameInput = page.getByTestId("sign-in-name-input");
    await nameInput.fill(credentials.name);
    await nameInput.press("Tab");

    const emailInput = page.getByTestId("sign-in-email-input");
    await emailInput.fill(credentials.email);
    await emailInput.press("Enter");

    await page.waitForTimeout(1000);

    const searchDialogTrigger = page.getByTestId("search-dialog-trigger");
    await searchDialogTrigger.click();

    const dogBreedSelectTrigger = page.getByTestId("dog-breed-select-trigger");
    await dogBreedSelectTrigger.click();

    const dogBreedSearchBar = page.getByTestId("dog-breed-search-bar");
    await dogBreedSearchBar.fill("german");

    await page.getByTestId("german shepherd-label").click();
    await dogBreedSelectTrigger.click();

    await dogBreedSearchBar.fill("mala");
    await page.getByTestId("malamute-label").click();
    await dogBreedSelectTrigger.click();
    await dogBreedSelectTrigger.click();

    const minAgeInput = page.getByTestId("min-age-input");
    await minAgeInput.click();
    await minAgeInput.fill("2");

    const maxAgeInput = page.getByTestId("max-age-input");
    await maxAgeInput.click();
    await maxAgeInput.fill("5");

    await page.getByTestId("submit-search").click();
    await page.waitForTimeout(500);

    await page.getByRole("button", { name: "Sort breed A-Z" }).click();
    await page.waitForTimeout(500);

    await page.getByRole("button", { name: "Sort breed Z-A" }).click();
    await page.waitForTimeout(500);

    const infiniteScrollRef = page.getByTestId("infinite-scroll-dogs-skeleton");
    await infiniteScrollRef.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const delphineMalamuteDogCard = page.getByText("Delphine3Malamute48059");
    await delphineMalamuteDogCard.click();
  });

  test("should match with dog", async ({ page }) => {
    const nameInput = page.getByTestId("sign-in-name-input");
    await nameInput.fill(credentials.name);
    await nameInput.press("Tab");

    const emailInput = page.getByTestId("sign-in-email-input");
    await emailInput.fill(credentials.email);

    await emailInput.press("Enter");
    await page.waitForTimeout(1000);

    await page.getByRole("button", { name: "Match" }).click();
  });
});
