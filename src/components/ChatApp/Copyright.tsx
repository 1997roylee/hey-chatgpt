import { Box, Text } from '@mantine/core'

export const Copyright = (): JSX.Element => {
    return (
        <Box sx={{ paddingTop: 4, paddingBottom: 4 }}>
            <Text
                size={14}
                align='center'
                sx={{
                    textAlign: 'center',
                }}
            >
                Powered by{' '}
                <Text component='a' target='_blank' href='https://github.com/1997roylee'>
                    1997roylee
                </Text>
            </Text>
        </Box>
    )
}
