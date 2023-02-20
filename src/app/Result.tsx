import { Box, Button, Divider } from "@chakra-ui/react";
import { AdditionalResult } from "../components/AdditionalResult";

export default function Result(): JSX.Element {
    return <Box ml={8} bg='#f9f9f9' borderRadius={'md'} boxShadow='0 0 0 1px rgb(0 0 0 / 5%)'>
        <AdditionalResult />
        <Divider />
        <Box p={4} px={5}>
            <Button borderRadius='full'>
                Let&apos;s Chat
            </Button>
        </Box>
    </Box>
}