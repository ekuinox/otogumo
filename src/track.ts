import { User } from "./app";

namespace Otogumo {
    // https://developers.soundcloud.com/docs/api/reference#tracks
    export class Track {
        readonly id: number;
        readonly created_at: string;
        readonly user_id: number;
        readonly user: User;
        readonly title: string;
        readonly permalink: string;
        readonly uri: string;
        readonly sharing: string;
        readonly embeddable_by: string;
        readonly purchase_url: string;
        readonly artwork_url: string;
        readonly description: string;
        readonly label: any;
        readonly duration: number; 
        readonly genre: string;
        readonly tag_list: string;
        readonly label_id: number;
        readonly label_name: string;
        readonly release: number;
        readonly release_day: number;
        readonly release_month: number;
        readonly release_year: number;
        readonly streamable: boolean;
        readonly state: string;
        readonly downloadable: boolean;
        readonly license: string;
        readonly track_type: string;
        readonly waveform_url: string;
        readonly download_url: string;
        readonly stream_url: string;
        readonly video_url: string;
        readonly bpm: number;
        readonly commentable: boolean;
        readonly isrc: string;
        readonly key_signature: string;
        readonly comment_count: number;
        readonly download_count: number;
        readonly playback_count: number;
        readonly favoritings_count: number;
        readonly original_format: string;
        readonly original_content_size: number;
        readonly asset_data: any;
        readonly artwork_data: any;
        readonly user_favorite: number;

        constructor(data: any) {
            if (data.kind !== "track") throw new Error("data is not a track");
            this.id = data.id;
            this.created_at = data.created_at;
            this.user_id = data.user_id;
            this.user = new User(data.user);
            this.title = data.title;
            this.permalink = data.permalink;
            this.uri = data.uri;
            this.sharing = data.sharing;
            this.embeddable_by = data.embeddable_by;
            this.purchase_url = data.purchase_url;
            this.artwork_url = data.artwork_url;
            this.description = data.description;
            this.label = data.label;
            this.duration = data.duration;
            this.genre = data.genre;
            this.tag_list = data.tag_list;
            this.label_id = data.label_id;
            this.label_name = data.label_name;
            this.release = data.release;
            this.release_day = data.release_day;
            this.release_month = data.release_month;
            this.release_year = data.release_year;
            this.streamable = data.streamable;
            this.state = data.state;
            this.downloadable = data.downloadable;
            this.license = data.license;
            this.track_type = data.track_type;
            this.waveform_url = data.waveform_url;
            this.download_url = data.download_url;
            this.stream_url = data.stream_url;
            this.video_url = data.video_url;
            this.bpm = data.bpm;
            this.commentable = data.commentable;
            this.isrc = data.isrc;
            this.key_signature = data.key_signature;
            this.comment_count = data.comment_count;
            this.download_count = data.download_count;
            this.playback_count = data.playback_count;
            this.favoritings_count = data.favoritings_count;
            this.original_format = data.original_format;
            this.original_content_size = data.original_content_size;
            this.asset_data = data.asset_data;
            this.artwork_data = data.artwork_data;
            this.user_favorite = data.user_favorite;
        }
    }
}

export = Otogumo;
