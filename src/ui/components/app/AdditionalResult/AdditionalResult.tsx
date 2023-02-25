// import { Box, Flex, Text } from '@theme-ui/components'
import { IoCopyOutline } from 'react-icons/io5'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Flex, Text, Icon } from 'ui/components/ui'
import { Box } from '@mui/system'

interface Props {
    result: string
    isLoading: boolean
    status: 'loading' | 'error' | 'success'
}

const AdditionalResult = ({ result, status, isLoading }: Props): JSX.Element => {
    return (
        <Box p={4} px={5}>
            <Flex
                width='100%'
                alignItems={'center'}
                justifyContent={'space-between'}
                justifyItems={'space-between'}
                pb={4}
            >
                <Text
                    sx={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                    }}
                >
                    Hey ChatGPT
                </Text>

                <CopyToClipboard text={result}>
                    <Icon
                        as={IoCopyOutline}
                        size={24}
                        sx={{
                            cursor: 'pointer',
                        }}
                    />
                </CopyToClipboard>
            </Flex>
            {status === 'error' && (
                <Text>
                    Please login and pass Cloudflare check at chat.openai.com.
                    https://chat.openai.com/auth/login
                </Text>
            )}
            <Text>{isLoading && 'Loading...'}</Text>
            <Text>{result}</Text>
        </Box>
    )
}
export default AdditionalResult
