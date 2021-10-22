import Repository from '../../support/Repository'
import Rate from '.'
import RateId from './RateId'

export default interface RateRepository extends Repository<Rate, RateId> {
    all(): Rate[]

    ratesForFilm(title: string): Rate[]
}
