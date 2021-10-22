import UserId from '../../../src/domain/user/UserId'
import faker from 'faker'

export default class UserIdDummy {
    public static randomUserId(): UserId {
        return UserId.of(faker.name.findName())
    }
}
