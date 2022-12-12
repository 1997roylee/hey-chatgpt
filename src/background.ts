import Browser from 'webextension-polyfill'

import { extractStream, getAccessToken, postConversation } from './utils/request'

export const ask = async (
    question: string,
    parentMessageId: string,
    callback: (answer: any, error?: string) => void,
    options?: {
        proxy?: boolean
    },
): Promise<void> => {
    const token = options?.proxy ?? false ? '' : await getAccessToken()

    console.log(token);
    if (token === null || token === undefined) {
        // eslint-disable-next-line n/no-callback-literal
        callback(
            '',
            "Before you use this extension, you need to log in to OpenAI's website. https://chat.openai.com/auth/login",
        )
        return
    }

    const response = await postConversation(question, token, parentMessageId, options?.proxy)

    for await (const answer of extractStream(response)) {
        callback(answer)
    }
}

export const onMessageListener = async (
    msg: {
        type: string
        payload: string
        parentMessageId: string
        proxy?: boolean
    },
    sender: Browser.Runtime.MessageSender,
): Promise<void> => {
    void ask(
        msg.payload,
        msg.parentMessageId,
        (answer: any, error?: string) => {
            if (error !== undefined) {
                void Browser.tabs.sendMessage(sender?.tab?.id as number, {
                    id: 'Error',
                    text: 'Error: ' + error,
                })
                return
            }

            void Browser.tabs.sendMessage(sender?.tab?.id as number, {
                id: answer?.conversation_id,
                text: answer?.message?.content?.parts[0] ?? '',
            })
        },
        {
            proxy: msg.proxy,
        },
    )
}

Browser.runtime.onMessage.addListener(onMessageListener)
