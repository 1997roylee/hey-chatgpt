import { Box } from '@mui/system'
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
            <Box p={4} px={5}>
                <Button>Let&apos;s Chat</Button>
            </Box>
        </Box>
    )
}
