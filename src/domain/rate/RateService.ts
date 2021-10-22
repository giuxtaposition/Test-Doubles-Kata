import Rate from '.'
import Film from '../film'
import FilmService from '../film/FilmService'
import RateRepository from './RateRepository'
import LikedNotifier from './LikedNotifier'
import RateId from './RateId'
import UserId from '../user/UserId'

export default class RateService {
    static RATES_PER_FILM_FOR_NOTIFICATION = 10

    private _repository: RateRepository
    private _filmService: FilmService
    private _likedNotifier: LikedNotifier

    constructor(
        repository: RateRepository,
        filmService: FilmService,
        likedNotifier: LikedNotifier
    ) {
        this._repository = repository
        this._filmService = filmService
        this._likedNotifier = likedNotifier
    }

    public save(rate: Rate): void {
        this._repository.save(rate.id, rate)

        if (
            this._repository.ratesForFilm(rate.title).length ==
            RateService.RATES_PER_FILM_FOR_NOTIFICATION
        ) {
            this._likedNotifier.notifyForFilm(rate.title)
        }
    }

    public findById(id: RateId) {
        return this._repository.findById(id)
    }

    public findByUser(userId: UserId): Rate[] {
        return this._repository.all().filter(rate => rate.by(userId))
    }

    public ratedByUserAtYearOrMoreRecent(
        userId: UserId,
        productionYear: number
    ): Rate[] {
        return this.findByUser(userId).filter(rate => {
            const filmOptional: Film | undefined = this._filmService.findById(
                rate.title
            )
            return filmOptional && filmOptional?.releaseDate >= productionYear
        })
    }
}
