import React from 'react'
import './RemoveFeatures.css'

function RemoveFeatures({ theme, author, currentUser, handleClick, confirmation, handleOkRemove, handleNoRemove }) {

    return (
        <div>
            {/* 削除ボタン */}
            {author === currentUser &&
                <div className="removeButton">
                    <button onClick={handleClick} className="button ">
                        この{theme}を削除する
                    </button>
                </div>
            }
            {/* 削除確認もーだる */}
            <div className="SeriesFeed__RemoveWrapper">
                {
                    confirmation &&
                    <div className="removeModal">
                        <p className="removeModal__Message">{confirmation}</p>
                        <input type="button" className="okRemove" onClick={handleOkRemove} value="はい" />
                        <input type="button" className="noRemove" onClick={handleNoRemove} value="いいえ" />
                    </div>
                }
            </div>
        </div>
    )
}

export default RemoveFeatures
