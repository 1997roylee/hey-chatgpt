import { styled, Box, BoxProps } from '@mui/system'

interface TextProps extends BoxProps {
    children: React.ReactNode
}

const UnstyledText = styled(Box)({
    padding: 0,
    margin: 0,
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
})

export const Text = (props: TextProps): JSX.Element => {
    const { children, ...rest } = props

    return (
        <UnstyledText component='p' {...rest}>
            {children}
        </UnstyledText>
    )
}
