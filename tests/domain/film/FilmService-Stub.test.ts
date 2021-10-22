import faker from 'faker'

import Film from '../../../src/domain/film'
import FilmRepository from '../../../src/domain/film/FilmRepository'
import FilmService from '../../../src/domain/film/FilmService'
import FilmBuilder from './FilmDummy'

describe('Film Service Test using Stubs', () => {
    const randomFilm: Film = FilmBuilder.randomFilm().build()

    test('Should Return A Film At Repository', () => {
        const filmService: FilmService = new FilmService(
            new FilmRepositoryReturningValue_Stub()
        )

        const title = faker.random.words()

        expect(filmService.findById(title)).toBe(randomFilm)
    })

    test('Should Return Undefined When It Is NotPresent', () => {
        const filmService: FilmService = new FilmService(
            new FilmRepositoryReturningEmpty_Stub()
        )

        const title = faker.random.words()
        expect(filmService.findById(title)).toBeUndefined()
    })

    class FilmRepositoryReturningValue_Stub implements FilmRepository {
        public save(_title: string, _film: Film) {
            return
        }

        public findById(_title: string) {
            return randomFilm
        }
    }

    class FilmRepositoryReturningEmpty_Stub implements FilmRepository {
        public save(_title: string, _film: Film) {
            return
        }

        public findById(_title: string) {
            return undefined
        }
    }
})
