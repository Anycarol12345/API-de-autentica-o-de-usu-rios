class LogoutUser {
    constructor(tokenBlacklistRepository, jwtProvider) {
        this.tokenBlacklistRepository = tokenBlacklistRepository;
        this.jwtProvider = jwtProvider;
    }

    async execute(token) {
        if (!token) {
            throw new Error('Token is required for logout');
        }

        const decoded = this.jwtProvider.verifyToken(token);
        if (!decoded) {
            throw new Error('Invalid token');
        }

        // Adicionar token à blacklist com TTL baseado na expiração
        await this.tokenBlacklistRepository.add(token, decoded.exp);

        return { message: 'Logged out successfully' };
    }
}

module.exports = LogoutUser;