import { MessageBox } from './MessageBox'
import { AppState, IMessage, useAppStore } from 'stores'
import { useEffect, useRef } from 'react'
import { ErrorMessageBox } from './ErrorMessageBox'
import { Box, Stack } from '@mui/system'
import { DotsLoading } from 'ui/components/ui'

export const MessagePanel = (): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null)
    const { getMessageList, lastUpdatedAt, isLoading } = useAppStore((state: AppState) => ({
        getMessageList: state.getMessageList,
        lastUpdatedAt: state.lastUpdatedAt,
        isLoading: state.isLoading,
    }))

    // console.log(lastUpdatedAt);
    useEffect(() => {
        // console.log('scrolling')
        if (ref.current != null) ref.current.scrollIntoView({ behavior: 'smooth' })
    }, [lastUpdatedAt])

    return (
        <Stack
            spacing={1}
            sx={{
                padding: 4,
                flex: 1,
                overflowY: 'scroll',
                // paddingBottom: 10,
                // height: 'calc(100% - 100px)'
            }}
        >
            {getMessageList().map((message: IMessage, index: number) => {
                return (
                    <>
                        {/* {message.parentMessageId === undefined && index > 0 && (
                            <Divider key={`Divider-${index}`} />
                        )} */}
                        {message.id === 'Error' ? (
                            <ErrorMessageBox />
                        ) : (
                            <MessageBox isMe={message.sender === 'me'}>{message.text}</MessageBox>
                        )}
                    </>
                )
            })}
            {isLoading && (
                <MessageBox>
                    <DotsLoading />
                </MessageBox>
            )}
            <Box ref={ref} />
        </Stack>
    )
}
