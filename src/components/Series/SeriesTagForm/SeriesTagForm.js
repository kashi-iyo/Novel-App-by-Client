import React from 'react'
import CancelIcon from '@material-ui/icons/Cancel'
import './SeriesTagForm.css'

function InputTag(props) {

    return (
        <div className="tags-input">
            <h3>タグ追加</h3>
            <input
                type="text"
                placeholder="追加したいタグを入力後、Enterを押して登録"
                onKeyUp={e => (e.key === 'Enter' ? props.addTags(e) : null)}
            />
            <ul className="tagsul">
                {props.tags &&
                    props.tags.map((tag, index) => (
                        <li key={index} className="tagli">
                            <span className="tag">{tag}</span>
                            <CancelIcon fontSize="small" className="cancel"
                                onClick={() => props.removeTags(index)}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default InputTag
