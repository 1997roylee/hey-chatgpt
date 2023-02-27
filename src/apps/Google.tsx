import { render } from 'utils/render'
// import { isGoogleSearchPage } from '../utils/google'
import { GoogleAdditional } from 'ui/pages'
const root = document.createElement('div')
root.id = 'hey-chatgpt'

let rightSidebar = document.querySelector('#rhs')

if (rightSidebar === null) {
    rightSidebar = document.createElement('div')
    rightSidebar.id = 'rhs'
    document.querySelector('#rcnt')?.appendChild(rightSidebar)
}

render(rightSidebar, GoogleAdditional, {
    shadowRoot: true,
    props: {
        style: {
            flex: 1,
        },
    },
})
