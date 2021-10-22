import RateRepository from '../../src/domain/rate/RateRepository'
import RateId from '../../src/domain/rate/RateId'
import Rate from '../../src/domain/rate'

export default class RateRepositoryInMemory implements RateRepository {
    private db: Map<RateId, Rate> = new Map<RateId, Rate>()

    public save(id: RateId, rate: Rate): void {
        this.db.set(id, rate)
    }

    public findById(id: RateId) {
        return this.db.get(id)
    }

    public all(): Rate[] {
        return [...this.db.values()]
    }

    public ratesForFilm(title: string): Rate[] {
        return this.all().filter(rate => rate.title === title)
    }
}
