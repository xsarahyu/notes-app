import { api, handleApiError } from 'wasp/client/api';
import { initSession } from './helpers/user';
export default async function login(username, password) {
    try {
        const args = { username, password };
        const response = await api.post('/auth/username/login', args);
        await initSession(response.data.sessionId);
    }
    catch (error) {
        handleApiError(error);
    }
}
//# sourceMappingURL=login.js.map