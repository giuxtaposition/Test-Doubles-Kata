import FilmRepository from '../../../src/domain/film/FilmRepository'
import Film from '../../../src/domain/film'
import FilmBuilder from './FilmDummy'
import FilmService from '../../../src/domain/film/FilmService'

describe('Film Service Test using Spies', () => {
    const testTitle = 'el viaje de chihiro'
    const testFilm: Film = FilmBuilder.randomFilm().withTitle(testTitle).build()

    let filmService: FilmService
    let filmRepository: FilmRepository_Spy

    beforeEach(() => {
        filmRepository = new FilmRepository_Spy()
        filmService = new FilmService(filmRepository)
    })

    test('Should Save A Film At Repository', () => {
        filmService.save(testFilm)

        expect(filmRepository.hasBeenCalledWithExpectedParams).toBeTruthy()
    })

    class FilmRepository_Spy implements FilmRepository {
        hasBeenCalledWithExpectedParams = false

        public save(title: string, film: Film) {
            if (title === testTitle && film === testFilm) {
                this.hasBeenCalledWithExpectedParams = true
            }
        }

        public findById(_title: string) {
            return undefined
        }
    }
})
