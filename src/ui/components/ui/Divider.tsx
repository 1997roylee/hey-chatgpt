import { Box } from '@mui/system'

interface Props {
    color?: string
}

export const Divider = ({ color = '#f5f5f5' }: Props): JSX.Element => (
    <Box height='1px' width='100%' bgcolor={color} />
)
