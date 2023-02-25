import { ButtonUnstyled, ButtonUnstyledProps } from "@mui/base";
// import { BoxProps } from "@mui/system";

interface ButtonProps extends ButtonUnstyledProps {
    children: React.ReactNode;
}

export const Button = (props: ButtonProps): JSX.Element => {
    const { children, ...rest } = props;

    return <ButtonUnstyled {...rest}>{children}</ButtonUnstyled>;
};