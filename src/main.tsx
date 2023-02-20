import { Box, ChakraBaseProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChatApp } from './components'
import { theme } from './theme'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraBaseProvider theme={theme}>
            <Box minW={360} minH={600}>
                <ChatApp />
            </Box>
        </ChakraBaseProvider>
    </React.StrictMode>,
)
