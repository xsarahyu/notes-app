var _a;
import { defineUserSignupFields } from 'wasp/auth/providers/types';
export const getUsernameAndPasswordUserFields = defineUserSignupFields({
    username: (data) => data.username,
});
const adminEmails = ((_a = process.env.ADMIN_EMAILS) === null || _a === void 0 ? void 0 : _a.split(',')) || [];
export const getEmailUserFields = defineUserSignupFields({
    username: (data) => data.email,
    isAdmin: (data) => adminEmails.includes(data.email),
});
export const getGitHubUserFields = defineUserSignupFields({
    // NOTE: if we don't want to access users' emails, we can use scope ["user:read"]
    // instead of ["user"] and access args.profile.username instead
    email: (data) => data.profile.emails[0].value,
    username: (data) => data.profile.username,
    isAdmin: (data) => adminEmails.includes(data.profile.emails[0].value),
});
export function getGitHubAuthConfig() {
    return {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        scope: ['user'],
    };
}
export const getGoogleUserFields = defineUserSignupFields({
    email: (data) => data.profile.emails[0].value,
    username: (data) => data.profile.displayName,
    isAdmin: (data) => adminEmails.includes(data.profile.emails[0].value),
});
export function getGoogleAuthConfig() {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    return {
        clientID,
        clientSecret,
        scope: ['profile', 'email'], // must include at least 'profile' for Google
    };
}
//# sourceMappingURL=setUsername.js.map