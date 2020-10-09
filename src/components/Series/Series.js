import React from 'react'
import { Link } from 'react-router-dom'
import useFetchItems from '../CustomHooks/NovelsHooks/useFetchItems'
import SeriesTags from '../Tags/SeriesTags/SeriesTags'
import './Series.css'

// 1つのシリーズを表示
function Series({props, userId, id, title, description, author, release, count}) {
    const { favoritesCount } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1/series_has_favorites/${id}`
    })

    const handleNovel = () => {
        return (
            <div className="Series">
                <div className="Series__top">
                    <div className="Series__title">
                    <Link to={`/novel_series/${id}`} className="Series__titleLink" >{title}</Link>
                    </div>
                    {author && <div className="Series__WriterWrapper">
                        <div className="Series__writer">作者:
                            <Link to={`/users/${userId}`} className="Series__writerName">
                                {author}
                            </Link>
                        </div>
                        <div className="Series__count">
                            （全 {count} 話）
                        </div>
                    </div>}
                </div>
                {description && <div className="Series__center">
                    <div className="Series__description">{description}</div>
                </div>}
                <div className="Series__bottom">
                <div className="Series__favorites">お気に入り総数:
                    <span>{String(favoritesCount)}</span>
                </div>
                <div className="Series__comments">コメント数:
                    </div>
                </div>
                <div className="Series__tagWrap">
                    {/* シリーズが所有するタグ */}
                    <ul className="Series__tagUl">
                        <SeriesTags {...props} seriesId={id} />
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
