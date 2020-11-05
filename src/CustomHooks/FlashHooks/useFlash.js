import { useState } from 'react'

function useFlash() {
    const [flashMessages , setFlashMessages] = useState("")

    const handleFlashMessages = (messages) => {
        setFlashMessages(messages)
        setTimeout(() => setFlashMessages(""), 2000)
    }

    return { flashMessages, handleFlashMessages }
}

export default useFlash
