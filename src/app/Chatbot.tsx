import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { ChatApp, Cursor } from '../components'

export const Chatbot = (): JSX.Element => {
    const [isChatOpen, setIsChatOpen] = useState(false)

    const toggleOpen = (): void => {
        setIsChatOpen(!isChatOpen)
    }
    return (
        <Box
            color='#000'
            sx={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                zIndex: 99999,
            }}
        >
            <Cursor onClick={toggleOpen} />
            {isChatOpen ? <ChatApp onClose={toggleOpen} /> : null}
        </Box>
    )
}
