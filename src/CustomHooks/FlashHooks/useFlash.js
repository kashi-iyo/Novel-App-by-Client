import { useState } from 'react'

function useFlash() {
    const [flashMessages, setFlashMessages] = useState({
        success: "",
        errors: ""
    })

    const handleFlashMessages = ({ success, errors }) => {
        setFlashMessages({
            success: success,
            errors: errors
        })
        setTimeout(() => setFlashMessages({ success: "", errors: ""}), 3000)
    }

    return { flashMessages, handleFlashMessages }
}

export default useFlash
