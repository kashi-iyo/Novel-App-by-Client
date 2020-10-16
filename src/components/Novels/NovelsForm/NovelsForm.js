import React from 'react'
import classNames from 'classnames'
import {Link} from 'react-router-dom'

import '../../Series/Series.css'
import './NovelsForm.css'
import useItemsInput from '../../../CustomHooks/NovelsHooks/useItemsInput'
import Flash from '../../Flash/Flash'

// シリーズ作成フォームを作成
function SeriesForm(props) {
    // method: HTTPリクエスト, url: Railsのルーティング, mount: マウント処理, sendItems: EditItemsから渡されるデータ
    // props: historyなどの取得のため
    const {
        values,
        release,
        itemSuccess,
        itemErrors,
        handleChange,
        handleSubmit,
        handleStatusChange,
        } =
        useItemsInput({
            props: props,
            url: props.url,
            method: props.method,
            mounted: props.mounted,
            setMount: props.setMount,
            formType: props.formType,
            dataType: props.dataType,
            sendItems: props.novels,
        })

    const title = values.novel_title
    const description = values.novel_description
    const content = values.novel_content
    const tLength = title ? title.length : 0
    const dLength = description ? description.length : 0
    const cLength = content ? content.length : 0

    // フィールドに入力された字数によりクラス名を変更する
    const titleClass = classNames("ok", { "over": tLength > 50, "no": tLength === 0 })
    const descriptionClass = classNames("ok", { "over": dLength > 300 })
    const contentClass = classNames("ok", { "no": cLength === 0 })
    const buttonClass = classNames("button", { "noButton": tLength > 50 || tLength === 0 || dLength > 300 })

    return (
        <React.Fragment>
            <Flash Success={itemSuccess} Errors={itemErrors} />
            <div className="SeriesForm">
            {/* ボタンの文字列によって表示を切り替える */}
            <div className="FormHeader">
                {
                    props.button === "追加する" ?
                        <h3>╋小説追加</h3> :
                        <h3>╋小説編集</h3>
                }
                <div className="SeriesForm__SeriesPage">
                    <Link to={`/novel_series/${props.seriesId}`}>シリーズ管理画面へ戻る</Link>
                </div>
                {props.formType === "edit" && <div className="SeriesForm__NovelsPage">
                    <Link to={`/novel_series/${props.seriesId}/novels/${props.novelsId}`}>小説管理画面へ戻る</Link>
                </div>}
            </div>

            {/* ボタンの文字列によってイベントを切り替える */}
            <form onSubmit={handleSubmit}>

                {/*タイトル */}
                <div className="TitleWrapper">
                    {tLength === 0 && <span className={titleClass}>【入力必須】</span>}
                    <label htmlFor="novels_title" className="Title">タイトル</label>
                    <span className={titleClass}>
                        {tLength}／50文字
                        {tLength > 50 && <span className={titleClass}>【50文字以内で入力してください】</span> }
                    </span>
                    <input
                        type="text"
                        placeholder="タイトル"
                        id="novels_title"
                        name="novel_title"
                        className="SeriesForm_title"
                        value={title}
                        onChange={handleChange}
                    />
                </div>
                <br></br>
                {/* ========== */}

                {/* 前書き */}
                <div className="DescriptionWrapper">
                    <label htmlFor="novels_description" className="Description">前書き</label>
                    <span className={descriptionClass}>
                        {dLength}／300文字
                        { dLength > 300 && <span className={descriptionClass}>【300文字以内で入力してください】</span> }
                    </span>
                    <textarea
                        placeholder="前書き"
                        id="novels_description"
                        name="novel_description"
                        className="SeriesForm_description"
                        value={description}
                        onChange={handleChange}
                    />
                </div>
                {/* ========== */}

                {/* 内容 */}
                <div className="ContentWrapper">
                    {!cLength && <span className={contentClass}>【入力必須】</span>}
                    <label htmlFor="novels_content" className="Content">
                        本文
                    </label>
                    <span className={contentClass}>
                        {cLength}文字
                    </span>
                    <textarea
                        placeholder="本文"
                        id="novels_content"
                        name="novel_content"
                        className="content"
                        value={content}
                        onChange={handleChange}
                    />
                </div>

                {/* 公開チェックボックス */}
                <div className="releaseWrapper">
                    <input
                        type="checkbox"
                        name="release"
                        id="release"
                        className="release"
                        checked={release}
                        onChange={handleStatusChange}
                    />
                    <label htmlFor="release" className="releaseLabel">公開する</label>
                </div>
                {/* ========== */}
                <button type="submit" className={buttonClass}>{props.button}</button>
            </form>
            </div>
        </React.Fragment>
    )
}

export default SeriesForm