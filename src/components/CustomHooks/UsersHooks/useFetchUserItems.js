import axios from 'axios'
import { useState,useEffect } from 'react'
import useRedirect from '../Redirect/useRedirect'

// ユーザーデータを取得、ユーザーデータの更新
// UsersEdit, UsersPageTop, UsersSeriesにて使用
function useFetchUserItems({ method, url, updateMethod, updateUrl, props }) {
    const [users, setUsers] = useState("")
    const [editUsers, setEditUsers] = useState({ nickname: "", profile: "" })
    const [usersSeries, setUsersSeries] = useState("")
    const [success, setSuccess] = useState("")
    const [errors, setErrors] = useState("")
    const [usersErrors, setUsersErrors] = useState("")
    const [seriesCount, setSeriesCount] = useState("")
    const { redirect } = useRedirect({history: props.history})

    const handleChange = e => {
        const { name, value } = e.target
        setEditUsers({
            ...editUsers,
            [name]: value
        })
    }

    useEffect(() => {
        let mount = true
        const getUserItems = () => {
            axios[method](url, { withCredentials: true })
                .then(response => {
                    let res = response.data
                    let ok = res.status === 200
                    if (mount && ok && res.keyword === "show_of_user") {
                        setUsers(res.user)
                        setUsersSeries(res.users_series)
                        setSeriesCount(res.series_count)
                    } else if (mount && ok && res.keyword === "edit_of_user") {
                        setEditUsers(res.user)
                    } else if (mount && res.status === 401) {
                        setUsersErrors(res.errors)
                    } else if (mount && res.status === 500) {
                        setUsersErrors(res.errors)
                    }
                })
                .catch(err => console.log(err))
        }
        getUserItems()
        return () => { mount = false }
    }, [method, url])


    const handleSubmit = e => {
        e.preventDefault()
        axios[updateMethod](updateUrl, { user: editUsers }, { withCredentials: true })
            .then(response => {
                console.log(response)
                let res = response.data
                if (res.status === "ok" && res.keyword === "update_of_user") {
                    console.log("ok")
                    console.log(res.successful, res.user_id)
                    setSuccess(res.successful)
                    setTimeout(() => redirect(`/users/${res.user_id}`), 2000)
                } else if (res.status === "unprocessable_entity" || res.status === 401) {
                    setErrors(res.errors)
                }
            }).catch(err => console.log(err))
        setErrors("")
        setSuccess("")
    }

    return {
        users,
        editUsers,
        usersSeries,
        usersErrors,
        seriesCount,
        handleChange,
        handleSubmit,
        success,
        errors
    }

}

export default useFetchUserItems
