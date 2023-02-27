import { Box } from '@mui/system'
import Logo from '../../../../assets/openai.svg'
import Browser from 'webextension-polyfill'

interface Props {
    size?: number
}

export const ChatAppCursor = ({ size = 64 }: Props): JSX.Element => {
    return (
        <Box
            sx={{
                zIndex: 9999,
                position: 'relative',
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #00000010',
                transition: 'box-shadow 0.2s ease-in-out',
                '&:hover': {
                    '--shadow-1': 'rgba(0, 0, 0, 0.1)',
                    '--shadow-2': 'rgba(0, 0, 0, 0.2)',
                    boxShadow: '0 2px 4px var(--shadow-1),0 12px 28px var(--shadow-2)',
                },
                cursor: 'pointer',
            }}
        >
            <Box width={size * 0.5625} component='img' src={Browser.runtime.getURL(Logo)} />
        </Box>
    )
}
