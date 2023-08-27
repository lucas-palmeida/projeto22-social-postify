export class Media {
    // private _id: number;
    private _title: string;
    private _username: string;

    constructor(title: string, username: string) {
        // this._id = id;
        this._title = title;
        this._username = username;
    }

    // get id(): number {
    //     return this._id;
    // }

    get title(): string {
        return this._title;
    }

    get username(): string {
        return this._username;
    }
}
