import React from 'react'

// Railsからのerrors.full_messagesをレンダリングする。
export default function validateSaveUser(errors) {

    return (
        <React.Fragment>
            <ul>
                {
                    errors.map(error => {
                        return <li className="error" key={error}>{error}</li>
                    })
                }
            </ul>
        </React.Fragment>
    )
}