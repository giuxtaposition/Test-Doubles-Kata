export default class UserId {
    public value: string

    constructor(value: string) {
        this.value = value
    }

    public static of(value: string): UserId {
        if (!value.trim().length) {
            throw new Error('userId must not be blank or empty')
        }

        return new UserId(value)
    }

    public toString(): string {
        return 'UserId{' + "value='" + this.value + "'" + '}'
    }

    public equals(o: object): boolean {
        if (this == o) return true
        if (o == null || typeof this != typeof o) return false
        const userId: UserId = o as UserId
        return this.value === userId.value
    }
}
