import { useEffect, useState } from "react"
import axios from 'axios'

function useComment({ method, url }) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        let mount = true
        const getComment = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    let res = response.data
                    let ok = res.status === 200
                    let key = res.keyword
                    if (mount && ok && key === "index_comments") {
                        console.log(res)
                        setComments(res.comment)
                    }
                })
                .catch(err => console.log(err))
        }

        getComment()
        return () => { mount = false }
    }, [method, url])

    return {comments}
}

export default useComment
