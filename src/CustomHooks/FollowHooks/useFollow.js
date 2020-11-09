import axios from 'axios'
import { useState, useEffect } from 'react'

// フォローユーザー／フォロワーの取得
function useFollow({ method, url, history, handleFlashMessages }) {
    const [items, setItems] = useState({
        usersNickname: "",
        usersCount: "",
        relationshipsUsers: []
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log("useFollow: OK")
        let mount = true
        const getUserItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    console.log(response.data)
                    setIsLoading(true)
                    let res = response.data
                    let obj = res.object
                    let status = res.status
                    // フォローユーザー/フォロワー
                    if (mount && status === 200 && res.crud_type === "show") {
                        setItems({
                            usersNickname: obj.user,
                            usersCount: obj.users_count,
                            relationshipsUsers: obj.users
                        })
                        setIsLoading(false)
                    //Error 対象のユーザーが存在しない場合
                    } else if (mount && res.head === "no_content") {
                        console.log("useFollow: 対象のユーザーが存在しない")
                        handleFlashMessages({
                            errors: res.errors,
                            history: history,
                            pathname: "/"
                        })
                    }
                })
                .catch(err => console.log(err))
        }
        getUserItems()
        return () => { mount = false }
    }, [method, url])

    return {
        items, isLoading
    }

}

export default useFollow
