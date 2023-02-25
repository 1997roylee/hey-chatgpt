// import { Box, Flex, Text } from '@chakra-ui/react'
// import { OpenAI } from '../OpenAI'

import { Box } from '@mui/system'
import { Flex, Text } from 'ui/components/ui'

interface Props {
    isMe?: boolean
    message: string
}

export const MessageBox = ({ isMe = false, message = '' }: Props): JSX.Element => {
    return (
        <Box bgcolor={isMe ? '#eee' : '#fff'} p={3} width='auto'>
            <Flex width='100%'>
                <Box width={'28px'} mr={1}>
                    {/* {!isMe ? <OpenAI w={6} /> : null} */}
                </Box>
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <Text textAlign='left'>{message}</Text>
                </Box>
            </Flex>
        </Box>
    )
}
