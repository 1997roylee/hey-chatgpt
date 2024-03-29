import { v4 as uuid } from 'uuid'
import extractJsonFromString from 'extract-json-from-string'
import Cookies from 'js-cookie'
import Browser from 'webextension-polyfill'

export const getAccessToken = async (): Promise<any> => {
    // const payload = await Browser.storage.local.get('accessToken')
    if (Cookies.get('accessToken') !== undefined) {
        return Cookies.get('accessToken')
    }
    const url = 'https://chat.openai.com/api/auth/session'
    const response = await fetch(url)
    if (response.status === 403) {
        Cookies.remove('accessToken')
        return null
    }

    if (response.status === 200) {
        const data = await response.json()
        Cookies.set('accessToken', data.accessToken, { expires: new Date(data.expires).getTime() })
        return data.accessToken
    }
    return null
}

export const getCookies = async (): Promise<string> => {
    const cookies = await Browser.cookies.getAll({ url: 'https://chat.openai.com' })
    // console.log(cookies)
    return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ')
}

export const postConversation = async (
    message: string,
    token: string,
    parentId?: string,
    // proxy?: boolean,
): Promise<any> => {
    const controller = new AbortController()
    const url = 'https://chat.openai.com/backend-api/conversation'

    return await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            responseType: 'stream',
        },

        body: JSON.stringify({
            action: 'next',
            messages: [
                {
                    id: uuid(),
                    role: 'user',
                    content: {
                        content_type: 'text',
                        parts: [message],
                    },
                },
            ],
            model: 'text-davinci-002-render',
            parent_message_id: parentId ?? uuid(),
        }),
        signal: controller.signal,
    })
}

export async function* extractStream(response: Response): AsyncGenerator<any, void, unknown> {
    try {
        if (!response.ok || response.body == null) {
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw response.statusText
        }

        const reader = response.body.getReader()
        while (true) {
            const { value, done } = await reader.read()
            if (done) {
                break
            }

            const str = new TextDecoder().decode(value)
            const answers = extractJsonFromString(str)
            if (answers.length > 0) {
                yield answers[answers.length - 1]
            }
        }
    } catch (error) {
        console.warn(error)
    }
}
