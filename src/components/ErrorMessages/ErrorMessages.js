import React from 'react'

import './ErrorMessages.css'

function ErrorMessages(props) {
    const errors = props.errors

    const handleErrors = (errors) => {
        return (
          <div className="Errors">
            {errors}
            <p>3秒後にページがリダイレクトされます。</p>
          </div>
        )
    }

    return (
        <div>
            {handleErrors(errors)}
        </div>
    )
}

export default ErrorMessages
