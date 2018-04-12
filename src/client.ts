import request from "request";
import fs from "fs-extra";
import { Track } from "./app";

namespace Otogumo {
	export class Client {
		private id: string;
		private secret: string;
		private base_url = "http://api.soundcloud.com";

		constructor(id: string, secret: string) {
			this.id = id;
			this.secret = secret;
		}
		
		private get(url: string, options: request.CoreOptions, no_promise: boolean): request.Request;
		private get(url: string, options?: request.CoreOptions): Promise<{response: request.Response, body: string}>;
		private get(url: string, options?: request.CoreOptions, no_promise?: boolean) {
			if (!options) options = {};
			if (!options.qs) options.qs = {};
			options.qs.client_id = this.id;
			if (no_promise) {
				return request(url, options);
			} else {
				return new Promise<{response: request.Response, body: string}>((resolve, reject) => {
					request(url, options, (err, res, body) => {
						if (err) reject(err);
						else resolve({response: res, body: body});
					});
				});
			}
		}
		

		public download(url: string, outfile: string) {
			return this.get(url, {}, true).pipe(fs.createWriteStream(outfile));
		}

		public getTrack(id: string) {
			return new Promise<Track>((resolve, reject) => {
				this.get(`${this.base_url}/tracks/${id}`)
				.then(result => {
					resolve(new Track(JSON.parse(result.body)));
				});
			});
		}

		// 普通のWebからの拾ったリンクからtrackidを逆引きする
		public resolveUrl(url: string) {
			return new Promise<string>(async (resolve, reject) => {
				this.get(
					url,
					{
						headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.121 Safari/537.36 Vivaldi/1.95.1077.41" }
					}
				).then(result => {
					const m = result.body.match(/"https?:\/\/api\.soundcloud\.com\/tracks\/([0-9]+)"/);
					if (!m) {
						reject("Not found track id");
					} else {
						resolve(m[1]);
					}
				});
			});
		}
	}
}

export = Otogumo;
