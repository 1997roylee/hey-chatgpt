import { styled, Box, BoxProps } from '@mui/system'

interface ButtonProps extends BoxProps {
    children: React.ReactNode
}

const UnstyledButton = styled(Box)({
    background: '#1a73e8',
    border: 'none',
    borderRadius: '39px',
    padding: '12px 16px',
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
        boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.12), 0px 3.2px 7.2px rgba(0, 0, 0, 0.16)',
    },
})

export const Button = (props: ButtonProps): JSX.Element => {
    const { children, ...rest } = props

    return (
        <UnstyledButton component='button' {...rest}>
            {children}
        </UnstyledButton>
    )
}
