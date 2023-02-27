import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'
export interface IMessage {
    id: string
    text: string
    sender: 'me' | 'bot'
    index: number
    parentMessageId?: string
}

export interface AppState {
    messages: {
        [key: string]: IMessage
    }
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
    addMessage: (message: IMessage) => void
    removeAllMessages: () => void
    getMessageList: () => IMessage[]
    lastUpdatedAt: number
    lastConversationId?: string
    lastTabId?: number
    lastIndex: number
    setLastTabId: (lastTabId: number) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
}

// <AppState, [['zustand/persist', AppState]]>
export const useAppStore = create<AppState>((set, get) => ({
    messages: {},
    lastIndex: 0,
    isLoading: false,
    lastConversationId: undefined,
    lastUpdatedAt: new Date().getTime(),
    lastTabId: undefined,
    setLastTabId: (lastTabId: number) => set({ lastTabId }),
    accessToken: '',
    setAccessToken: (accessToken: string) => set({ accessToken }),
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
    addMessage: (message: IMessage) => {
        if (Object.prototype.hasOwnProperty.call(get().messages, message.id)) {
            set((state) => ({
                messages: {
                    ...state.messages,
                    [message.id]: {
                        ...message,
                        index: get().messages[message.id].index,
                    },
                },
                lastUpdatedAt: new Date().getTime(),
                lastConversationId: message.id,
            }))
        } else {
            set((state) => ({
                messages: {
                    ...state.messages,
                    [message.id]: {
                        ...message,
                        index: get().lastIndex,
                    },
                },
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                lastIndex: get().lastIndex + 1,
                lastUpdatedAt: new Date().getTime(),
            }))
        }
    },
    removeAllMessages: () => set({ messages: {} }),
    getMessageList: () => {
        if (Object.keys(get().messages).length === 0) return []

        return Object.values(get().messages).sort((a, b) => a.index - b.index)
    },
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
}))
