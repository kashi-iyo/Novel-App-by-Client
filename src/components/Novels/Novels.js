import React from 'react'
import { Link } from 'react-router-dom'
import useLoggedIn from '../CustomHooks/Auth/useLoggedIn'

import './Novels.css'

function Novels(props) {
    const {user} = useLoggedIn
    const novelTitle = props.novel.novel_title
    const novelId = props.novel.id
    const release = props.novel.release
    const novelAuthor = props.novel.author  // 小説作者
    const novelSeriesId = props.match.params.id    // シリーズのパラメータ
    const oneNovelUrl = `/novel_series/${novelSeriesId}/novels/${novelId}`    // 小説1話分へのURL

    // 公開されているかどうか、また作者かどうかで小説の表示を切り替える
    const handleChangeNovelsRenderer = () => {
        // 公開&ログインユーザーと作者が等しい場合
        if (release && user === novelAuthor) {
            return (
                <div className="Novels__Link">
                    <span>{novelId}.</span>
                    <Link to={oneNovelUrl}>
                        {`【公開中】${novelTitle}`}
                    </Link>
                </div>
            )
        // 非公開だがログインユーザーと作者が等しい場合
        } else if (!release && user === novelAuthor) {
            return (
                <div className="Novels__Link">
                    <span>{novelId}.</span>
                    <Link to={oneNovelUrl}>
                        {`【非公開中】${novelTitle}`}
                    </Link>
                </div>
            )
        // 公開されている場合
        } else if (release) {
            return (
                <div className="Novels__Link">
                    <span>{novelId}.</span>
                    <Link to={oneNovelUrl}>
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
