import Browser from 'webextension-polyfill'
import { extractStream, getAccessToken, postConversation } from 'utils/request'

let lastTabId = 0
export interface IMessagePayload {
    type: string
    payload: any
}

// type MessagePayload = {
//     type: string
//     payload: any
// }

export const ask = async (
    question: string,
    parentMessageId: string,
    callback: (answer: any, error?: string) => void,
): Promise<void> => {
    const token = await getAccessToken()
    // console.log(token, 1234)
    if (token === null || token === undefined) {
        // eslint-disable-next-line n/no-callback-literal
        callback(
            '',
            'Please login and pass Cloudflare check at chat.openai.com. https://chat.openai.com/auth/login',
        )
        return
    }

    const response = await postConversation(question, token, parentMessageId)

    for await (const answer of extractStream(response)) {
        callback(answer)
    }
}

export const createResponsePayload = (type: 'answer' | 'google', payload: any): IMessagePayload => {
    return {
        type,
        payload,
    }
}

export const onMessageListener = async (
    msg: {
        type: string
        payload: string
        parentMessageId: string
        // proxy?: boolean
    },
    sender: Browser.Runtime.MessageSender,
): Promise<void> => {
    switch (msg.type) {
        case 'chat':
            void ask(msg.payload, msg.parentMessageId, (answer: any, error?: string) => {
                if (error !== undefined) {
                    void Browser.tabs.sendMessage(
                        sender?.tab?.id as number,
                        createResponsePayload('answer', {
                            id: 'Error',
                            text: error,
                        }),
                    )
                    return
                }

                void Browser.tabs.sendMessage(
                    sender?.tab?.id as number,
                    createResponsePayload('answer', {
                        id: answer?.message?.id,
                        parentMessageId: answer?.conversation_id,
                        text: answer?.message?.content?.parts[0] ?? '',
                    }),
                )
            })
            break
        case 'google':
            void ask(msg.payload, msg.parentMessageId, (answer: any, error?: string) => {
                if (error !== undefined) {
                    void Browser.tabs.sendMessage(
                        sender?.tab?.id as number,
                        createResponsePayload('google', {
                            id: 'Error',
                            text: error,
                        }),
                    )
                    return
                }

                void Browser.tabs.sendMessage(
                    sender?.tab?.id as number,
                    createResponsePayload('google', {
                        id: answer?.message?.id,
                        parentMessageId: answer?.conversation_id,
                        text: answer?.message?.content?.parts[0] ?? '',
                    }),
                )
            })
            break
        case 'redirect':
            // console.log(lastTabId)
            void Browser.tabs.update(lastTabId, { active: true })
            break
        case 'logon':
            // console.log(lastTabId)
            lastTabId = sender?.tab?.id as number
            break
        case 'setToken':
            // console.log(msg.payload)
            void Browser.storage.local.set({ accessToken: msg.payload })
    }
}

if (!Browser.runtime.onMessage.hasListener(onMessageListener)) {
    Browser.runtime.onMessage.addListener(onMessageListener)
}
