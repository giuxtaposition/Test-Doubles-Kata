export default class Film {
    public title: string
    public duration: number
    public categories: string[]
    public releaseDate: number

    constructor(
        title: string,
        duration: number,
        categories: string[],
        releaseDate: number
    ) {
        if (!title.trim().length) {
            throw new Error('Title must not be blank or empty')
        }
        this.title = title
        this.duration = duration
        this.categories = categories
        this.releaseDate = releaseDate
    }

    static of(
        title: string,
        duration: number,
        categories: string[],
        releaseDate: number
    ): Film {
        return new Film(title, duration, categories, releaseDate)
    }

    public toString(): string {
        return (
            'Film{' +
            "title='" +
            this.title +
            "'" +
            ', duration=' +
            this.duration.toString() +
            ', categories=[' +
            this.categories.join(', ') +
            '], releaseDate=' +
            this.releaseDate.toString() +
            '}'
        )
    }
}
