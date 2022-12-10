declare module '*.json' {
    const value: any
    export default value
}

declare module 'extract-json-from-string' {
    export default function extractJsonFromString(str: string): any[]
}
