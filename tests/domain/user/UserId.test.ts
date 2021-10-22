import UserId from '../../../src/domain/user/UserId'

describe('UserId', () => {
    test('can be any string', () => {
        const userId: UserId = UserId.of('unicorn')

        expect(userId.toString()).toBe("UserId{value='unicorn'}")
    })

    test('cannot be an empty string', () => {
        expect(UserId.of.bind(UserId, '')).toThrowError(
            'userId must not be blank or empty'
        )
    })

    test('cannot be a blank string', () => {
        expect(UserId.of.bind(UserId, '  ')).toThrowError(
            'userId must not be blank or empty'
        )
    })

    test('cannot be null', () => {
        expect(UserId.of.bind(UserId, null)).toThrowError()
    })
})
