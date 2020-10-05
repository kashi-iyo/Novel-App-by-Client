import React from 'react'
import CancelIcon from '@material-ui/icons/Cancel'
import './SeriesTagForm.css'

// タグ追加用フォーム
function InputTag({ tags, addTags, removeTags, tagTitle, limitErrors }) {

    return (
        <div className="tags-input">
            <h3>{tagTitle}</h3>
            <input
                type="text"
                placeholder="追加したいタグを入力後、Enterを押して登録"
                onKeyUp={e => (e.key === 'Enter' ? addTags(e) : null)}
            />
            <ul className="tagsul">
                {tags &&
                    tags.map((tag, index) => (
                        <li key={index} className="tagli">
                            <span className="tag">{tag}</span>
                            <CancelIcon fontSize="small" className="cancel"
                                onClick={() => removeTags(index)}
                            />
                        </li>
                    ))
                }
            </ul>
            {limitErrors && <p className="error limitErrors">タグが5個以上登録されてしまっています。</p>}
        </div>
    )
}

export default InputTag
