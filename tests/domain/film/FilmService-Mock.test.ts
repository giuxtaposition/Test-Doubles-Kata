import FilmRepository from '../../../src/domain/film/FilmRepository'
import Film from '../../../src/domain/film'
import FilmBuilder from './FilmDummy'
import FilmService from '../../../src/domain/film/FilmService'

import faker from 'faker'

describe('Film Service Test using Mocks', () => {
    const testTitle = 'el viaje de chihiro'
    const testFilm: Film = FilmBuilder.randomFilm().withTitle(testTitle).build()

    let filmService: FilmService

    beforeEach(() => {
        const filmRepository: FilmRepository_Mock = new FilmRepository_Mock()
        filmService = new FilmService(filmRepository)
    })

    test('Should Return A Film At Repository', () => {
        const film: Film | undefined = filmService.findById(testTitle)

        expect(film).toBe(testFilm)
    })

    test('Should Return Undefined When It Is NotPresent', () => {
        const title = faker.random.words()

        expect(filmService.findById(title)).toBeUndefined()
    })

    class FilmRepository_Mock implements FilmRepository {
        public save(_title: string, _film: Film) {
            return
        }

        public findById(title: string) {
            if (title === testTitle) {
                return testFilm
            }
            return undefined
        }
    }
})
