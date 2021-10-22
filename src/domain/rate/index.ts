import UserId from '../user/UserId'
import RateId from './RateId'

export default class Rate {
    static MIN_SCORE = 1
    static MAX_SCORE = 5

    public id: RateId
    public title: string
    public score: number
    public userId: UserId

    constructor(title: string, score: number, userId: UserId) {
        if (score < Rate.MIN_SCORE || score > Rate.MAX_SCORE) {
            throw new Error('score must be between 1 or 5, both included')
        }
        this.id = RateId.of(title, userId)
        this.title = title
        this.score = score
        this.userId = userId
    }

    public static of(title: string, score: number, userId: UserId): Rate {
        return new Rate(title, score, userId)
    }

    public toString(): string {
        return (
            'Rating{' +
            "id='" +
            this.id.toString() +
            "'" +
            ", title='" +
            this.title +
            "'" +
            ', score=' +
            this.score.toString() +
            ', userId=' +
            this.userId.toString() +
            '}'
        )
    }

    public by(userId: UserId): boolean {
        return this.userId.equals(userId)
    }
}
