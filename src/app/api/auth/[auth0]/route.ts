// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
const localhostUrl = process.env.NEXT_PUBLIC_LOCALHOST_URL;

export const GET = handleAuth({
    login: handleLogin({
        authorizationParams: {
            audience: `${localhostUrl}`
        },
        returnTo: "/movies"
    })
});

