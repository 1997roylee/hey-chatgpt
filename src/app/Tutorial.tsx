const ENGLISH_VERSION = [
    '1. After the extension is loaded, you can refresh the page.',
    '2. After the page is refreshed, you can see the OpenAI icon in the bottom right corner of the browser.',
    '3. Click the OpenAI icon to open the chat window.',
    '4. Enjoy!',
]

export const Tutorial = (): JSX.Element => {
    return (
        <div style={{ padding: 16, minWidth: 360 }}>
            <h1>&#34;ChatGPT Everywhere&#34; Tutorial</h1>
            {ENGLISH_VERSION.map((item, index) => {
                return (
                    <p style={{ fontSize: 16 }} key={index}>
                        {item}
                    </p>
                )
            })}
        </div>
    )
}
