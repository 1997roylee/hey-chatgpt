import { Box } from '@mui/system'
import { MdClose } from 'react-icons/md'

interface CloseButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number
    variant?: 'light' | 'dark'
    onClick?: () => void
}

export const CloseButton = ({
    size = 24,
    variant = 'dark',
    onClick,
}: CloseButtonProps): JSX.Element => (
    <Box
        width={size + 4}
        height={size + 4}
        onClick={onClick}
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: variant === 'dark' ? '#00000010' : '#fff',
            cursor: 'pointer',
            padding: 1,
            '&:hover': {
                backgroundColor: variant === 'dark' ? '#00000020' : '#00000010',
            },
        }}
    >
        <MdClose color={variant === 'dark' ? '#fff' : '#000'} width={size} height={size} />
    </Box>
)
