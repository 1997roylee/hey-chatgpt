import { Box } from '@mui/system'
import { Flex, Text } from 'ui/components/ui'

interface Props {
    isMe?: boolean
    children: React.ReactNode
}

export const MessageBox = ({ isMe = false, children }: Props): JSX.Element => {
    return (
        <Flex justifyContent={isMe ? 'flex-end' : 'flex-start'}>
            <Box
                bgcolor={isMe ? '#1a73e8' : 'rgb(243, 246, 249)'}
                p={3}
                width='auto'
                borderRadius={isMe ? '12px 12px 4px 12px' : '12px 12px 12px 4px'}
            >
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <Text
                        textAlign='left'
                        color={isMe ? '#fff' : '#000'}
                        sx={{
                            overflowWrap: 'anywhere',
                        }}
                    >
                        {children}
                    </Text>
                </Box>
            </Box>
        </Flex>
    )
}
