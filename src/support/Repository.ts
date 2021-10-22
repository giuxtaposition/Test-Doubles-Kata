export default interface Repository<ENTITY, ID> {
    save(id: ID, entity: ENTITY): void

    findById(id: ID): ENTITY | undefined
}
