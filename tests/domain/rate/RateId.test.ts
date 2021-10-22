import RateId from '../../../src/domain/rate/RateId'
import UserId from '../../../src/domain/user/UserId'

describe('RateId', () => {
    test('should be composed of title and userId', () => {
        const title = 'aTitle'
        const userId: UserId = UserId.of('aUserId')

        const rateId: RateId = RateId.of(title, userId)

        expect(rateId.toString()).toBe(
            "RatingId{title='aTitle', userId=UserId{value='aUserId'}, value='aTitle--aUserId'}"
        )
    })
})
