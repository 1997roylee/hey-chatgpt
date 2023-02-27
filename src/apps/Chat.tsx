import { Chat } from 'ui/pages'
import { render } from 'utils/render'

render(document.querySelector('body') as HTMLBodyElement, Chat, {
    shadowRoot: true,
})
