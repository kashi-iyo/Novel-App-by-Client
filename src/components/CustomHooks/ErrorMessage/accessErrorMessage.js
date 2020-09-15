import React from 'react'

export default function accessErrorMessage({ errors, loggedInStatus }) {

    const handleError = () => {
        return (
            <div className="Errors">
                <p className="Errors__access">{errors}</p>
                {loggedInStatus ?
                    <p>（3秒後に、ホームへリダイレクトされます。）</p> :
                    <p>（3秒後に、ログインページへリダイレクトされます。）</p>
                }
            </div>
        )
    }

    return (
        <div>
            {errors ? handleError() : null}
        </div>
    )
}