import { Box } from '@mui/system'
// import Logo from '../../../../assets/openai.svg'
// import Browser from 'webextension-polyfill'
import { ChatAppCursor } from './ChatAppCursor'

interface Props {
    onClick?: () => void
}

export const ChatAppTrigger = ({ onClick }: Props): JSX.Element => {
    return (
        <Box
            sx={{
                zIndex: 9999,
                position: 'relative',
                transition: 'tranform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1) translate(-32px, 0px)',
                },
            }}
            onClick={onClick}
        >
            <ChatAppCursor />
        </Box>
    )
}
