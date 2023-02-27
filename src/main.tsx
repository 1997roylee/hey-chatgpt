import React from 'react'
import ReactDOM from 'react-dom/client'
import { Store } from 'ui/pages'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Store />
    </React.StrictMode>,
)
