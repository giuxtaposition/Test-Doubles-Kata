import faker from 'faker'
import { mock, instance, when } from 'ts-mockito'

import Film from '../../../src/domain/film'
import FilmRepository from '../../../src/domain/film/FilmRepository'
import FilmService from '../../../src/domain/film/FilmService'
import FilmBuilder from './FilmDummy'

describe('Film Service Test using Stubs', () => {
    const testFilm: Film = FilmBuilder.randomFilm().build()
    const testTitle = faker.random.words()

    let filmService: FilmService
    let filmRepository: FilmRepository

    beforeEach(() => {
        filmRepository = mock<FilmRepository>()
        filmService = new FilmService(instance(filmRepository))
    })

    test('Should Return A Film At Repository', () => {
        when(filmRepository.findById(testTitle)).thenReturn(testFilm)

        expect(filmService.findById(testTitle)).toBe(testFilm)
    })

    test('Should Return Undefined When It Is NotPresent', () => {
        const title = faker.random.words()

        when(filmRepository.findById(testTitle)).thenReturn()

        expect(filmService.findById(title)).toBeUndefined()
    })
})
