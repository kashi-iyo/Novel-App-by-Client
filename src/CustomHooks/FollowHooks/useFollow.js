import axios from 'axios'
import { useState, useEffect } from 'react'

// フォローユーザー／フォロワーの取得
function useFollow({ method, url }) {
    const [items, setItems] = useState([])
    const [errors, setErrors] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let mount = true
        const getUserItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    setIsLoading(true)
                    let res = response.data
                    let obj = res.object
                    let ok = res.status === 200
                    // フォローユーザー/フォロワー
                    if (mount && ok && res.crud_type === "show") {
                        setItems(obj)
                        setIsLoading(false)
                    //Error 不認可
                    } else if (mount && res.status === "unauthorized") {
                        setErrors(res.errors)
                        setIsLoading(false)
                    //Error 存在しない
                    } else if (mount && res.status === "no_content") {
                        setErrors(res.errors)
                        setIsLoading(false)
                    //Error 保存失敗
                    } else if (mount && res.status === "unprocessable_entity") {
                        setErrors(res.errors)
                        setIsLoading(false)
                    }
                })
                .catch(err => console.log(err))
        }
        getUserItems()
        setErrors("")
        return () => { mount = false }
    }, [method, url])

    return {
        items, errors, isLoading
    }

}

export default useFollow
