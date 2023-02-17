import { Box, Flex, Text } from '@chakra-ui/react'
import { OpenAi } from '../OpenAI'

interface Props {
    isMe?: boolean
    message: string
}

export const MessageBox = ({ isMe = false, message = '' }: Props): JSX.Element => {
    return (
        <Box bg={isMe ? '#eee' : '#fff'} p={12} w='auto'>
            <Flex w='100%'>
                <Box
                    sx={{
                        width: 24,
                    }}
                    mr={12}
                >
                    {!isMe ? <OpenAi w={24} /> : null}
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <Text align='left'>{message}</Text>
                </Box>
            </Flex>
        </Box>
    )
}
