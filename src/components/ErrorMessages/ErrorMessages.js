import React from 'react'

import './ErrorMessages.css'

// アクセスエラーor非公開エラーにより条件分岐
function ErrorMessages(props) {

    return (
        <div>
            <div className="Errors">
                <p className="Errors__access">{props.errors}</p>
            </div>
        </div>
    )
}

export default ErrorMessages
