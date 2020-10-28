import { useState } from "react"
import axios from 'axios'

function useComment({ novelId, currentUser, userId, commentsCount, commentsUser, setAfterRemove, setRemoveSuccess }) {
    // コメントのデータ
    const [commentsItems, setCommentsItems] = useState({
        commentsCount: commentsCount,
        commentsUser: commentsUser ? commentsUser : [],
    })
    // フォームで使用する
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState("")
    const [success, setSuccess] = useState("")
    const [removeMessage, setRemoveMessage] = useState("")

    // 入力した内容を保持
    const handleChange = e => {
        setContent(e.target.value)
    }

    // コメントの送信
    const handleSubmit = e => {
        e.preventDefault()
        axios
            .post(`http://localhost:3001/api/v1/novels/${novelId}/comments`,
                {
                    comment: {
                        content: content,
                        novel_id: novelId,
                        user_id: userId,
                        commenter: currentUser
                }},
                { withCredentials: true })
            .then(response => {
                let res = response.data
                let st = res.status
                if (st === "created") {
                    setSuccess(res.successful)
                    // カウントとユーザーを追加
                    setCommentsItems({
                        commentsCount: commentsItems.commentsCount + 1,
                        commentsUser: commentsItems.commentsUser.concat(res.object)
                    })
                    setContent("")
                    setTimeout(() => setSuccess(""), 3000)
                } else if (st === "unprocessable_entity") {
                    setErrors(res.errors)
                    setTimeout(() => setErrors(""), 3000)
                } else if (st === "unauthorized") {
                    setErrors(res.errors)
                    setTimeout(() => setErrors(""), 3000)
                }
            })
            .catch(err => console.log(err))
    }

    // コメント削除
    const handleRemove = (commentNovelId, commentId) => {
        axios.delete(`http://localhost:3001/api/v1/novels/${commentNovelId}/comments/${commentId}`, { withCredentials: true })
            .then(response => {
                let res = response.data
                if (res.head === "no_content") {
                    const comments = commentsItems.commentsUser.filter(com => com.comment_id !== commentId)
                    setAfterRemove({
                        commentsCount: commentsItems.commentsCount - 1,
                        commentsUser: comments
                    })
                    console.log("Remove完了")
                    setRemoveSuccess(res.success)
                    console.log("サクセスメッセージ表示")
                    setTimeout(() => setRemoveSuccess(""), 3000)
                    console.log("サクセスメッセージ削除")
                } else if (res.status === "unauthorized") {
                    setErrors(res.errors)
                    setTimeout(() => setErrors(""), 3000)
                }
            })
            .catch(err => console.log(err))
    }




    return {commentsItems, setCommentsItems, content, errors, success, setSuccess, handleChange, handleSubmit, handleRemove}
}

export default useComment
