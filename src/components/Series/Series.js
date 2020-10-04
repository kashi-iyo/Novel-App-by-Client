import React from 'react'
import { Link } from 'react-router-dom'
import SeriesTags from './SeriesTags/SeriesTags'
import './Series.css'

function Series(props) {
    const seriesId = props.items.id
    const seriesTitle = props.items.series_title
    const seriesDescription = props.items.series_description
    const author = props.items.author
    const release = props.items.release

    const handleNovel = () => {
        return (
                <div className="Series">
                    <div className="Series__top">
                        <div className="Series__title">
                        <Link to={`/novel_series/${seriesId}`} className="Series__titleLink" >{seriesTitle}</Link>
                        </div>
                        <div className="Series__WriterWrapper">
                            <div className="Series__writer">作者:
                                <Link className="Series__writerName"> {author}</Link>
                            </div>
                            <div className="Series__count">
                                （全 {props.items.count} 話）
                            </div>
                        </div>
                    </div>
                    <div className="Series__center">
                        <div className="Series__description">{seriesDescription}</div>
                    </div>
                    <div className="Series__bottom">
                        <div className="Series__favorites">お気に入り数: <Link>5</Link></div>
                        <div className="Series__comments">コメント数: <Link>5</Link></div>
                    </div>
                    <div className="Series__tagWrap">
                        <ul className="Series__tagUl">
                            <SeriesTags {...props} seriesId={seriesId} />
                        </ul>
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

export default Series
