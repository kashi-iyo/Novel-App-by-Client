import { useEffect, useState } from "react"
import axios from 'axios'

function useComment({ novelId, currentUser, userId, setCommentData, count, setCount }) {
    const [comments, setComments] = useState([])
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState("")
    const [success, setSuccess] = useState("")
    const [id] = useState(novelId ? String(novelId) : null)

    // 入力した内容を保持
    const handleChange = e => {
        setContent(e.target.value)
    }

    useEffect(() => {
        if (!!id) {
            let mount = true
            const getComment = () => {
            axios
                .get(`http://localhost:3001/api/v1/novels/${id}/comments`, { withCredentials: true })
                .then(response => {
                    let res = response.data
                    let st = res.status
                    let key = res.keyword
                    if (mount && st === 200 && key === "index_comments") {
                        setComments(res.comment)
                    }
                })
                .catch(err => console.log(err))
            }
            getComment()
            return () => { mount = false }
        }
    }, [setComments, id])

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
                console.log(response)
                let res = response.data
                let st = res.status
                let key = res.keyword
                if (st === "created" && key === "create_comment") {
                    setSuccess(res.successful)
                    setComments(res.comments)
                    setCount({
                        commentsCount: count.commentsCount + 1,
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

    const handleRemove = (commentNovelId, commentId) => {
        axios.delete(`http://localhost:3001/api/v1/novels/${commentNovelId}/comments/${commentId}`, { withCredentials: true })
            .then(response => {
                let res = response.data
                if (res.head === "no_content") {
                    setSuccess(res.success)
                    setCommentData({
                        commentId: ""
                    })
                    setCount({
                        commentsCount: count.commentsCount - 1,
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



    return {comments, content, errors, success, handleChange, handleSubmit, handleRemove}
}

export default useComment
