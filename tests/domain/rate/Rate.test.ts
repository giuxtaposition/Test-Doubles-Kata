import faker from 'faker'
import Rate from '../../../src/domain/rate'
import UserId from '../../../src/domain/user/UserId'
import UserIdDummy from '../user/UserIdDummy'
import RateBuilder from './RateDummy'

describe('Rate', () => {
    const title = faker.random.words()

    test('Ratings Cannot Be Less Than 1', () => {
        expect(
            Rate.of.bind(title, Rate.MIN_SCORE - 1, UserIdDummy.randomUserId())
        ).toThrowError()
    })

    test('Ratings Cannot Be More Than 5', () => {
        expect(
            Rate.of.bind(title, Rate.MAX_SCORE + 1, UserIdDummy.randomUserId())
        ).toThrowError()
    })

    test('Title and UserId must not be null', () => {
        expect(Rate.of.bind(null, Rate.MAX_SCORE + 1, null)).toThrowError()
    })

    test('Ratings of 5 is valid', () => {
        const rate: Rate = Rate.of(title, 5, UserId.of('aUsername'))

        expect(rate.toString()).toEqual(
            "Rating{id='" +
                rate.id.toString() +
                "', " +
                "title='" +
                title +
                "', " +
                "score=5, userId=UserId{value='aUsername'}}"
        )
    })

    test('Ratings of 1 is valid', () => {
        const rate: Rate = Rate.of(title, 1, UserId.of('aUsername'))

        expect(rate.toString()).toEqual(
            "Rating{id='" +
                rate.id.toString() +
                "', " +
                "title='" +
                title +
                "', " +
                "score=1, userId=UserId{value='aUsername'}}"
        )
    })

    test('Should return True when done by User', () => {
        const userId: UserId = UserId.of('aUser')
        const rate: Rate = RateBuilder.randomRate().withUserId(userId).build()

        expect(rate.by(userId)).toBeTruthy()
    })

    test('Should return False when NOT done by User', () => {
        const userId: UserId = UserId.of('aUser')
        const rate: Rate = RateBuilder.randomRate().withUserId(userId).build()

        expect(rate.by(UserIdDummy.randomUserId())).toBeFalsy()
    })
})
