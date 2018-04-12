import fs from "fs-extra";
import Otogumo from "../app";

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
	// streamableじゃなかったら諦めて
	if (!track.streamable) return;
	// mp3として落とし込む（ここmp3固定でいいのかな？）
	client.download(track.stream_url, `${output_dir}${track.title}.mp3`);
})();