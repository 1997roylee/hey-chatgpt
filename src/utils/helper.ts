export const isGoogleSearchPage = (): Boolean => {
    const url = new URL(window.location.href)
    return url.hostname === 'www.google.com' && url.pathname === '/search'
}

export const isChatGPTPage = (): Boolean => {
    const url = new URL(window.location.href)
    return url.hostname === 'chat.openai.com'
}
