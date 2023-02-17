import { Box, CloseButton, Flex, Text } from '@chakra-ui/react'
import { AppState, useAppStore } from '../../stores'
import { OpenAI } from '../OpenAI'

interface Props {
    onClose?: () => void
}

export const Header = ({ onClose }: Props): JSX.Element => {
    const { isLoading } = useAppStore((state: AppState) => ({
        isLoading: state.isLoading,
    }))

    return (
        <Box
            sx={{
                padding: 4,
                borderBottom: '1px solid #eee',
            }}
        >
            <Flex align={'center'}>
                <Box w={8} h={8} mr={4}>
                    <OpenAI w={8} h={8} />
                    {/* <Image w={32} h={32} src={Openai} alt='Openai' /> */}
                </Box>
                <Box>
                    <Text align='left'>ChatGPT - OpenAI</Text>
                    <Text align='left'>{isLoading ? 'Loading...' : 'Online'}</Text>
                </Box>
                <Flex
                    sx={{
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}
                >
                    <CloseButton onClick={onClose} title='Close popover' size='xl' />
                </Flex>
            </Flex>
        </Box>
    )
}
