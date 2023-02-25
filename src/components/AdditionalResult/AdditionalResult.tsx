// import { Box, Flex, Text } from '@theme-ui/components'
// import { IoCopyOutline } from 'react-icons/io5'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Flex, Text } from '../../ui'
import { Box } from '@mui/system'

interface Props {
    result: string
    isLoading: boolean
}

const AdditionalResult = ({ result, isLoading }: Props): JSX.Element => {
    return (
        <Box p={4} px={5}>
            <Flex
                sx={{
                    justifyContent: 'space-between',
                    align: 'center',
                }}
                pb={4}
            >
                <Text
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    Hey ChatGPT
                </Text>

                {/* <CopyToClipboard text={result}>
                    <Icon as={IoCopyOutline} size={6} cursor='pointer' />
                </CopyToClipboard> */}
            </Flex>
            <Text>{isLoading && 'Loading...'}</Text>
            <Text>{result}</Text>
        </Box>
    )
}
export default AdditionalResult
