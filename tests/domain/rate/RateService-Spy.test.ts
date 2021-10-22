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

describe('Rate Service Test using Spies', () => {
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

    test('Should save in repository', () => {
        const rate: Rate = Rate.of('aTitle', 4, UserIdDummy.randomUserId())

        // Exercise
        rateService.save(rate)

        // Verify expectations
    })

    test('When a film is rate more than 10 times by different users it should send a notification', () => {
        const title = 'aTitle'
        const ratesForFilm: Rate[] = RateBuilder.randomListOfRatesOfSizeForFilm(
            RateService.RATES_PER_FILM_FOR_NOTIFICATION,
            title
        )

        // Setup

        // Exercise
        rateService.save(RateBuilder.randomRate().withTitle(title).build())

        // Verify it has been called
    })
})
