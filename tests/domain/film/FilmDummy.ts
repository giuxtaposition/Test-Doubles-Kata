import faker from 'faker'
import Film from '../../../src/domain/film'

export class FilmDummy {
    public static randomFilm(): FilmBuilder {
        return this.create()
            .withTitle(faker.name.findName())
            .withCategories([faker.random.words(), faker.random.words()])
            .withDuration(faker.datatype.number())
            .withReleaseDate(faker.datatype.number())
    }

    public static create(): FilmBuilder {
        return new FilmBuilder()
    }
}

export default class FilmBuilder extends FilmDummy {
    private _title = ''
    private _duration = 0
    private _categories: string[] = new Array<string>()
    private _releaseDate = 0

    public withTitle(title: string) {
        this._title = title
        return this
    }

    public withDuration(duration: number) {
        this._duration = duration
        return this
    }

    public withCategories(categories: string[]) {
        this._categories = categories
        return this
    }

    public withReleaseDate(releaseDate: number) {
        this._releaseDate = releaseDate
        return this
    }

    public build() {
        return new Film(
            this._title,
            this._duration,
            this._categories,
            this._releaseDate
        )
    }
}
