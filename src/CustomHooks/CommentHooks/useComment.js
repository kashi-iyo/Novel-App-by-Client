import { useState } from "react"
import axios from 'axios'

function useComment({ novelId, currentUser, userId, commentsCount, commentsData }) {
    // コメントのデータ
    const [commentItems, setCommentItems] = useState({
        commentsCount: commentsCount,
        commentsData: commentsData,
    })
    // 削除時に画面から消すのに使う
    const [commentState, setCommentState] = useState(true)
    // フォームで使用する
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState("")
    const [success, setSuccess] = useState("")

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
                let key = res.keyword
                if (st === "created" && key === "create_comment") {
                    setSuccess(res.successful)
                    setCommentItems({
                        commentsCount: commentItems.commentsCount + 1,
                        commentsData: commentItems.commentsData.concat(res.comment)
                    })
                } else if (st === "unprocessable_entity") {
                    setErrors(res.errors)
                } else if (st === 401) {
                    setErrors(res.errors)
                }
            })
            .catch(err => console.log(err))
        setContent("")
        setTimeout(() => setErrors(""), 3000)
        setTimeout(() => setSuccess(""), 3000)
    }

    // コメント削除
    const handleRemove = (commentNovelId, commentId) => {
        axios.delete(`http://localhost:3001/api/v1/novels/${commentNovelId}/comments/${commentId}`, { withCredentials: true })
            .then(response => {
                let res = response.data
                if (res.head === "no_content") {
                    setSuccess(res.success)
                    setCommentState(false)
                    setCommentItems({
                        commentsCount: commentItems.commentsCount - 1,
                    })
                } else if (res.status === 401) {
                    setErrors(res.errors)
                    setTimeout(() => setErrors(""), 3000)
                }
            })
            .catch(err => console.log(err))
        setTimeout(() => setErrors(""), 3000)
        setTimeout(() => setSuccess(""), 3000)
    }



    return {commentItems, commentState, content, errors, success, handleChange, handleSubmit, handleRemove}
}

export default useComment
