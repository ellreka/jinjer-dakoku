"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = __importDefault(require("playwright"));
const process_1 = __importDefault(require("process"));
const config_json_1 = __importDefault(require("./config.json"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const args = process_1.default.argv[2];
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
    const browser = yield playwright_1.default.chromium.launch({
        headless: false,
        channel: "chrome",
    });
    const page = yield browser.newPage();
    yield page.goto("https://kintai.jinjer.biz/sign_in");
    // company_code
    yield page.type("[name='company_code']", config_json_1.default.company_code);
    // email
    yield page.type("[name='email']", config_json_1.default.email);
    // password
    yield page.type("[name='password']", config_json_1.default.password);
    yield page.click("#jbtn-login-staff");
    yield page.waitForNavigation();
    yield page.click(`button[data-type='${type}']`);
    yield browser.close();
}))();
