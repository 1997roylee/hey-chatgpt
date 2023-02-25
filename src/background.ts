import Browser from 'webextension-polyfill'
import { extractStream, getAccessToken, postConversation } from './utils/request'

export const ask = async (
    question: string,
    parentMessageId: string,
    callback: (answer: any, error?: string) => void,
): Promise<void> => {
    const token = await getAccessToken()
    // console.log(token)
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

export const onMessageListener = async (
    msg: {
        type: string
        payload: string
        parentMessageId: string
        // proxy?: boolean
    },
    sender: Browser.Runtime.MessageSender,
): Promise<void> => {
    if (msg.type === 'chat')
        void ask(msg.payload, msg.parentMessageId, (answer: any, error?: string) => {
            if (error !== undefined) {
                void Browser.tabs.sendMessage(sender?.tab?.id as number, {
                    id: 'Error',
                    text: error,
                })
                return
            }

            void Browser.tabs.sendMessage(sender?.tab?.id as number, {
                id: answer?.conversation_id,
                text: answer?.message?.content?.parts[0] ?? '',
            })
        })
    // else if (msg.type === 'popup')
    //     void Browser.action.openPopup()
}

Browser.runtime.onMessage.addListener(onMessageListener)
