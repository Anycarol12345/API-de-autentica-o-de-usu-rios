const User = require('src/Domain/User/User');
const IUserRepository = require('src/Domain/Repositories/IUserRepository');

class SequelizeUserRepository extends IUserRepository {
    constructor(db) {
        super();
        this.db = db;
    }

    async findByEmail(email) {
        const userRecord = await this.db.User.findOne({ where: { email } });
        if (!userRecord) return null;
        
        return new User(
            userRecord.name,
            userRecord.email,
            userRecord.password,
            userRecord.id
        );
    }

    async findById(id) {
        const userRecord = await this.db.User.findByPk(id);
        if (!userRecord) return null;
        
        return new User(
            userRecord.name,
            userRecord.email,
            userRecord.password,
            userRecord.id
        );
    }

    async save(user) {
        const userData = user.toObject();
        const [userRecord, created] = await this.db.User.findOrCreate({
            where: { id: userData.id },
            defaults: userData
        });
        
        if (!created) {
            await userRecord.update(userData);
        }
        
        return user;
    }
}

module.exports = SequelizeUserRepository;