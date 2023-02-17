import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraBaseProvider } from '@chakra-ui/react'
import { Chatbot } from './app'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { theme } from './theme'

const root = document.createElement('div')
root.id = 'hey-chatgpt-app'
document.body.appendChild(root)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mount = () => {
    const shadowRoot = root.attachShadow({ mode: 'open' })
    const cache = createCache({
        container: shadowRoot,
        key: 'hey-chatgpt',
    })

    const rootElement = document.createElement('main')
    shadowRoot.appendChild(rootElement)

    const reactRoot = ReactDOM.createRoot(rootElement)
    reactRoot.render(
        <React.StrictMode>
            <CacheProvider value={cache}>
                <ChakraBaseProvider theme={theme}>
                    <Chatbot />
                </ChakraBaseProvider>
            </CacheProvider>
        </React.StrictMode>,
    )

    return (): void => {
        reactRoot.unmount()
    }
}

mount()
