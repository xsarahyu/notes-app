import signup from '../../../signup';
import login from '../../../login';
// PRIVATE API
export function useUsernameAndPassword({ onError, onSuccess, isLogin, }) {
    async function handleSubmit(data) {
        try {
            if (!isLogin) {
                await signup(data);
            }
            await login(data.username, data.password);
            onSuccess();
        }
        catch (err) {
            onError(err);
        }
    }
    return {
        handleSubmit,
    };
}
//# sourceMappingURL=useUsernameAndPassword.js.map