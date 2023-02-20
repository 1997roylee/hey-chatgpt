import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraBaseProvider } from '@chakra-ui/react'
import Chatbot from './app/Chatbot'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { theme } from './theme'
import { isGoogleSearchPage } from './utils/google'
import Result from './app/Result'

const root = document.createElement('div')
root.id = 'hey-chatgpt'
// document.body.appendChild(root)
document.querySelector('#rcnt')?.appendChild(root)
    ; (function () {
        const shadowRoot = root.attachShadow({ mode: 'open' })
        root.setAttribute('style', 'flex: 1;')
        const cache = createCache({
            container: shadowRoot,
            key: 'hey-chatgpt',
        })

        const rootElement = document.createElement('main')
        shadowRoot.appendChild(rootElement)

        ReactDOM.createRoot(rootElement).render(
            <React.StrictMode>
                <CacheProvider value={cache}>
                    <ChakraBaseProvider theme={theme}>
                        {/* <Chatbot /> */}
                        <Result />
                    </ChakraBaseProvider>
                </CacheProvider>
            </React.StrictMode>,
        )
    })()


// if (isGoogleSearchPage() === true) {
//     const googleRoot = document.querySelector('#rcnt')
//     console.log(googleRoot)
//     googleRoot.
// }