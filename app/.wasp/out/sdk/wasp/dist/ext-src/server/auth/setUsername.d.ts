export declare const getUsernameAndPasswordUserFields: import("wasp/auth/providers/types").UserSignupFields;
export declare const getEmailUserFields: import("wasp/auth/providers/types").UserSignupFields;
export declare const getGitHubUserFields: import("wasp/auth/providers/types").UserSignupFields;
export declare function getGitHubAuthConfig(): {
    clientID: string;
    clientSecret: string;
    scope: string[];
};
export declare const getGoogleUserFields: import("wasp/auth/providers/types").UserSignupFields;
export declare function getGoogleAuthConfig(): {
    clientID: string;
    clientSecret: string;
    scope: string[];
};
