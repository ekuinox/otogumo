import request from "request";
import util from "util";
import fs from "fs-extra";

const target_url = "https://soundcloud.com/gommiofficial/kayzo-this-time-gommi-x-tyeguys-remix";

const output_dir = "./";

const sc: {
	client_id: string,
	client_secret: string,
} = JSON.parse(fs.readFileSync("./conf/keys.json", "utf8"));

(async () => {
	const track_html = await Request(target_url, { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.121 Safari/537.36 Vivaldi/1.95.1077.41" });

	const m = track_html.match(/https?:\/\/api\.soundcloud\.com\/tracks\/[0-9]+/);
	
	if (!m) return;

	const track_url = m[0];

	const track = JSON.parse(await Request(track_url, {}, { client_id: sc.client_id }));

	if (!track.streamable) return;

	request(track.stream_url, { qs: { client_id: sc.client_id }}).pipe(fs.createWriteStream(`./${track.title}.mp3`));
})();

function Request(url: string, headers?: request.Headers, params?: any) {
	return new Promise<string>((resolve, reject) => {
		request(
			url,
			{
				method: "GET",
				headers: headers,
				qs: params
			},
			(err, res, body) => {
				if (err) reject(err);
				else resolve(body);
			}
		)
	});
}