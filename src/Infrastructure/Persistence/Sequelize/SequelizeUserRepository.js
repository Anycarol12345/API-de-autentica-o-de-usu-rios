class SequelizeUserRepository {
    constructor(db) {
        this.db = db;
    }

    async findByEmail(email) {
        return this.db.User.findOne({ where: { email } });
    }

    async create(userData) {
        return this.db.User.create(userData);
    }
}

module.exports = SequelizeUserRepository;