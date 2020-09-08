import React from 'react'

import './ErrorMessages.css'

function ErrorMessages(props) {
    const releaseErrors = props.releaseErrors
    const accessErrors = props.accessErrors
    const loggedInStatus = props.loggedInStatus

    // 非公開エラー
    const handleReleaseErrors = () => {
        return (
            <div className="Errors">
                <p className="Errors__release">{releaseErrors}</p>
                <p>（3秒後に、ホーム画面へリダイレクトされます。）</p>
            </div>
        )
    }

    // アクセスエラー
    const handleAccessErrors = () => {
        return (
            <div className="Errors">
                <p className="Errors__access">{accessErrors}</p>
                {loggedInStatus ?
                    <p>（3秒後に、ホームへリダイレクトされます。）</p> :
                    <p>（3秒後に、ログインページへリダイレクトされます。）</p>
                }
            </div>
        )
    }

    // アクセスエラーor非公開エラーにより条件分岐
    const errorsRender = () => {
        if (accessErrors) {
            return (
                <div>
                    {handleAccessErrors(accessErrors)}
                </div>
            )
        } else if (releaseErrors) {
            return (
                <div>
                    {handleReleaseErrors(releaseErrors)}
                </div>
            )
        }
    }

    return (
        <div>
            {errorsRender()}
        </div>
    )
}

export default ErrorMessages
