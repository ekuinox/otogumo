namespace Otogumo {
    export class User {
        readonly id: number;
        readonly permalink: string;
        readonly username: string;
        readonly uri: string;
        readonly permalink_url: string;
        readonly avatar_url: string;

        constructor(data: any) {
            this.id = data.id;
            this.permalink = data.permalink;
            this.username = data.username;
            this.uri = data.uri;
            this.permalink_url = data.permalink_url;
            this.avatar_url = data.avatar_url;
        }
    }
}

export = Otogumo;
