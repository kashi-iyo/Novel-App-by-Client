import React from 'react'
import { Link } from 'react-router-dom'

import './Series.css'

function Series(props) {
    const seriesTitle = props.items.series_title
    const seriesDescription = props.items.series_description
    const author = props.items.author
    const seriesId = props.items.id
    const release = props.items.release

    const handleNovel = () => {
        return (
            <div className="Novel">
                <div className="Novel__top">
                    <div className="Novel__title">
                        <Link to={`novel_series/${seriesId}`} className="Novel__titleLink" >{seriesTitle}</Link>
                    </div>
                    <div className="Novel__writer">作者:
                        <Link className="Novel__writerName"> {author}</Link>
                    </div>
                </div>
                <div className="Novel__center">
                    <div className="Novel__description">{seriesDescription}</div>
                </div>
                <div className="Novel__bottom">
                    <div className="Novel__reviews">評価数: <Link>5</Link></div>
                    <div className="Novel__favorites">お気に入り数: <Link>5</Link></div>
                    <div className="Novel__comments">コメント数: <Link>5</Link></div>
                </div>
                <div className="Novel__tagWrap">
                    <ul className="Novel__tagUl">
                        <li className="Novel__tagLi"><Link className="Novel__tagLink">タグ</Link></li>
                        <li className="Novel__tagLi"><Link className="Novel__tagLink">タグ</Link></li>
                        <li className="Novel__tagLi"><Link className="Novel__tagLink">タグ</Link></li>
                    </ul>
                </div>
            </div >
        )
    }

    return (
        <div>
            {release ? handleNovel() : null}
        </div>
    )
}

export default Series
