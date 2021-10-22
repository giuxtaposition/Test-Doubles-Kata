import UserId from '../user/UserId'

export default class RateId {
    public value: string
    private _title: string
    private _userId: UserId

    constructor(title: string, userId: UserId) {
        this._title = title
        this._userId = userId
        this.value = title + '--' + userId.value
    }

    public static of(title: string, userId: UserId): RateId {
        return new RateId(title, userId)
    }

    public toString(): string {
        return (
            'RatingId{' +
            "title='" +
            this._title +
            "'" +
            ', userId=' +
            this._userId.toString() +
            ", value='" +
            this.value +
            "'" +
            '}'
        )
    }
}
