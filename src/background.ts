import Browser from 'webextension-polyfill'

import { extractStream, getAccessToken, postConversation } from './utils/request'

export const ask = async (
    question: string,
    callback: { (answer: any): void; (arg0: any): void },
): Promise<void> => {
    // const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJpbmZvQHRyZXgudGVjaG5vbG9neSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW9pcF9jb3VudHJ5IjoiVVMifSwiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS9hdXRoIjp7InVzZXJfaWQiOiJ1c2VyLTk2OVFieEFaaGRxMjZ5UkdpOERhTjRMaCJ9LCJpc3MiOiJodHRwczovL2F1dGgwLm9wZW5haS5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDUxODU1ODI0NjE2NDMyMTQ0ODciLCJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSIsImh0dHBzOi8vb3BlbmFpLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NzA2NDc0ODMsImV4cCI6MTY3MDY5MDY4MywiYXpwIjoiVGRKSWNiZTE2V29USHROOTVueXl3aDVFNHlPbzZJdEciLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIG1vZGVsLnJlYWQgbW9kZWwucmVxdWVzdCBvcmdhbml6YXRpb24ucmVhZCBvZmZsaW5lX2FjY2VzcyJ9.mOLcHl5MhU_h9icUOMl8SqUni7_8UianxDQ8uSLOfU8HwCWnOkAc00P6tCfpg-F0bbsoEvGEBkXlenIH3yWnaj6uZfVJn3D3-aiqwwH5cFr1zyUA5Lk88LPIdi4oZ7jPbN02n1iTCbgXUxbuZQbRorrLb-Q5x_Sf-s2SmTDn0so3jdnzYGQkgZkIyw6PqmVLKz-j9D4TdiUhTgYmnpOAWi_uthYNKocPA0sVwCwtgcG7Gq2EvMeRYsVISeMLWJasjhmRQIbq1RPSDYEWvSdGmKUx5urVW1tttylg-Q6xMJHGMHnRIWUd3ucTMEUX7SRq6jspAKVTH0engF94CW6oww"
    const response = await postConversation(question, await getAccessToken())

    for await (const answer of extractStream(response)) {
        callback(answer)
    }
}

export const onMessageListener = async (
    msg: string,
    sender: Browser.Runtime.MessageSender,
): Promise<void> => {
    // console.log("BG page received message", msg, "from", sender);
    void ask(msg, (answer: any) => {
        // console.log("BG page received answer", answer);
        void Browser.tabs.sendMessage(sender?.tab?.id as number, {
            id: answer?.conversation_id,
            text: answer?.message?.content?.parts[0] ?? '',
        })
    })
}

Browser.runtime.onMessage.addListener(onMessageListener)
