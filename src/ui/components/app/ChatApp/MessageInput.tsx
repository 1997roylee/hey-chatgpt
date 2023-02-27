// import { Input, Icon, Flex, IconButton, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import Browser from 'webextension-polyfill'
import { RiSendPlaneLine } from 'react-icons/ri'
import { AppState, useAppStore } from 'stores'
import { Icon, Input, Text } from 'ui/components/ui'
import { Box } from '@mui/system'

export const MessageInput = (): JSX.Element => {
    const [value, setValue] = useState<string>('')
    const { addMessage, setIsLoading, lastConversationId } = useAppStore(
        ({ lastConversationId, addMessage, setIsLoading }: AppState) => ({
            lastConversationId,
            addMessage,
            setIsLoading,
        }),
    )
    const handleChange = useCallback((event: any) => {
        setValue(event.target.value)
    }, [])

    const handleSubmit = (): void => {
        if (value.length === 0) return

        addMessage({
            id: Date.now().toString(),
            text: value,
            sender: 'me',
            index: 0,
        })
        setIsLoading(true)
        setValue('')
        void Browser.runtime.sendMessage({
            type: 'chat',
            payload: value,
            parentMessageId: lastConversationId,
        })
    }

    const handleKeyDown = (event: any): void => {
        if (event.key === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <Box px={4} pb={3}>
            <Input
                rightIcon={
                    <Icon
                        size={20}
                        sx={{
                            cursor: 'pointer',
                            color: 'd0d7de',
                        }}
                        as={RiSendPlaneLine}
                    />
                }
                value={value}
                placeholder='Ask me anything...'
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <Text pt={1} fontSize='.8rem' color='#222'>
                {value.length}/1000
            </Text>
        </Box>
    )
}
