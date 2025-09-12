const RegisterUserInput = require('src/Application/DTOs/RegisterUserInput');
const LoginUserInput = require('src/Application/DTOs/LoginUserInput');

class AuthController {
    constructor(registerUserUseCase, loginUserUseCase){
        this.registerUserUseCase = registerUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
    }

    async register(req, res, nect){
        try {
            const { name, email, password } = req.body;
            const input = new RegisterUserInput(name, email, password);
            const userOutput = await this.registerUserUseCase.execute(input);
            return res.status(201).json(userOutput);
        } catch (error){
            next(error);
        }
    }

    async login(req, res, next){
        try {
            const { email, password } = req.body;
            const input = new LoginUserInput(email, password);
            const authOutput = await this.loginUserUseCase.execute(input);
            return res.status(200).json(authOutput);
        } catch (error){
            next(error);
        }
    }

    async logout(req, res, next){
        try {
            const token = req.headrs.authorization.split('')[1];
            await this.logoutUserUseCase.execute(token);
            return res.status(200).json({ massage: 'Logged out successfully.' });
        } catch (error){
            next(error);
        }
    }
}

module.exports = AuthController;