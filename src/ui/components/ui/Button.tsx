import { styled, Box, BoxProps } from '@mui/system'

interface ButtonProps extends BoxProps {
    children: React.ReactNode
    variant?: 'default' | 'outline' | 'ghost'
}

const UnstyledButton = styled(Box)({
    background: '#1a73e8',
    border: 'none',
    borderRadius: '39px',
    padding: '12px 16px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.2s ease-in-out',
    '&:hover': {
        boxShadow: '0px 0.6px 1.8px rgba(0, 0, 0, 0.12), 0px 3.2px 7.2px rgba(0, 0, 0, 0.16)',
    },
})

const OutlineButton = styled(UnstyledButton)({
    background: 'transparent',
    border: '1px solid #1a73e8',
    color: '#1a73e8',
    '&:hover': {
        background: '#1a73e810',
        boxShadow: 'none',
        // color: '#fff',
    },
})

const GhostButton = styled(UnstyledButton)({
    background: '#fff',
    border: '1px solid #fff',
    color: '#1a73e8',
    '&:hover': {
        background: '#1a73e810',
        boxShadow: 'none',
        color: '#fff',
        // color: '#fff',
    },
})

const VARIANTS = {
    default: UnstyledButton,
    outline: OutlineButton,
    ghost: GhostButton,
}

export const Button = (props: ButtonProps): JSX.Element => {
    const { children, ...rest } = props

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const Component = VARIANTS[props.variant ?? 'default']
    return (
        <Component component='button' {...rest}>
            {children}
        </Component>
    )
}
