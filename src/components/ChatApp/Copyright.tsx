import { Box, Text } from '@chakra-ui/react'

export const Copyright = (): JSX.Element => {
    return (
        <Box sx={{ paddingTop: 1, paddingBottom: 1 }}>
            <Text
                fontSize={14}
                align='center'
                sx={{
                    textAlign: 'center',
                }}
            >
                Powered by{' '}
                <Text as='a' target='_blank' href='https://github.com/1997roylee'>
                    1997roylee
                </Text>
            </Text>
        </Box>
    )
}
