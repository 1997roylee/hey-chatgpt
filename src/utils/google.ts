export const isGoogleSearchPage = (): Boolean => {
    return window.location.hostname === 'www.google.com' && window.location.pathname === '/search'
}