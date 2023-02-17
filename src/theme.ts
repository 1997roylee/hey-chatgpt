import { extendBaseTheme, mergeThemeOverride } from '@chakra-ui/theme-utils';
import chakraTheme from '@chakra-ui/theme';

const {
    // Select,
    // Tabs,
    Spinner,
    // Popover,
    Progress,
    // NumberInput,
    // PinInput,
    Menu,
    // Modal,
    // Link,
    // Form,
    // FormError,
    // FormLabel,
    // Heading,
    Button,
    Input,
    Checkbox,
    Skeleton,
    // Drawer,
    // Container,
    Divider,
    CloseButton,
    Alert,
    // Avatar,
    // Textarea,
    // Badge,
} = chakraTheme.components;

// const fonts = {
//     heading: `'Outfit', sans-serif`,
//     body: `'Outfit', sans-serif`,
//     mono: `'Outfit', sans-serif`,
// };

const components = {
    // Select,
    // Drawer,
    Divider,
    CloseButton,
    Alert,
    // Avatar,
    // Tabs,
    // Spinner,
    // Textarea,
    // Popover,
    Progress,
    // NumberInput,
    // PinInput,
    Menu,
    Input,
    Checkbox,
    Skeleton,
    Text,
    Spinner: mergeThemeOverride(Spinner, {
        sizes: {
            '2xl': {
                width: '12rem',
                height: '12rem',
            },
        },
    }),
    Button: mergeThemeOverride(Button, {
        baseStyle: {
            fontWeight: 700,
        },
        sizes: {
            lg: {
                // height: 'auto',
                py: 5,
                px: 8,
                fontSize: 16,
            },
            xl: {
                py: 5,
                px: 10,
                height: 'auto',
                fontSize: 18,
            },
        },
    }),
};

export const theme = extendBaseTheme({
    components,
});