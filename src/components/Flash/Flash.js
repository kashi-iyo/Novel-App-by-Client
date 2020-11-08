import React from 'react'
import './Flash.css'

// フラッシュメッセージの表示
function Flash({ flashMessages }) {
    console.log("Flash: 表示")
    const success = flashMessages && flashMessages.success
    const errors = flashMessages && flashMessages.errors

    return (
        <React.Fragment>
            {success &&
                <div className="flash">
                    <div className="flash--success-wrapper">
                        <p className="flash--success">{success}</p>
                    </div>
                </div>
            }
            {errors &&
                <div className="flash">
                    <div className="flash--errors-wrapper">
                        <p className="flash--errors">{errors}</p>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default Flash
