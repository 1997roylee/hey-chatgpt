import { Box, BoxProps } from "@mui/system";

interface FlexProps extends BoxProps{
    children: React.ReactNode;
}

export const Flex = ({ children }: FlexProps): JSX.Element => <Box sx={{
    display: 'flex',
}} >
    {children}
</Box>