import React from 'react'
import { Link } from 'react-router-dom'
import TagsWrapper from '../Tags/TagsWrapper/TagsWrapper'
import './Series.css'

// 1つのシリーズを表示
function Series({seriesId, author, commentsCount, favoritesCount, release, description, title, novelsCount, tags, seriesUserId}) {

    const handleNovel = () => {
        return (
            <div className="Series">
                <div className="Series__top">
                    <div className="Series__title">
                        <Link to={`/novel_series/${seriesId}`} className="Series__titleLink" >
                            {!release && <span>【非公開中】</span>}
                            {title}
                        </Link>
                    </div>
                    {author && <div className="Series__WriterWrapper">
                        <div className="Series__writer">作者:
                            <Link to={`/users/${seriesUserId}`} className="Series__writerName">
                                {author}
                            </Link>
                        </div>
                        <div className="Series__count">
                            （全 {novelsCount} 話）
                        </div>
                    </div>}
                </div>
                {description && <div className="Series__center">
                    <div className="Series__description">{description}</div>
                </div>}
                <div className="Series__bottom">
                    <div className="Series__favorites">お気に入り総数:
                        <span>{favoritesCount}</span>
                    </div>
                    <div className="Series__comments">コメント総数:
                        <span>{commentsCount}</span>
                    </div>
                </div>
                <div className="Series__tagWrap">
                    <TagsWrapper tags={tags} dataType="series" />
                </div>
            </div>
        )
    }

    return (
        <div>
            {handleNovel()}
        </div>
    )
}

export default Series
