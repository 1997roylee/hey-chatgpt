import { Box, keyframes, styled } from '@mui/system'

const Loading = keyframes`
to {
    opacity: 0.1;
    // transform: translateY(-16px);
  }
`

const Dots = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
})

const Dot = styled(Box)({
    width: '8px',
    height: '8px',
    margin: '3px 3px',
    borderRadius: '50%',
    backgroundColor: '#a3a1a1',
    opacity: 1,
    animation: `${Loading} 0.6s infinite alternate`,
})

export const DotsLoading = (): JSX.Element => {
    return (
        <Dots>
            <Dot />
            <Dot
                sx={{
                    animationDelay: '0.2s',
                }}
            />
            <Dot
                sx={{
                    animationDelay: '0.4s',
                }}
            />
        </Dots>
    )
}
