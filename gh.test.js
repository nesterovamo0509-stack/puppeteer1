let page;

const openPage = async (url) => {
  page = await browser.newPage();
  await page.goto(url);
};

const closePage = async () => {
  if (page) {
    await page.close();
  }
};

describe("Github team page tests", () => {
  beforeEach(async () => {
    await openPage("https://github.com/team");
  });

  afterEach(async () => {
    await closePage();
  });

test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual(
      'GitHub · Change is constant. GitHub keeps you ahead. · GitHub'
    );
  }, 30000);

  test("The first link attribute", async () => {
    const actual = await page.$eval(
      "a",
      link => link.getAttribute('href')
    );
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(
      btnSelector,
      link => link.textContent
    );
    expect(actual).toContain("Get started with Team");
  }, 10000);
});

describe("Other Github pages tests", () => {
  afterEach(async () => {
    await closePage();
  });

  test("Pricing page title", async () => {
    await openPage("https://github.com/pricing");
    const title = await page.title();
    expect(title).toContain("Pricing");
  }, 10000);

  test("About page title", async () => {
    await openPage("https://github.com/about");
    const title = await page.title();
    expect(title).toContain("GitHub");
  }, 10000);

  test("Features page title", async () => {
    await openPage("https://github.com/features");
    const title = await page.title();
    expect(title).toContain("Features");
  }, 10000);
});