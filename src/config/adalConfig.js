import { AuthenticationContext, adalFetch, withAdalLogin, adalGetToken } from 'react-adal';

export const adalConfig = {
    tenant: '18d674ba-1802-4e0d-9350-9b3136e48a24',
    clientId: '5800f771-3a8f-48fd-91e1-da69605d97e5',
    endpoints: {
        api: 'https://localhost:8080' // <-- The Azure AD-protected API
    },
    cacheLocation: 'localStorage',
    postLogoutRedirectUri: window.location.origin,
};

export const authContext = new AuthenticationContext(adalConfig);

authContext.acquireTokenRedirect()

export const adalApiFetch = (fetch, url, options) =>
    adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);