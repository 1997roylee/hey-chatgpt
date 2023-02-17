import { Box, Flex } from '@chakra-ui/react'
import { memo, useRef } from 'react'
import Browser from 'webextension-polyfill'
import { useAppStore } from '../../stores'
import { Copyright } from './Copyright'
import { Header } from './Header'
import { MessageInput } from './MessageInput'
import { MessagePanel } from './MessagePanel'

interface Props {
    onClose?: () => void
}

const FancyMessagePanel = memo(MessagePanel)

export const ChatApp = ({ onClose }: Props): JSX.Element => {
    const timeoutHandler = useRef<any>(null)
    const { addMessage, setIsLoading } = useAppStore((state: any) => ({
        addMessage: state.addMessage,
        setIsLoading: state.setIsLoading,
    }))

    Browser.runtime.onMessage.addListener((message) => {
        setIsLoading(true)
        addMessage({
            text: message.text,
            id: message.id,
            sender: 'bot',
        })
        clearTimeout(timeoutHandler.current)
        timeoutHandler.current = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    })

    return (
        <Flex
            sx={{
                maxWidth: 'calc(100% - 40px)',
                maxHeight: 'calc(100% - 40px)',
                width: 370,
                height: 660,
                position: 'fixed',
                bottom: 0,
                right: 24,
                background: '#fff',
                borderRadius: '24px 24px 0px 0px',
                '--shadow-1': 'rgba(0, 0, 0, 0.1)',
                '--shadow-2': 'rgba(0, 0, 0, 0.2)',
                flexDirection: 'column',
                boxShadow: '0 2px 4px var(--shadow-1),0 12px 28px var(--shadow-2)',
            }}
        >
            <Header onClose={onClose} />
            <FancyMessagePanel />
            <Box sx={{ position: 'relative', paddingTop: 16, borderTop: '1px solid #eee' }}>
                <MessageInput />
                <Copyright />
            </Box>
        </Flex>
    )
}
