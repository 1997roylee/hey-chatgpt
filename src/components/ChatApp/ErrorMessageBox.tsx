// import { Box, Button, Flex, Link, Text } from '@theme-ui/components'
// import { AppState, useAppStore } from '../../stores'
// import { OpenAI } from '../OpenAI'

import { Box } from "@mui/system"
import { Button, Flex, Text } from "../../ui"

export const ErrorMessageBox = (): JSX.Element => {
    // const { setIsReverseProxyMode, isReverseProxyMode } = useAppStore((state: AppState) => ({
    //     setIsReverseProxyMode: state.setIsReverseProxyMode,
    //     isReverseProxyMode: state.isReverseProxyMode,
    // }))

    // const handleClick = (): void => {
    //     setIsReverseProxyMode(!isReverseProxyMode)
    // }

    return (
        <Box sx={{
            backgroundColor: '#fff'
        }} p={3}>
            <Flex>
                <Box sx={{
                    width: 28
                }} mr={1}>
                    {/* <OpenAI w={6} /> */}
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <Text sx={{
                        textAlign: 'left'
                    }} mb={1}>
                        {/* Before you use this extension, you need to log in to OpenAI&apos;s website.{' '} */}
                        <Box component='a' target='_blank' href={'https://chat.openai.com/auth/login'}>
                            Please login and pass Cloudflare check at chat.openai.com
                        </Box>
                    </Text>
                    <Button
                        sx={{
                            fontWeight: 400
                        }}
                        as='a'
                        target='_blank'
                        href={'https://chat.openai.com/auth/login'}
                    >
                        Login to OpenAI
                    </Button>
                </Box>
            </Flex>
        </Box>
    )
}
