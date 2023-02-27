export async function waitForElement(selector: string): Promise<Node | Element | HTMLElement> {
    return await new Promise(function (resolve) {
        const element = document.querySelector(selector)

        if (element != null) {
            resolve(element)
            return
        }

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                const nodes = Array.from(mutation.addedNodes)
                for (const node of nodes) {
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    if (!!(node as any).matches && (node as any).matches(selector)) {
                        observer.disconnect()
                        resolve(node)
                        return
                    }
                }
            })
        })

        observer.observe(document.documentElement, { childList: true, subtree: true })
    })
}

export const getSelection = (): Selection | null => {
    const selection = window.getSelection()
    if (selection == null) {
        return null
        // throw new Error('Selection is null')
    }
    return selection
}

export const getSelectionText = (): string => {
    const selection = getSelection()
    if (selection != null) return selection.toString()

    return ''
}

export const getSelectionPosition = (): { x: number; y: number } => {
    const selection = getSelection()
    if (selection != null) {
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        return { x: rect.x, y: rect.y }
    }
    return { x: 0, y: 0 }
}
