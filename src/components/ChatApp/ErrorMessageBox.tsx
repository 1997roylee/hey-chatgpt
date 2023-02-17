import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { AppState, useAppStore } from '../../stores'
import { OpenAi } from '../OpenAI'

export const ErrorMessageBox = (): JSX.Element => {
    const { setIsReverseProxyMode, isReverseProxyMode } = useAppStore((state: AppState) => ({
        setIsReverseProxyMode: state.setIsReverseProxyMode,
        isReverseProxyMode: state.isReverseProxyMode,
    }))

    const handleClick = (): void => {
        setIsReverseProxyMode(!isReverseProxyMode)
    }

    return (
        <Box bg={'#fff'} p={12} w='auto'>
            <Flex w='100%'>
                <Box
                    sx={{
                        width: 24,
                    }}
                    mr={12}
                >
                    <OpenAi w={24} />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <Text align='left'>
                        Before you use this extension, you need to log in to OpenAI&apos;s website.{' '}
                        <Text
                            as='a'
                            target='_blank'
                            href={'https://chat.openai.com/auth/login'}
                        >
                            https://chat.openai.com/auth/login
                        </Text>
                    </Text>
                    <Text mb={'8px'}>
                        Or you can enable reverse proxy mode to use this extension without logging
                        in to OpenAI&apos;s website.
                    </Text>
                    <Button onClick={handleClick} color={isReverseProxyMode ? 'green' : 'blue'}>
                        {isReverseProxyMode
                            ? 'Disable reverse proxy mode'
                            : 'Enable reverse proxy mode'}
                    </Button>
                </Box>
            </Flex>
        </Box>
    )
}
