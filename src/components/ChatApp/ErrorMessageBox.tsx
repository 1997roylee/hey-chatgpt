import { Box, Button, Flex, Text } from '@chakra-ui/react'
// import { AppState, useAppStore } from '../../stores'
import { OpenAI } from '../OpenAI'

export const ErrorMessageBox = (): JSX.Element => {
    // const { setIsReverseProxyMode, isReverseProxyMode } = useAppStore((state: AppState) => ({
    //     setIsReverseProxyMode: state.setIsReverseProxyMode,
    //     isReverseProxyMode: state.isReverseProxyMode,
    // }))

    // const handleClick = (): void => {
    //     setIsReverseProxyMode(!isReverseProxyMode)
    // }

    return (
        <Box bg={'#fff'} p={3} w='auto'>
            <Flex w='100%'>
                <Box width='28px' mr={1}>
                    <OpenAI w={6} />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <Text align='left' mb={1}>
                        {/* Before you use this extension, you need to log in to OpenAI&apos;s website.{' '} */}
                        <Text as='a' target='_blank' href={'https://chat.openai.com/auth/login'}>
                            Please login and pass Cloudflare check at chat.openai.com
                        </Text>
                    </Text>
                    <Button
                        fontWeight={400}
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
