import { memo, useEffect, useRef } from 'react'
import Browser from 'webextension-polyfill'
import { useAppStore } from 'stores'
import { ChatAppHeader } from './ChatAppHeader'
import { MessageInput } from './MessageInput'
import { MessagePanel } from './MessagePanel'
import { Flex } from '../../ui'
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

    useEffect(() => {
        Browser.runtime.onMessage.addListener((message) => {
            setIsLoading(true)
            addMessage({
                text: message.text,
                id: message.id,
                sender: 'bot',
                parentMessageId: message.parentMessageId,
            })
            clearTimeout(timeoutHandler.current)
            timeoutHandler.current = setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        })
    }, [])

    return (
        <Flex flexDirection={'column'} height='100%'>
            <ChatAppHeader onClose={onClose} />
            <FancyMessagePanel />
            <MessageInput />
        </Flex>
    )
}
