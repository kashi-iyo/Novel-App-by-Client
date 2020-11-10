import {useState} from 'react'
import axios from 'axios'

function useRemoveItems({url, target, history, handleFlashMessages}) {
    const [confirmation, setConfirmation] = useState("")

    const handleClick = () => {
        setConfirmation(`本当にこの${target}を削除しますか？`)
    }

    const handleNoRemove = () => {
        setConfirmation("")
    }

    // 削除に成功→メッセ&リダイレクト、失敗→エラーメッセージ
    const handleOkRemove = () => {
        axios.delete(url, { withCredentials: true })
            .then(response => {
                let res = response.data
                //Destroy 削除に成功
                if (res.head === "no_content") {
                    handleFlashMessages({
                        success: res.successful,
                        history: history,
                        pathname: "/"
                    })
                //error 不認可の場合
                } else if (res.status === "unauthorized") {
                    handleFlashMessages({
                        errors: res.errors,
                        history: history,
                        pathname: "/"
                    })
                // 何らかの理由で失敗
                } else if (res.status === "unprocessable_entity") {
                    handleFlashMessages({
                        errors: res.errors,
                        history: history,
                        pathname: "/"
                    })
                }
            })
            .catch(err => console.log(err))
        setConfirmation("")
    }

    return {
        confirmation, handleClick, handleNoRemove, handleOkRemove
    }
}

export default useRemoveItems
