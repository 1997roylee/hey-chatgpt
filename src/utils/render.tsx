import ReactDOM from 'react-dom/client'
import { theme } from '../theme'
import React from 'react'
import { ThemeProvider } from '@mui/system'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

interface Config {
    shadowRoot?: boolean
    props?: any
}

export const render = (
    target: Element,
    Component: React.FunctionComponent,
    config: Config,
): void => {
    const { shadowRoot = false, props } = config

    const root = document.createElement('div')
    // console.log(root.firstChild)
    target.insertBefore(root, target.firstChild)

    if (shadowRoot) {
        const shadowRoot = root.attachShadow({ mode: 'open' })
        const subRoot = document.createElement('div')
        const cache = createCache({
            container: shadowRoot,
            key: 'hey-chatgpt',
        })

        shadowRoot.appendChild(subRoot)
        ReactDOM.createRoot(subRoot).render(
            // <React.StrictMode>
            <CacheProvider value={cache}>
                <ThemeProvider theme={theme}>
                    <Component {...props} />
                </ThemeProvider>
            </CacheProvider>,
        )
    }
}
