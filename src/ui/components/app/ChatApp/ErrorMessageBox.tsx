// import { Box, Button, Flex, Link, Text } from '@theme-ui/components'
// import { AppState, useAppStore } from 'stores'
// import { OpenAI } from '../OpenAI'

import { Box } from '@mui/system'
import { Button, Flex, Text } from '../../ui'
import Browser from 'webextension-polyfill'

export const ErrorMessageBox = (): JSX.Element => {
    const handleLogon = (): void => {
        void Browser.runtime.sendMessage({
            type: 'logon',
            payload: '',
        })
        window.open('https://chat.openai.com/chat')
    }

    return (
        <Box
            sx={{
                backgroundColor: '#fff',
            }}
            p={3}
        >
            <Flex>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <Text
                        sx={{
                            textAlign: 'left',
                        }}
                        mb={4}
                    >
                        Please login and pass Cloudflare check at chat.openai.com
                    </Text>
                    <Button
                        sx={{
                            fontWeight: 400,
                        }}
                        onClick={handleLogon}
                        // component='a'
                        // target='_blank'
                        // href={'https://chat.openai.com/auth/login'}
                    >
                        Logon OpenAI
                    </Button>
                </Box>
            </Flex>
        </Box>
    )
}
