import { useState } from "react"
import axios from 'axios'

function useComment({ novelId, currentUser, userId, commentItems, setCommentItems, handleFlashMessages }) {

    // フォームで使用する
    const [content, setContent] = useState("")

    // 入力した内容を保持
    const handleChange = e => {
        setContent(e.target.value)
    }

    // コメントの送信
    const handleSubmit = e => {
        e.preventDefault()
        axios
            .post(
                `http://54.65.39.121/api/v1/novels/${novelId}/comments`,
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
                    console.log("コメント送信: 成功", "レスポンス :", response)
                    handleFlashMessages({ success: res.successful })
                    // カウントとユーザーを追加
                    setCommentItems({
                        commentCounts: commentItems.commentCounts + 1,
                        commentContents: commentItems.commentContents.concat(res.object)
                    })
                    setContent("")
                } else if (st === "unprocessable_entity") {
                    console.log("コメント送信: 失敗", "レスポンス :", response)
                    handleFlashMessages({errors: res.errors})
                } else if (st === "unauthorized") {
                    console.log("コメント送信: 失敗", "レスポンス :", response)
                    handleFlashMessages({errors: res.errors})
                }
            })
            .catch(err => console.log(err))
    }

    // コメント削除
    const handleRemove = (commentNovelId, commentId) => {
        axios.delete(
            `http://54.65.39.121/api/v1/novels/${commentNovelId}/comments/${commentId}`,
            { withCredentials: true })
            .then(response => {
                let res = response.data
                if (res.head === "no_content") {
                    console.log("コメント削除: 成功", "レスポンス :", response)
                    handleFlashMessages({success: res.successful})
                    const comments = commentItems.commentContents.filter(com => com.comment_id !== commentId)
                    setCommentItems({
                        commentCounts: commentItems.commentCounts - 1,
                        commentContents: comments
                    })
                } else if (res.status === "unauthorized") {
                    console.log("コメント削除: 失敗", "レスポンス :", response)
                    handleFlashMessages({errors: res.errors})
                }
            })
            .catch(err => console.log(err))
    }




    return {content, handleChange, handleSubmit, handleRemove}
}

export default useComment
