// import { Input, Icon, Flex, IconButton, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import Browser from 'webextension-polyfill'
import { IoChatbubbleOutline, IoReturnUpBackOutline } from 'react-icons/io5'
// import { BsChatDots, BsReply } from 'react-icons/bs'
import { AppState, useAppStore } from '../../stores'
import { Flex } from '../../ui'

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
            // proxy: isReverseProxyMode,
        })
    }

    const handleKeyDown = (event: any): void => {
        if (event.key === 'Enter') {
            handleSubmit()
        }
    }

    return (
        <Flex mx={4} my={3} alignItems='center' p={1} boxShadow='0px 0px 5px 0px rgba( 0,0,0,.1)'>
            {/* <InputGroup>
                <InputLeftElement position='relative'>
                    <Icon as={IoChatbubbleOutline} w={5} h={5} color='rgb(68, 68, 68)' />
                </InputLeftElement>
                <Input
                    placeholder='Ask me anything...'
                    value={value}
                    flex={1}
                    pl={0}
                    variant='unstyled'
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    css={{
                        '&::placeholder': {
                            color: 'rgb(68, 68, 68)',
                        },
                        '&::-ms-input-placeholder': {
                            color: 'rgb(68, 68, 68)',
                        },
                        '&:-ms-input-placeholder': {
                            color: 'rgb(68, 68, 68)',
                        },
                    }}
                    autoFocus
                />
            </InputGroup> */}

            {/* <IconButton
                onClick={handleSubmit}
                ml={1}
                variant='ghost'
                aria-label='Send'
                icon={<Icon as={IoReturnUpBackOutline} color='rgb(68, 68, 68)' w={5} h={5} />}
            /> */}
        </Flex>
    )
}
