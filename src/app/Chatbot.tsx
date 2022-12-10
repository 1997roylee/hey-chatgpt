import { useState } from 'react'
import { ChatApp, Cursor } from '../components'

export const Chatbot = (): JSX.Element => {
    const [isChatOpen, setIsChatOpen] = useState(false)

    const toggleOpen = (): void => {
        setIsChatOpen(!isChatOpen)
    }
    return (
        <>
            <Cursor onClick={toggleOpen} />
            {isChatOpen ? <ChatApp onClose={toggleOpen} /> : null}
        </>
    )
}
