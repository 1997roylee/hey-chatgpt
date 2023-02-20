import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { ChatApp, Cursor } from '../components'

const Chatbot = (): JSX.Element => {
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
            {isChatOpen ? <Box sx={{
                maxWidth: 'calc(100% - 40px)',
                maxHeight: 'calc(100% - 40px)',
                width: 370,
                height: 660,
                position: 'fixed',
                zIndex: 99999,
                bottom: 0,
                right: 6,
                background: '#fff',
                // position: 'relative',
                borderRadius: '24px 24px 0px 0px',
                '--shadow-1': 'rgba(0, 0, 0, 0.1)',
                '--shadow-2': 'rgba(0, 0, 0, 0.2)',
                boxShadow: '0 2px 4px var(--shadow-1),0 12px 28px var(--shadow-2)',
            }}>
                <ChatApp onClose={toggleOpen} />
            </Box> : null}
        </Box>
    )
}

export default Chatbot;