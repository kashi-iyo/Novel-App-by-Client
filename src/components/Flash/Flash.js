import React from 'react'
import './Flash.css'

function Flash({Success, Errors}) {
    return (
        <div>
            {Success &&
                <div className="SuccessWrapper">
                    <p className="SuccessFlash">{Success}</p>
                </div>
            }
            {Errors &&
                <div className="ErrorsWrapper">
                    <p className="ErrorsFlash">{Errors}</p>
                </div>
            }
        </div>
    )
}

export default Flash
