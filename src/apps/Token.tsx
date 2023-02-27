import { TokenSuccess } from 'ui/pages'
import { waitForElement } from 'utils/dom'
import { render } from 'utils/render'
import Browser from 'webextension-polyfill'
// import { useAppStore } from "stores";

interface NextData {
    page: string
    props: {
        pageProps: {
            accessToken: string
        }
    }
}

void waitForElement('#__NEXT_DATA__').then(function (element: Node | Element | HTMLElement) {
    // console.log(element);
    // console.log("The element " + element + " arrived!")
    // document.querySelector()
    try {
        const data: NextData = JSON.parse((element as Element).innerHTML)
        const token = data.props.pageProps.accessToken
        // useAppStore.setState({ accessToken: token })
        void Browser.runtime.sendMessage({
            type: 'setToken',
            payload: token,
        })
        render(document.querySelector('body') as HTMLBodyElement, TokenSuccess, {
            shadowRoot: true,
        })
        // console.log(token);
    } catch (error) {
        console.warn(error)
    }
})
