import React from 'react'
import { Link } from 'react-router-dom'
import './UsersOneSeries.css'

// ユーザーページに表示するシリーズ1件
function UsersOneSeries({seriesId, seriesTitle, author, release}) {
    const handleNovel = () => {
        return (
            <div className="Series">
                <div className="Series__top">
                    <div className="Series__title">
                    <Link to={`/novel_series/${seriesId}`} className="Series__titleLink UsersSeries__titleLink" >{seriesTitle}</Link>
                    </div>
                    <div className="Series__WriterWrapper">
                        <div className="Series__writer">作者:
                            <Link className="Series__writerName"> {author}</Link>
                        </div>
                    </div>
                </div>
                <div className="Series__bottom">
                    <div className="Series__favorites">お気に入り数: <Link>5</Link></div>
                    <div className="Series__comments">コメント数: <Link>5</Link></div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {release ? handleNovel() : null}
        </div>
    )
}

export default UsersOneSeries
