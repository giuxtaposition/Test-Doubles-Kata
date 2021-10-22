import Film from '.'
import FilmRepository from './FilmRepository'

export default class FilmService {
    private _repository: FilmRepository

    constructor(repository: FilmRepository) {
        this._repository = repository
    }

    public findById(title: string) {
        return this._repository.findById(title) || undefined
    }

    public save(film: Film) {
        this._repository.save(film.title, film)
    }
}
