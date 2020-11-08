import React from 'react'
import classNames from 'classnames'
import './ValidateWordsCounts.css'

function ValidateWordsCounts({ wordsLength, upperLimit, isRequire}) {
    const requireInput = classNames("ok", { "over": wordsLength > upperLimit || wordsLength === 0 })
    const notRequirementInput = classNames("ok", { "over": wordsLength > upperLimit })

    return (
        <React.Fragment>
            <span
                className={!!isRequire ? requireInput : notRequirementInput}
            >
                {wordsLength}／{upperLimit}文字
                {wordsLength > upperLimit ?
                    <span className={requireInput}>【{upperLimit}文字以内で入力してください】</span> :
                    null
                }
            </span>
        </React.Fragment>
    )
}

export default ValidateWordsCounts
