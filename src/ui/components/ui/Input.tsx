import * as React from 'react'
import InputUnstyled, { inputUnstyledClasses } from '@mui/base/InputUnstyled'
import { styled } from '@mui/system'

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
}

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
}
const StyledInputRoot = styled('div')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    border-radius: 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    display: flex;
    align-items: center;
    justify-content: center;
  
  
    &.${inputUnstyledClasses.focused} {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
)

const StyledInputElement = styled('input')(
    ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.5;
    flex-grow: 1;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: inherit;
    border: none;
    border-radius: inherit;
    padding: 12px 12px;
    outline: 0;
  `,
)

const InputAdornment = styled('div')`
    margin: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    rightIcon?: React.ReactNode
}

export const Input = React.forwardRef(function CustomInput(
    props: InputProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    const { rightIcon } = props
    return (
        <InputUnstyled
            endAdornment={<InputAdornment>{rightIcon}</InputAdornment>}
            slots={{ root: StyledInputRoot, input: StyledInputElement }}
            {...props}
            ref={ref}
        />
    )
})
