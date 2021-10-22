import Film from '../../../src/domain/film'

describe('Film', () => {
    test('Should Be Created', () => {
        const film: Film = Film.of(
            'Interstellar',
            60,
            ['Adventure', 'Drama', 'Sci-Fi'],
            2014
        )

        expect(film.toString()).toBe(
            "Film{title='Interstellar', duration=60, categories=[Adventure, Drama, Sci-Fi], releaseDate=2014}"
        )
    })

    test('Title must not be empty', () => {
        expect(() => {
            Film.of('', 60, ['Adventure', 'Drama', 'Sci-Fi'], 2014)
        }).toThrowError()
    })
})
