import React, {useState} from 'react'

import NovelsForm from '../NovelsForm'

import ErrorMessages from '../../../ErrorMessages/ErrorMessages'
import useLoggedIn from '../../../CustomHooks/Auth/useLoggedIn'

function NovelsCreate(props) {
    const { loggedInStatus, currentUser } = useLoggedIn()
    const [mounted, setMount] = useState(true)
    const id = props.match.params.id

    console.log(id)
    const novelsCreateForm = () => {
        return (
            <div className="novelsCreate">
                <NovelsForm
                    {...props}
                    method="post"
                    url={`http://localhost:3001/api/v1/novel_series/${id}/novels`}
                    mounted={mounted}
                    setMount={setMount}
                    currentUser={currentUser}
                    formType="create"
                    dataType="novel"
                    button="追加する"
                />
            </div>
        )
    }

    return (
        <div>
            {
                loggedInStatus ?
                    novelsCreateForm() :
                    <ErrorMessages
                        {...props}
                        accessErrors={"アクセス権限がありません。"} />
            }
        </div>
    )
}

export default NovelsCreate
