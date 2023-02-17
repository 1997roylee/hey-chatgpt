import { Box, Input } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import Browser from 'webextension-polyfill'
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

    const handleKeyDown = (event: any): void => {
        if (event.key === 'Enter') {
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
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                top: -24,
                left: 8,
                right: 8,
                '--shadow-1': 'rgba(0, 0, 0, 0.1)',
                '--shadow-2': 'rgba(0, 0, 0, 0.2)',
                boxShadow: '0 2px 4px var(--shadow-1),0 12px 28px var(--shadow-2)',
            }}
        >
            <Input
                placeholder='Your message'
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus
            />
        </Box>
    )
}
