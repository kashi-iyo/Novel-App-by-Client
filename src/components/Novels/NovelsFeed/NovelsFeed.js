import React from 'react'
import { Link } from 'react-router-dom'

import './NovelsFeed.css'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import NovelsInNovelsFeed from '../NovelsInNovelsFeed/NovelsInNovelsFeed'
import Novels from '../Novels'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import useRemoveItems from '../../CustomHooks/NovelsHooks/useRemoveItems'
import RemoveFeatures from '../../CustomHooks/Remove/RemoveFeatures'
import Flash from '../../CustomHooks/Flash/Flash'
import SeriesTags from '../../Series/SeriesTags/SeriesTags'

function NovelsFeed(props) {
    const params = props.match.params.id
    const { novels, series, errors } = useFetchItems({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_series/${params}`
    })
    const { confirmation, removeErrors, removeSuccess, handleClick, handleOkRemove, handleNoRemove } = useRemoveItems({
        url: `http://localhost:3001/api/v1/novel_series/${params}`,
        keyword: "series",
        history: props.history
    })
    const seriesId = series.id
    const editUrl = `/novel_series/${seriesId}/edit`    //シリーズ編集リンク
    const addUrl = `/novel_series/${seriesId}/add_novels`    //小説追加リンク


    // シリーズデータを表示
    const handleNovelsFeed = () => {
        return (
            <React.Fragment>
                <Flash Success={removeSuccess} Errors={removeErrors} />
                <div className="NovelsFeed">
                    {/* シリーズタイトル・あらすじ */}
                    <div className="SeriesFeed">
                        <div className="SeriesFeed__top">
                            <p className="SeriesFeed__title">{series.series_title}</p>
                            <p className="SeriesFeed__writer">作者:
                                <Link className="SeriesFeed__writerName">{series.author}</Link>
                            </p>
                        </div>
                        <div className="SeriesFeed__center">
                            <p className="SeriesFeed__description">{series.series_description}</p>
                        </div>
                        <div className="SeriesFeed__bottom">
                            <div className="SeriesFeed__favorites">お気に入り数:
                                <Link className="SeriesFeed__Link">5</Link>
                            </div>
                            <div className="SeriesFeed__comments">コメント数:
                                <Link className="SeriesFeed__Link">5</Link>
                            </div>
                        </div>
                        <div className="SeriesFeed__tagWrap">
                            <ul className="SeriesFeed__tagUl">
                                <SeriesTags {...props} seriesId={seriesId} />
                            </ul>
                        </div>
                        {/* ログイン中のユーザーと作者が異なるか、非ログインの場合は編集不可 */}
                        {series.author === props.currentUser && props.loggedInStatus &&
                            <div className="SeriesFeed__editLinkWrap">
                                <React.Fragment>
                                    <Link to={editUrl} className="SeriesFeed__editLink" >
                                        編集する
                                    </Link>
                                    <Link to={addUrl} className="SeriesFeed__addLink">
                                        小説を追加する
                                    </Link>
                                </React.Fragment>
                            </div>
                        }
                    </div>
                    {/* シリーズ内の小説一覧 */}
                    <NovelsInNovelsFeed>
                        {
                            novels ?
                                novels.map(novel => (
                                    <Novels {...props}
                                        key={novel.id}
                                        novel={novel}
                                        currentUser={props.currentUser}
                                    />
                                )) : null
                        }
                    </NovelsInNovelsFeed>
                    <div className="NovelsFeed__BarSpan"></div>
                </div>
                {/* 削除ボタン */}
                <RemoveFeatures
                        theme="シリーズ"
                        author={series.author}
                        currentUser={props.currentUser}
                        handleClick={handleClick}
                        confirmation={confirmation}
                        handleOkRemove={handleOkRemove}
                        handleNoRemove={handleNoRemove}
                    />
            </React.Fragment>
        )
    }

    const handleRenderer = () => {
        // 非公開&ログインユーザーが作者でない場合
        if (!series.release && series.author !== props.currentUser) {
            return <ErrorMessages {...props} errors={errors} />
        // 公開の場合
        } else if (series.release) {
            return handleNovelsFeed()
        }
    }

    return (
        <div>
            {handleRenderer()}
        </div>
    )
}

export default NovelsFeed
