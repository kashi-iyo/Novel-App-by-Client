import React from 'react'
import { Link } from 'react-router-dom'

import './Novels.css'

function Novels(props) {
    const novelTitle = props.novel.novel_title
    const novelId = props.novel.id
    const release = props.novel.release
    const novelAuthor = props.novel.author  // 小説作者

    const user = props.user  // ログインユーザー
    const novelSeriesId = props.match.params.id    // シリーズのパラメータ

    const handleChangeNovelsRenderer = () => {
        // 公開&ログインユーザーと作者が等しい場合
        if (release && user === novelAuthor) {
            return (
                <div>
                    <span className="Novels__Link">{novelId}.</span>
                    <Link to={`/novels_series/${novelSeriesId}/novels/${novelId}`} className="Novels__Link">
                        {`【公開中】${novelTitle}`}
                    </Link>
                </div>
            )
        // 非公開だがログインユーザーと作者が等しい場合
        } else if (!release && user === novelAuthor) {
            return (
                <div>
                    <span className="Novels__Link">{novelId}.</span>
                    <Link to={`/novels_series/${novelSeriesId}/novels/${novelId}`} className="Novels__Link">
                        {`【非公開中】${novelTitle}`}
                    </Link>
                </div>
            )
        // 公開されている場合
        } else if (release) {
            return (
                <div>
                    <span className="Novels__Link">{novelId}.</span>
                    <Link to={`/novels_series/${novelSeriesId}/novels/${novelId}`} className="Novels__Link">
                        {`${novelTitle}`}
                    </Link>
                </div>
            )
        // 非公開になっている場合
        } else if (!release) {
            return (
                <div>
                    <span className="Novels__Link">{novelId}.</span>
                    <span className="Novels__Unrelease">この作品は現在非公開になっています。</span>
                </div>
            )
        }
        props.setIsMounted(false)
    }

    // 小説1話分をのタイトルリンクをレンダリングする
    const handleNovelsRenderer = () => {
        return (
            <div>
                <div className="Novels">
                    <ul className="Novels__Ul">
                        <li className="Novels__Li">
                            {handleChangeNovelsRenderer()}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* 小説1話分のタイトルを表示 */}
            {handleNovelsRenderer()}
        </div>
    )
}

export default Novels
