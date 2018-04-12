import fs from "fs-extra";
import * as Otogumo from "../app";

// とりあえず1つのURLから落としてくるサンプル

const target_url = "https://soundcloud.com/iamtheelephante/elephante-age-of-innocence";
const output_dir = "./";

const sc: {
	client_id: string,
	client_secret: string,
} = JSON.parse(fs.readFileSync("./conf/keys.json", "utf8"));

(async () => {
	const client = new Otogumo.Client(sc.client_id, sc.client_secret);
	// 元のURLからtrackのidを逆引きして
	const track_id = await client.resolveUrl(target_url);
	// track情報引っ張って
    const track = await client.getTrack(track_id);

    // 情報を吐く
    console.log(track.downloadable, track.download_url, track.streamable, track.stream_url, track.title, track.user.username);
})();