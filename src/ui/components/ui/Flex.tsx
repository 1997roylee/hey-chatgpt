import { Box, BoxProps } from '@mui/system'

interface FlexProps extends BoxProps {
    children: React.ReactNode
}

export const Flex = ({ children, ...rest }: FlexProps): JSX.Element => (
    <Box
        sx={{
            display: 'flex',
        }}
        {...rest}
    >
        {children}
    </Box>
)
