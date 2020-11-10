import React from 'react'
import './RemoveFeatures.css'

function RemoveFeatures({ theme, authorId, currentUserId, handleClick, confirmation, handleOkRemove, handleNoRemove }) {

    return (
        <React.Fragment>
            < div className = "remove-features" >
                {/* 削除ボタン */ }
                {authorId === currentUserId &&
                    <div className="remove-features--remove-button">
                        <button onClick={handleClick} className="button ">
                            この{theme}を削除する
                                </button>
                    </div>
                }
                {/* 削除確認もーだる */ }
                {confirmation &&
                    <div className="remove-features--remove-modal-wrapper">
                        <div className="remove-features--remove-modal">
                            <p className="remove-features--remove-modal-message">{confirmation}</p>
                            <div className="remove-features--remove-modal-button-wrapper">
                                <input
                                    type="button" className="remove-features--remove-modal-ok" onClick={handleOkRemove}
                                    value="はい"
                                />
                                <input
                                    type="button" className="remove-features--remove-modal-no" onClick={handleNoRemove}
                                    value="いいえ"
                                />
                            </div>
                        </div>
                    </div>
                }
            </div >
        </React.Fragment>
    )
}

export default RemoveFeatures
