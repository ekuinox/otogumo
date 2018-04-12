"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const target_url = "https://soundcloud.com/gommiofficial/kayzo-this-time-gommi-x-tyeguys-remix";
const output = "";
const sc = {
    client_id: "5f80f50aa00dd55ac41f4731c0c45e27",
    client_secret: "24a1100873f10c13af9bee1fd2b19144"
};
(async () => {
    const track_html = await Request(target_url, { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.121 Safari/537.36 Vivaldi/1.95.1077.41" });
    const m = track_html.match(/https?:\/\/api\.soundcloud\.com\/tracks\/[0-9]+/);
    if (!m)
        return;
    const track_url = m[0];
    const track = JSON.parse(await Request(track_url, {}, { client_id: sc.client_id }));
    console.log(track);
})();
function Request(url, headers, params) {
    return new Promise((resolve, reject) => {
        request_1.default(url, {
            method: "GET",
            headers: headers,
            qs: params
        }, (err, res, body) => {
            if (err)
                reject(err);
            else
                resolve(body);
        });
    });
}
