import { memo, useRef } from 'react'
import Browser from 'webextension-polyfill'
import { useAppStore } from 'stores'
import { Header } from './Header'
import { MessageInput } from './MessageInput'
import { MessagePanel } from './MessagePanel'
import { Flex } from '../../ui'
import { Box } from '@mui/system'

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
        <Flex flexDirection={'column'}>
            <Header onClose={onClose} />
            <FancyMessagePanel />
            <Box left={0} right={0} bottom={0} bgcolor='#fff' position='absolute'>
                <MessageInput />
            </Box>
        </Flex>
    )
}
