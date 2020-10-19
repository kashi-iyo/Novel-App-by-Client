import {useState} from 'react'
import axios from 'axios'
import useRedirect from '../Redirect/useRedirect'

function useRemoveItems({url, keyword, history}) {
    const [removeErrors, setRemoveErrors] = useState("")
    const [removeSuccess, setRemoveSuccess] = useState("")
    const [confirmation, setConfirmation] = useState("")
    const {redirect} = useRedirect({history})

    const handleClick = () => {
        if (keyword === "series") {
            setConfirmation("本当にこのシリーズを削除しますか？")
        } else if (keyword === "novel") {
            setConfirmation("本当にこの話を削除しますか？")
        }
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
                    setRemoveSuccess(res.success)
                    setTimeout(() => setRemoveSuccess(""), 2000)
                    setTimeout(() => redirect("/"), 2000)
                //error 未認証の場合
                } else if (res.status === "unauthorized") {
                    setRemoveErrors(res.messages)
                    setTimeout(() => setRemoveErrors(""), 2000)
                }
            })
            .catch(err => console.log(err))
        setConfirmation("")
    }

    return {
        removeErrors, confirmation, removeSuccess,  handleClick, handleNoRemove, handleOkRemove
    }
}

export default useRemoveItems
