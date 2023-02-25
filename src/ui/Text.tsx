import { Box, BoxProps } from "@mui/system";

interface TextProps extends BoxProps {
    children: React.ReactNode;
}

export const Text = (props: TextProps): JSX.Element => {
    const { children, ...rest } = props;

    return <Box {...rest}>{children}</Box>;
}