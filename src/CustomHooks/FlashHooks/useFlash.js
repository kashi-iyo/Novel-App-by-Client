import { useState } from 'react'

function useFlash() {
    const [flashMessages, setFlashMessages] = useState({
        success: "",
        errors: ""
    })

    const handleFlashMessages = ({ success, errors, history, pathname }) => {
        console.log("handleFlashMessages: 発火", "success: ", success, "errors: ", errors, "history: ", history, "pathname: ", pathname)
        setFlashMessages({
            success: success,
            errors: errors
        })
        console.log("flashMessages: ", flashMessages)
        history && pathname && history.push(pathname)
        setTimeout(() => setFlashMessages({ success: "", errors: "" }), 3000)
    }

    return { flashMessages, handleFlashMessages }
}

export default useFlash
