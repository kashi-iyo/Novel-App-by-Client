import React from 'react'

import './ErrorMessages.css'

function ErrorMessages(props) {
    const errors = props.errors
    const loggedInStatus = props.loggedInStatus

    // アクセスエラーor非公開エラーにより条件分岐
    const errorsRender = () => {
        if (errors && !loggedInStatus) {
            return (
                <div className="Errors">
                    <p className="Errors__access">{errors}</p>
                    <p className="Errors__access">2秒後にページが遷移されます。</p>
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
