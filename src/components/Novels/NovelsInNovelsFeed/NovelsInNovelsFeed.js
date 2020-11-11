import React from 'react'
import Novels from '../Novels'
import './NovelsInFeed.css'

// Novels.jsに投稿データを渡す
function NovelsInNovelsFeed({novel, userId}) {
    return (
        <React.Fragment>
            {novel ?
                novel.map(novel => (
                    <Novels
                        key={novel.id}
                        novelId={novel.id}
                        novelTitle={novel.novel_title}
                        release={novel.release}
                        seriesId={novel.novel_series_id}
                        novelUserId={novel.user_id}
                        userId={userId}
                    />
                )) : null
            }
        </React.Fragment>
    )
}

export default NovelsInNovelsFeed
