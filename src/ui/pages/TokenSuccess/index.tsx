import { Box, Stack } from '@mui/system'
import { useState } from 'react'
import { Button, CloseButton, Text } from 'ui/components'
import Browser from 'webextension-polyfill'

const TokenSuccess = (): JSX.Element => {
    const [isShown, setIsShown] = useState(true)

    const handleClose = (): void => {
        setIsShown(false)
    }

    const handleBack = (): void => {
        void Browser.runtime.sendMessage({
            type: 'redirect',
            payload: '',
        })
    }

    if (!isShown) return <Box />

    return (
        <Box position='fixed' right={0} top={0} zIndex={100}>
            <Box
                bgcolor={'#1a73e8'}
                borderRadius='8px'
                m={4}
                p={4}
                position='relative'
                overflow='hidden'
            >
                <Box position='absolute' right={0} top={0} onClick={handleClose}>
                    <CloseButton />
                </Box>
                <Stack spacing={4}>
                    <Text color='#fff'>Hey ChatGPT is ready!</Text>
                    <Text color='#fff' fontSize='.9rem'>
                        Keep this tab open to make ChatGPT more stable
                    </Text>
                    <Button variant='ghost' onClick={handleBack}>
                        Back to Search
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default TokenSuccess
