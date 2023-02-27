import { render } from 'utils/render'
import { GoogleAdditional } from 'ui/pages'
import { waitForElement } from 'utils/dom'

void waitForElement('#rcnt').then(function (element: Node | Element | HTMLElement) {
    const root = document.createElement('div')
    root.id = 'hey-chatgpt'

    let rightSidebar = document.querySelector('#rhs')

    if (rightSidebar === null) {
        rightSidebar = document.createElement('div')
        rightSidebar.id = 'rhs'
        element.appendChild(rightSidebar)
    }

    console.log('rightSidebar', rightSidebar)

    render(rightSidebar, GoogleAdditional, {
        shadowRoot: true,
    })
})
