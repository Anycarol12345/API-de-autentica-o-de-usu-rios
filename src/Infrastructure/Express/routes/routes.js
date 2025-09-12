const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const validate = require('src/Infrastructure/Express/middlewares/validationMiddleware');
const { registerSchema, loginSchema} = require('src/Infrastructure/Express/validationSchemas/authSchemas');
const authenticateToken = require('src/Infrastructure/Express/middlewares/AuthMiddleware');

module.exports = (registerUserCase, loginUserUseCase) => {
    const router = Router();
    const authController = new AuthController(registerUserCase, loginUserUseCase);

    router.post('/register', validate(registerSchema), authController.register.bind(authController));
    router.post('/login', validate(loginSchema), authController.login.bind(authController));
    router.post('/logout', authenticateToken, authController.logout.bind(authController));


    return router;
}