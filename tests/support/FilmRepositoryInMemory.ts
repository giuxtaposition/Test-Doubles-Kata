import FilmRepository from '../../src/domain/film/FilmRepository'
import Film from '../../src/domain/film'

export default class FilmRepositoryInMemory implements FilmRepository {
    private database: Map<string, Film>

    constructor(database?: Map<string, Film>) {
        this.database = database || new Map<string, Film>()
    }

    public save(id: string, film: Film): void {
        this.database.set(id, film)
    }

    public findById(id: string): Film | undefined {
        return this.database.get(id)
    }
}
