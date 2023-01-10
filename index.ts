import playwright from "playwright";
import process from "process";
import config from "./config.json";

(async () => {
  const args = process.argv[2];

  if (["start", "end"].includes(args) === false)
    throw new Error("invalid args");

  const type = (() => {
    switch (args) {
      case "start":
        return "check_in";
      case "end":
        return "check_out";
    }
  })();

  const browser = await playwright.chromium.launch({
    headless: false,
    channel: "chrome",
  });
  const page = await browser.newPage();
  await page.goto("https://kintai.jinjer.biz/sign_in");

  // company_code
  await page.type("[name='company_code']", config.company_code);
  // email
  await page.type("[name='email']", config.email);
  // password
  await page.type("[name='password']", config.password);

  await page.click("#jbtn-login-staff");

  await page.waitForNavigation();

  await page.click(`button[data-type='${type}']`);

  await browser.close();
})();
