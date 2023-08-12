import { db } from '../utils/db.js'

class Authenticator {
    constructor() {
        this.currentUser = null
    }
    async sendAuthEmail(answered) {
        return await db.post('/user/sendemail/', answered)
    }
    async verifyAuthSession(hashedToken) {
        return await db.get(`/user/verify/${hashedToken}`)
    }
    async getAccessToken(req) {
        return await db.post('/user/getaccess', req, true)
    }
    async validateSession(hashedAccessToken) {
        return await db.post('/user/validatesession', hashedAccessToken, true)
    }
    async authenticateLoginCredentials(credentials) {
        return await db.post('/user/login', credentials)
    }
    async removeSession(hashedAccessToken) {
        return await db.post('/user/removesession', hashedAccessToken, true)
    }
}
const authenticator = new Authenticator()

export { authenticator, Authenticator }
