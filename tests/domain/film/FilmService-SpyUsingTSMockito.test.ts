import FilmRepository from '../../../src/domain/film/FilmRepository'
import Film from '../../../src/domain/film'
import FilmBuilder from './FilmDummy'
import FilmService from '../../../src/domain/film/FilmService'
import { mock, instance, verify } from 'ts-mockito'

describe('Film Service Test using Spies', () => {
    const testTitle = 'el viaje de chihiro'
    const testFilm: Film = FilmBuilder.randomFilm().withTitle(testTitle).build()

    let filmService: FilmService
    let filmRepository: FilmRepository

    beforeEach(() => {
        filmRepository = mock<FilmRepository>()
        filmService = new FilmService(instance(filmRepository))
    })

    test('Should Save A Film At Repository', () => {
        filmService.save(testFilm)

        verify(filmRepository.save(testTitle, testFilm)).once()
    })
})
