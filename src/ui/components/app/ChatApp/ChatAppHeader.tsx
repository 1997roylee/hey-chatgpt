// import { Box, CloseButton, Flex, Text } from '@chakra-ui/react'
import { Box } from '@mui/system'
// import { AppState, useAppStore } from 'stores'
import { CloseButton, Flex, Text } from 'ui/components/ui'
// import { OpenAI } from '../OpenAI'

interface Props {
    onClose?: () => void
}

export const ChatAppHeader = ({ onClose }: Props): JSX.Element => {
    return (
        <Box
            sx={{
                padding: 4,
                borderBottom: '1px solid #eee',
            }}
        >
            <Flex alignItems={'center'} width='100%'>
                <Box>
                    <Text textAlign='left'>Hey ChatGPT</Text>
                </Box>
                <Flex
                    sx={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}
                >
                    <CloseButton onClick={onClose} variant='light' />
                </Flex>
            </Flex>
        </Box>
    )
}
