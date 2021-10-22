import { instance, mock } from 'ts-mockito'
import Film from '../../../src/domain/film'
import FilmService from '../../../src/domain/film/FilmService'
import Rate from '../../../src/domain/rate'
import LikedNotifier from '../../../src/domain/rate/LikedNotifier'
import RateRepository from '../../../src/domain/rate/RateRepository'
import RateService from '../../../src/domain/rate/RateService'
import UserId from '../../../src/domain/user/UserId'
import FilmBuilder from '../film/FilmDummy'
import UserIdDummy from '../user/UserIdDummy'
import RateBuilder from './RateDummy'

describe('Rate Service Test using Mocks', () => {
    let repository: RateRepository
    let filmService: FilmService
    let rateService: RateService
    let likedNotifier: LikedNotifier

    beforeEach(() => {
        repository = mock<RateRepository>()
        filmService = mock(FilmService)
        likedNotifier = mock<LikedNotifier>()
        rateService = new RateService(
            instance(repository),
            instance(filmService),
            instance(likedNotifier)
        )
    })

    test('Should receive from repository', () => {
        const rate: Rate = Rate.of('aTitle', 4, UserIdDummy.randomUserId())

        // Setup Expectations

        // Exercise
        const ratingFromRepo: Rate | undefined = rateService.findById(rate.id)

        // Verify State
    })

    test('Should return ratings made by a user', () => {
        const userId: UserId = UserId.of('aUser')
        const rateOneByUser: Rate = RateBuilder.randomRate()
            .withUserId(userId)
            .build()
        const rateTwoByUser: Rate = RateBuilder.randomRate()
            .withUserId(userId)
            .build()

        // Setup Expectations

        // Exercise
        const ratedByUser: Rate[] = rateService.findByUser(userId)

        // Verify State
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

        // Exercise
        const ratesByUserOfFilmsMadeAtYear2000OrMoreRecent: Rate[] =
            rateService.ratedByUserAtYearOrMoreRecent(userId, productionYear)

        // Verify State
    })

    test('When a film is rate more than 10 times by different users it should send a notification', () => {
        const title = 'aTitle'
        const rate: Rate = RateBuilder.randomRate().withTitle(title).build()
        const ratesForFilm: Rate[] = RateBuilder.randomListOfRatesOfSizeForFilm(
            RateService.RATES_PER_FILM_FOR_NOTIFICATION,
            title
        )

        // Setup Expectations

        // Exercise
        rateService.save(rate)

        // Verify expectations
    })
})
