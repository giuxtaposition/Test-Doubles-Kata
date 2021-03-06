import { instance, mock, when, verify } from 'ts-mockito'
import Film from '../../../src/domain/film'
import FilmService from '../../../src/domain/film/FilmService'
import Rate from '../../../src/domain/rate'
import LikedNotifier from '../../../src/domain/rate/LikedNotifier'
import RateRepository from '../../../src/domain/rate/RateRepository'
import RateService from '../../../src/domain/rate/RateService'
import UserId from '../../../src/domain/user/UserId'
import RateRepositoryInMemory from '../../support/RateRepositoryInMemory'
import FilmBuilder from '../film/FilmDummy'
import UserIdDummy from '../user/UserIdDummy'
import RateBuilder from './RateDummy'

describe('Rate Service Test using Fakes', () => {
    let repository: RateRepository
    let filmService: FilmService
    let rateService: RateService
    let likedNotifier: LikedNotifier

    beforeEach(() => {
        repository = new RateRepositoryInMemory()
        filmService = mock(FilmService)
        likedNotifier = mock<LikedNotifier>()
        rateService = new RateService(
            repository,
            instance(filmService),
            instance(likedNotifier)
        )
    })

    test('Should save in Repository', () => {
        const rate: Rate = Rate.of('aTitle', 4, UserIdDummy.randomUserId())

        // Exercise
        rateService.save(rate)

        // Verify State
        expect(repository.findById(rate.id)).toBe(rate)
    })

    test('Should receive from repository', () => {
        const rate: Rate = Rate.of('aTitle', 4, UserIdDummy.randomUserId())

        repository.save(rate.id, rate)
        // Exercise
        const ratingFromRepo: Rate | undefined = rateService.findById(rate.id)

        // Verify State
        expect(ratingFromRepo).toBe(rate)
    })

    test('Should return ratings made by a user', () => {
        const userId: UserId = UserId.of('aUser')
        const rateOneByUser: Rate = RateBuilder.randomRate()
            .withUserId(userId)
            .build()
        const rateTwoByUser: Rate = RateBuilder.randomRate()
            .withUserId(userId)
            .build()

        const allRates: Rate[] = RateBuilder.randomListOfRatesOfSize(10)
        allRates.push(rateOneByUser)
        allRates.push(rateTwoByUser)

        // Setup state
        saveRatesIntoService(allRates)

        // Exercise
        const ratedByUser: Rate[] = rateService.findByUser(userId)

        // Verify State
        expect(rateService.findByUser(userId)).toStrictEqual(ratedByUser)
    })

    test('Should return ratings made by User for films released in selected year or more recent', () => {
        const userId: UserId = UserId.of('aUser')
        const productionYear = 2000

        const theLionKingTitle = 'The Lion King'
        const theLionKingMovieAsOldFilm: Film = FilmBuilder.randomFilm()
            .withTitle(theLionKingTitle)
            .withReleaseDate(1994)
            .build()
        const frozenTitle = 'Frozen'
        const frozenMovieAsNewerFilm: Film = FilmBuilder.randomFilm()
            .withTitle(frozenTitle)
            .withReleaseDate(2013)
            .build()
        const rateOfFrozenByUser: Rate = RateBuilder.randomRate()
            .withTitle(frozenTitle)
            .withUserId(userId)
            .build()
        const rateOfTheLionKingByUser: Rate = RateBuilder.randomRate()
            .withTitle(theLionKingTitle)
            .withUserId(userId)
            .build()
        const allRates: Rate[] = RateBuilder.randomListOfRatesOfSize(10)
        allRates.push(rateOfFrozenByUser)
        allRates.push(rateOfTheLionKingByUser)

        // Setup expectations
        saveRatesIntoService(allRates)
        when(filmService.findById(frozenTitle)).thenReturn(
            frozenMovieAsNewerFilm
        )
        when(filmService.findById(theLionKingTitle)).thenReturn(
            theLionKingMovieAsOldFilm
        )

        // Exercise
        const ratesByUserOfFilmsMadeAtYear2000OrMoreRecent: Rate[] =
            rateService.ratedByUserAtYearOrMoreRecent(userId, productionYear)

        // Verify State
        expect(ratesByUserOfFilmsMadeAtYear2000OrMoreRecent).toStrictEqual([
            rateOfFrozenByUser,
        ])
    })

    test('When a film is rate more than 10 times by different users it should send a notification', () => {
        const title = 'aTitle'
        const ratesForFilm: Rate[] = RateBuilder.randomListOfRatesOfSizeForFilm(
            RateService.RATES_PER_FILM_FOR_NOTIFICATION,
            title
        )

        // Exercise
        ratesForFilm.forEach(rateService.save.bind(rateService))

        // Verify Spy
        verify(likedNotifier.notifyForFilm(title)).once()
    })

    const saveRatesIntoService = (rates: Rate[]) => {
        rates.forEach(rate => repository.save(rate.id, rate))
    }
})
