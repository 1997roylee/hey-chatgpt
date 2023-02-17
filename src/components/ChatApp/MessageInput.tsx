import { Input, Icon, Flex, IconButton } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import Browser from 'webextension-polyfill'
import { MdSend } from 'react-icons/md'
import { AppState, useAppStore } from '../../stores'

export const MessageInput = (): JSX.Element => {
    const [value, setValue] = useState<string>('')
    const { addMessage, setIsLoading, isReverseProxyMode, lastConversationId } = useAppStore(
        ({ lastConversationId, addMessage, setIsLoading, isReverseProxyMode }: AppState) => ({
            lastConversationId,
            addMessage,
            setIsLoading,
            isReverseProxyMode,
        }),
    )
    const handleChange = useCallback((event: any) => {
        setValue(event.target.value)
    }, [])

    const handleSubmit = (): void => {
        if (value.length === 0) return

        addMessage({
            id: Date.now().toString(),
            text: value,
            sender: 'me',
            index: 0,
        })
        setIsLoading(true)
        setValue('')
        void Browser.runtime.sendMessage({
            type: 'chat',
            payload: value,
            parentMessageId: lastConversationId,
            proxy: isReverseProxyMode,
        })
    }

    const handleKeyDown = (event: any): void => {
        if (event.key === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <Flex px={4} py={2} alignItems='center'>
            <Input
                placeholder='Your message'
                value={value}
                // size='lg'
                flex={1}
                border='1px solid #eee'
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus
            />
            <IconButton
                onClick={handleSubmit}
                ml={1}
                aria-label='Send'
                icon={<Icon as={MdSend} color='#000' size={8} />}
            />
        </Flex>
    )
}
