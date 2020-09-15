import React from 'react'

// Railsからのerrors.full_messagesをレンダリングする。
export default function validateSaveUser(errors) {
    const handleSaveErrors = () => {
        return (
            <div>
                <ul>
                    {
                        errors.map(error => {
                            return <li className="error" key={error}>{error}</li>
                        })
                    }
                </ul>
            </div>
        )
    }

    return (
        <div>
            {errors? handleSaveErrors() : null}
        </div>
    )
}