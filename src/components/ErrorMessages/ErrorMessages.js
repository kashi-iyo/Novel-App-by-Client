import React from 'react'

import './ErrorMessages.css'

function ErrorMessages(props) {
    const releaseErrors = props.releaseErrors
    const errors = props.errors

    // 非公開エラー
    const handleReleaseErrors = (releaseErrors) => {
        return (
            <div className="Errors">
                <p className="Errors__release">{releaseErrors}</p>
                <p>3秒後に、ホーム画面へリダイレクトされます。</p>
            </div>
        )
    }

    // アクセスエラー
    const handleAccessErrors = (errors) => {
        return (
            <div className="Errors">
                <p className="Errors__access">{errors}</p>
                <p>3秒後に、ログインページへリダイレクトされます。</p>
            </div>
        )
    }

    // アクセスエラーor非公開エラーにより条件分岐
    const errorsRender = () => {
        if (errors) {
            return (
                <div>
                    {handleAccessErrors(errors)}
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
            {errorsRender(errors)}
        </div>
    )
}

export default ErrorMessages
