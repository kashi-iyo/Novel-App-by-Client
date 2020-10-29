import React from 'react'

import './ErrorMessages.css'

// アクセスエラーor非公開エラーにより条件分岐
function ErrorMessages({errors}) {

    return (
        <div>
            <div className="Errors">
                <p className="Errors__access">{errors}</p>
            </div>
        </div>
    )
}

export default ErrorMessages
