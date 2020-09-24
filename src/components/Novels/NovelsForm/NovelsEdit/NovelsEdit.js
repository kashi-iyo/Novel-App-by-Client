import React from 'react'
import useLoggedIn from '../../../CustomHooks/Auth/useLoggedIn'

import useFetchEditItems from '../../../CustomHooks/NovelsHooks/useFetchEditItems'
import ErrorMessages from '../../../ErrorMessages/ErrorMessages'
import NovelsForm from '../NovelsForm'


function NovelsEdit(props) {
    const url = props.match.url
    const { loggedInStatus, currentUser } = useLoggedIn()
    const { items, paramId, errors, mounted, setMount } = useFetchEditItems({
        method: "get",
        url: `http://localhost:3001/api/v1${url}`,
        props: props
    })
    const seriesId = paramId.seriesId
    const novelsId = paramId.novelsId
    console.log(props)

    // 編集フォームをレンダリングする
    const novelsEditForm = () => {
        return (
            <div className='seriesEdit'>

                {/* 小説一覧 */}
                {/* <Link to="/novels">このシリーズの小説一覧</Link><br></br> */}

                {
                    items
                    &&
                    <NovelsForm {...props}
                        method="patch"
                        url={`http://localhost:3001/api/v1//novel_series/${seriesId}/novels/${novelsId}`}
                        novels={items}
                        paramId={paramId}
                        seriesId={seriesId}
                        novelsId={novelsId}
                        mounted={mounted}
                        setMount={setMount}
                        currentUser={currentUser}
                        formType="edit"
                        dataType="novel"
                        button="編集を完了する"
                    />
                }
            </div>
        )
    }

    // ログインユーザーと作者が一致しており尚且つエラーの存在しない場合に、編集フォームを表示
    const renderer = () => {
        if (!loggedInStatus || errors) {
            return <ErrorMessages errors={errors} loggedInStatus={loggedInStatus} />
        } else if (currentUser !== items.author) {
            return <ErrorMessages errors={errors} loggedInStatus={loggedInStatus} />
        } else if (currentUser === items.author) {
            return novelsEditForm()
        }
    }

    return (
        <div>
            {renderer()}
        </div>
    )
}

export default NovelsEdit
