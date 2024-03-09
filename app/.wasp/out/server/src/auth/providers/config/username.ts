
import { Router } from "express";

import login from "../username/login.js";
import { getSignupRoute } from "../username/signup.js";
import { ProviderConfig } from "wasp/auth/providers/types";

import { getUsernameAndPasswordUserFields } from '../../../../../../../src/server/auth/setUsername.js'
const _waspUserSignupFields = getUsernameAndPasswordUserFields

const config: ProviderConfig = {
    id: "username",
    displayName: "Username and password",
    createRouter() {
        const router = Router();

        router.post('/login', login);
        const signupRoute = getSignupRoute({
            userSignupFields: _waspUserSignupFields,
        });
        router.post('/signup', signupRoute);

        return router;
    },
}

export default config;
