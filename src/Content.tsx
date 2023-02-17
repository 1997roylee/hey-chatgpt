
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Chatbot } from './app'

const root = document.createElement('div')
root.id = 'crx-root'
document.body.append(root)

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <ChakraProvider>
            <Chatbot />
        </ChakraProvider>
    </React.StrictMode>,
)
