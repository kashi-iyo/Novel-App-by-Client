import React from 'react'
import { Link } from 'react-router-dom'

import './ErrorMessages.css'

// アクセスエラーor非公開エラーにより条件分岐
function ErrorMessages({errors, errorType}) {
    return (
        <React.Fragment>
            {errorType === "errors" && <div>
                <div className="Errors">
                    <p className="Errors__access">{errors}</p>
                </div>
            </div>}
            {errorType === "series-create" &&
            <div className="error-messages--series-create-wrapper">
                <p className="error-messages--series-create">
                    作品を投稿するには、ログインまたは新規登録が必要です。
                </p>
                <Link to={`/login`}>
                    ログインはコチラから
                </Link>
                <Link to={`/signup`}>
                    新規登録はコチラから
                </Link>
            </div>
            }
        </React.Fragment>
    )
}

export default ErrorMessages
