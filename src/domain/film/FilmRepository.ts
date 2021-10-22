import Film from '.'
import Repository from '../../support/Repository'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface FilmRepository extends Repository<Film, string> {}
