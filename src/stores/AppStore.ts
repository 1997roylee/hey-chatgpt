import create from 'zustand'

export interface IMessage {
    id: string
    text: string
    sender: 'me' | 'bot'
    index: number
}

export interface AppState {
    messages: {
        [key: string]: IMessage
    }
    lastIndex: number
    isLoading: boolean
    addMessage: (message: IMessage) => void
    removeAllMessages: () => void
    getMessageList: () => IMessage[]
    setIsLoading: (isLoading: boolean) => void
    lastUpdatedAt: number
    lastConversationId?: string
}

export const useAppStore = create<AppState>((set, get) => ({
    messages: {},
    lastIndex: 0,
    isLoading: false,
    lastConversationId: undefined,
    lastUpdatedAt: new Date().getTime(),
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
