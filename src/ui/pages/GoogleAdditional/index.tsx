import { Box, Stack } from '@mui/system'
import { AdditionalResult } from 'ui/components/app'
import { useCallback, useEffect, useState } from 'react'
import Browser from 'webextension-polyfill'
import { Button, Divider } from 'ui/components'
import { AppState, IMessage, useAppStore } from 'stores/AppStore'
// import { useDebouncedCallback } from 'use-debounce';

export default function GoogleAdditional(): JSX.Element {
    const [message, setMessage] = useState<IMessage>()
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading')
    const [isLoading, setIsLoading] = useState(false)
    const { setIsOpen } = useAppStore(({ setIsOpen }: AppState) => ({
        setIsOpen,
    }))

    const handleResponse = useCallback((newMessage: IMessage): void => {
        setIsLoading(false)

        if (newMessage.id === 'Error') return setStatus('error')

        setMessage((message) => {
            if (newMessage.id === message?.id || message === undefined) return newMessage

            Browser.runtime.onMessage.removeListener(handleResponse)
            return message
        })
    }, [])

    useEffect(() => {
        console.log('init')
        if (isLoading) return

        const params = new URL(window?.location.href).searchParams
        const q = params.get('q')
        Browser.runtime.onMessage.addListener(handleResponse)
        setIsLoading(true)
        void Browser.runtime.sendMessage({
            type: 'chat',
            payload: q,
            parentMessageId: '',
        })

        return () => {
            Browser.runtime.onMessage.removeListener(handleResponse)
        }
    }, [])

    const handleLogon = (): void => {
        void Browser.runtime.sendMessage({
            type: 'logon',
            payload: '',
        })
        window.open('https://chat.openai.com/chat')
    }

    const handleChat = (): void => {
        setIsOpen(true)
    }

    return (
        <Box
            id='google-additional'
            mb={8}
            sx={{
                background: '#fff',
                borderRadius: '8px',
                border: '1px solid #ebebeb',
            }}
        >
            <AdditionalResult status={status} result={message?.text ?? ''} isLoading={isLoading} />
            <Divider />
            <Stack p={4} px={5} spacing={4} direction='row'>
                {status === 'error' && (
                    <Button variant='outline' flex='50%' onClick={handleLogon}>
                        Logon
                    </Button>
                )}

                <Button flex={'50%'} onClick={handleChat}>
                    Let&apos;s Chat
                </Button>
            </Stack>
        </Box>
    )
}
