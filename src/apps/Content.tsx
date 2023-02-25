import { isGoogleSearchPage } from '../utils/google'
import { GoogleResult } from 'ui/pages'
import { render } from '../utils/render'

const root = document.createElement('div')
root.id = 'hey-chatgpt'

let rightSidebar = document.querySelector('#rhs')

if (rightSidebar === null) {
    rightSidebar = document.createElement('div')
    rightSidebar.id = 'rhs'
    document.querySelector('#rcnt')?.appendChild(rightSidebar)
}

const style = {
    flex: 1,
}

if (isGoogleSearchPage() === true)
    render(rightSidebar, GoogleResult, {
        shadowRoot: true,
        props: {
            style,
        },
    })

// document.addEventListener('selectionchange', function () {
//     let selectedText = ''

//     // window.getSelection
//     if (window.getSelection) {
//         selectedText = window.getSelection()
//     }
//     // document.getSelection
//     else if (document.getSelection) {
//         selectedText = document.getSelection()
//     }
//     // document.selection
//     else if (document.selection) {
//         selectedText = document.selection.createRange().text
//     }

//     console.log(selectedText.toString())
// })
