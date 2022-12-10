import { Box, Flex, Text } from '@mantine/core'
import { OpenAi } from '../OpenAi'

interface Props {
    // avatar: string
    isMe?: boolean
    message: string
}

export const MessageBox = ({ isMe = false, message = '' }: Props): JSX.Element => {
    return (
        <Box bg={isMe ? '#eee' : '#fff'} p={12} w='100%'>
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
