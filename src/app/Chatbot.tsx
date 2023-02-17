import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { Cursor } from '../components'
import '../index.css'

import loadable from '@loadable/component'

const ChatApp = loadable(async () => await import('../components').then(mod => mod.ChatApp))

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
                zIndex: 99999,
            }}
            color='#000'
        >
            <Cursor onClick={toggleOpen} />
            {isChatOpen ? <ChatApp onClose={toggleOpen} /> : null}
        </Box>
    )
}
