import faker from 'faker'

import Film from '../../../src/domain/film'
import FilmService from '../../../src/domain/film/FilmService'
import FilmRepositoryInMemory from '../../support/FilmRepositoryInMemory'
import FilmBuilder from './FilmDummy'

describe('Film Service Test using Fakes', () => {
    let repository: FilmRepositoryInMemory
    let filmService: FilmService

    beforeEach(() => {
        repository = new FilmRepositoryInMemory()
        filmService = new FilmService(repository)
    })

    test('Should Return A Film At Repository', () => {
        const title = 'el viaje de chihiro'
        const film: Film = FilmBuilder.randomFilm().withTitle(title).build()
        repository.save(title, film)

        expect(filmService.findById(title)).toBe(film)
    })

    test('Should Return Undefined When It Is NotPresent', () => {
        const title = faker.random.words()
        expect(filmService.findById(title)).toBeUndefined()
    })
})
