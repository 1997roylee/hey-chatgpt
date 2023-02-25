import { Box } from '@mui/system'
import { AdditionalResult } from '../components/AdditionalResult'
import { useEffect, useState } from 'react'
import Browser from 'webextension-polyfill'
import { Button, Divider } from '../ui'

export default function GoogleResult(): JSX.Element {
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    Browser.runtime.onMessage.addListener((message) => {
        setIsLoading(false)
        if (message.id === 'Error') setMessage(message.text)
        else setMessage(message.text)
    })

    useEffect(() => {
        const params = new URL(window?.location.href).searchParams
        const q = params.get('q')
        setIsLoading(true)
        void Browser.runtime.sendMessage({
            type: 'popup',
        })
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
            <AdditionalResult result={message} isLoading={isLoading} />
            <Divider />
            <Box p={4} px={5}>
                <Button
                    sx={{
                        borderRadius: '50%',
                        width: '100%',
                    }}
                    background='#f1f3f4'
                >
                    Let&apos;s Chat
                </Button>
            </Box>
        </Box>
    )
}
