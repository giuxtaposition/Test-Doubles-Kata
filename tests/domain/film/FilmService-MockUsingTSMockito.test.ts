import FilmRepository from '../../../src/domain/film/FilmRepository'
import Film from '../../../src/domain/film'
import FilmBuilder from './FilmDummy'
import FilmService from '../../../src/domain/film/FilmService'

import faker from 'faker'
import { mock, instance, when, verify } from 'ts-mockito'

describe('Film Service Test using Mocks', () => {
    const testTitle = 'el viaje de chihiro'
    const testFilm: Film = FilmBuilder.randomFilm().withTitle(testTitle).build()

    let filmService: FilmService
    let filmRepository: FilmRepository

    beforeEach(() => {
        filmRepository = mock<FilmRepository>()
        filmService = new FilmService(instance(filmRepository))
    })

    test('Should Return A Film At Repository', () => {
        when(filmRepository.findById(testTitle)).thenReturn(testFilm)

        const film: Film | undefined = filmService.findById(testTitle)

        expect(film).toBe(testFilm)
        verify(filmRepository.findById(testTitle)).called()
    })

    test('Should Return Undefined When It Is NotPresent', () => {
        const title = faker.random.words()

        expect(filmService.findById(title)).toBeUndefined()
        verify(filmRepository.findById(title)).called()
    })
})
