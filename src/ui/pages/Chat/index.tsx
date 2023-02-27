import { useEffect, useState } from 'react'
import { ChatApp, ChatAppCursor, ChatAppTrigger } from 'ui/components/app'
import { Box } from '@mui/system'
import { getSelectionText, getSelectionPosition } from 'utils/dom'
import { useDebounce } from 'usehooks-ts'
import { AppState, useAppStore } from 'stores/AppStore'
import Browser from 'webextension-polyfill'

const Chat = (): JSX.Element => {
    const [selectedValue, setSelectedValue] = useState('')
    const debouncedSelectedValue = useDebounce(selectedValue, 300)
    const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 })
    const debouncedSelectedPosition = useDebounce(selectionPosition, 500)

    const { addMessage, setIsLoading, isOpen, setIsOpen } = useAppStore(
        ({ addMessage, setIsLoading, isOpen, setIsOpen }: AppState) => ({
            addMessage,
            setIsLoading,
            isOpen,
            setIsOpen,
        }),
    )

    const toggleOpen = (): void => {
        setIsOpen(!isOpen)
    }

    const resetSelectionData = (): void => {
        setSelectionPosition({ x: 0, y: 0 })
        setSelectedValue('')
    }

    const handleOpen = (): void => {
        setIsLoading(true)
        addMessage({
            text: debouncedSelectedValue,
            id: Date.now().toString(),
            sender: 'me',
            index: 0,
        })
        void Browser.runtime.sendMessage({
            type: 'chat',
            payload: debouncedSelectedValue,
            parentMessageId: '',
        })
        setIsOpen(true)
        resetSelectionData()
    }

    useEffect(() => {
        document.addEventListener('selectionchange', function () {
            const selectedText = getSelectionText()
            if (selectedText === '') {
                resetSelectionData()
            } else {
                setSelectionPosition(getSelectionPosition())
                setSelectedValue(selectedText)
            }
        })
    }, [])

    return (
        <>
            {debouncedSelectedPosition.y !== 0 && debouncedSelectedPosition.x !== 0 && (
                <Box
                    // id='cursor'
                    position='absolute'
                    top={debouncedSelectedPosition.y - 48}
                    left={debouncedSelectedPosition.x - 48}
                    onClick={handleOpen}
                >
                    <ChatAppCursor size={48} />
                </Box>
            )}
            <Box
                color='#000'
                sx={{
                    position: 'fixed',
                    top: 'calc(50% - 32px)',
                    right: '-32px',
                    zIndex: 99999,
                }}
            >
                {!isOpen && <ChatAppTrigger onClick={toggleOpen} />}
                {isOpen ? (
                    <Box
                        sx={{
                            maxWidth: 'calc(100% - 40px)',
                            width: 370,
                            height: '100vh',
                            position: 'fixed',
                            zIndex: 99999,
                            bottom: 0,
                            right: 0,
                            border: '1px solid #00000010',
                            background: '#fff',
                            '--shadow-1': 'rgba(0, 0, 0, 0.1)',
                            '--shadow-2': 'rgba(0, 0, 0, 0.2)',
                            boxShadow: '0 2px 4px var(--shadow-1),0 12px 28px var(--shadow-2)',
                        }}
                    >
                        <ChatApp onClose={toggleOpen} />
                    </Box>
                ) : null}
            </Box>
        </>
    )
}

export default Chat
