import { Box, BoxProps } from '@mui/system'

export interface IconProps extends BoxProps {
    as: React.ElementType
    size?: number
}

export const Icon = ({ as, size, ...rest }: IconProps): JSX.Element => {
    return <Box width={size} component={as} height={size} {...rest}></Box>
}
