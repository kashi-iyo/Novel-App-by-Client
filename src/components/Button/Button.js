import React from 'react'
import classNames from 'classnames'
import './Button.css'

function Button({ handleSubmit, badCase, buttonValue}) {
    const buttonClass = classNames("buttonOn", { "buttonOff": badCase })

    return (
        <React.Fragment>
            <button
                type="button"
                onClick={badCase ? null : handleSubmit}
                className={buttonClass}
            >
                {buttonValue}
            </button>
            {
                badCase && <p className="button-required-error">必須な項目の入力を行なってください。</p>
            }
        </React.Fragment>
    )
}

export default Button
