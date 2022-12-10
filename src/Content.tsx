import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Chatbot } from './app'
// import './index.css'
import { theme } from './theme'

const root = document.createElement('div')
root.id = 'crx-root'
document.body.append(root)

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles theme={theme}>
            <Chatbot />
        </MantineProvider>
    </React.StrictMode>,
)
