
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
            sx={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                zIndex: 9999,
            }}
        >
            <Cursor onClick={toggleOpen} />
            {isChatOpen ? <ChatApp onClose={toggleOpen} /> : null}
        </Box>
    )
}
