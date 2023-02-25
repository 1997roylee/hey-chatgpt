import { Box, Stack } from '@mui/system'
import { AdditionalResult } from 'ui/components/app'
import { useEffect, useState } from 'react'
import Browser from 'webextension-polyfill'
import { Button, Divider } from 'ui/components'

export default function GoogleResult(): JSX.Element {
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading')
    const [isLoading, setIsLoading] = useState(true)

    Browser.runtime.onMessage.addListener((message) => {
        setIsLoading(false)
        console.log(message)
        if (message.id === 'Error') setStatus('error')
        else setMessage(message.text)
    })

    useEffect(() => {
        const params = new URL(window?.location.href).searchParams
        const q = params.get('q')
        setIsLoading(true)
        void Browser.runtime.sendMessage({
            type: 'chat',
            payload: q,
        })
    }, [])

    return (
        <Box
            mb={8}
            sx={{
                background: '#fff',
                borderRadius: '8px',
                border: '1px solid #ebebeb',
            }}
        >
            <AdditionalResult status={status} result={message} isLoading={isLoading} />
            <Divider />
            <Stack p={4} px={5} spacing={4} direction='row'>
                {status === 'error' && (
                    <Box
                        component='a'
                        href='https://chat.openai.com/auth/login'
                        target='_blank'
                        flex={'50%'}
                    >
                        {' '}
                        <Button variant='outline' width='100%'>
                            Login
                        </Button>
                    </Box>
                )}
                <Button flex={'50%'}>Let&apos;s Chat</Button>
            </Stack>
        </Box>
    )
}
