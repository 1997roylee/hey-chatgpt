import { Box, Stack, ThemeProvider } from '@mui/system'
import { Button, Text } from 'ui/components'
import { theme } from '../../../theme'

export default function Store(): JSX.Element {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minWidth: 320,
                    padding: 4,
                }}
            >
                <Stack spacing={4}>
                    <Text fontSize='1.25rem'>Hey Chatgpt</Text>
                    <Box
                        component='a'
                        href='https://forms.gle/wS6usX5r4mbJJHcS9'
                        target='_blank'
                        width='100%'
                    >
                        <Button width='100%'>Report a bug</Button>
                    </Box>
                    <Box
                        component='a'
                        href='https://github.com/1997roylee/hey-chatgpt'
                        target='_blank'
                        width='100%'
                    >
                        <Button width='100%'>Github</Button>
                    </Box>
                    <Box>Email: heychatgptapp@gmail.com</Box>
                </Stack>
            </Box>
        </ThemeProvider>
    )
}
