// import { Box, Flex, Text } from '@chakra-ui/react'
// import { OpenAI } from '../OpenAI'

import { Box } from "@mui/system"
import { Flex } from "../../ui"

interface Props {
    isMe?: boolean
    message: string
}

export const MessageBox = ({ isMe = false, message = '' }: Props): JSX.Element => {
    return (
        <Box bg={isMe ? '#eee' : '#fff'} p={3} w='auto'>
            <Flex w='100%'>
                <Box w={'28px'} mr={1}>
                    {/* {!isMe ? <OpenAI w={6} /> : null} */}
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
