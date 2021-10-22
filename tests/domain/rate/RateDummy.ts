import faker from 'faker'
import UserIdDummy from '../user/UserIdDummy'
import Rate from '../../../src/domain/rate'
import UserId from '../../../src/domain/user/UserId'

export class RateDummy {
    public static randomRate(): RateBuilder {
        return this.createRate()
            .withTitle(faker.random.words())
            .withScore(Math.floor(Math.random() * 5) + 1)
            .withUserId(UserIdDummy.randomUserId())
    }

    public static randomListOfRatesOfSize(size: number): Rate[] {
        const rates: Rate[] = []

        for (let i = 0; i < size; i++) {
            rates.push(RateDummy.randomRate().build())
        }

        return rates
    }

    public static randomListOfRatesOfSizeForFilm(
        size: number,
        title: string
    ): Rate[] {
        const rates: Rate[] = []

        for (let i = 0; i < size; i++) {
            rates.push(RateDummy.randomRate().withTitle(title).build())
        }

        return rates
    }

    public static createRate(): RateBuilder {
        return new RateBuilder()
    }
}

export default class RateBuilder extends RateDummy {
    private _title = ''
    private _score = 0
    private _userId: UserId = new UserId('')

    RateBuilder() {
        return
    }

    public withTitle(title: string): RateBuilder {
        this._title = title
        return this
    }

    public withScore(score: number): RateBuilder {
        this._score = score
        return this
    }

    public withUserId(userId: UserId): RateBuilder {
        this._userId = userId
        return this
    }

    public build(): Rate {
        return new Rate(this._title, this._score, this._userId)
    }
}
