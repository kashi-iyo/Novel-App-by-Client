import React from 'react'
import classNames from 'classnames'
import {Link} from 'react-router-dom'

import '../Series.css'
import './SeriesForm.css'
import useItemsInput from '../../CustomHooks/NovelsHooks/useItemsInput'
import Flash from '../../CustomHooks/Flash/Flash'
// import validateSeriesForm from '../../CustomHooks/ValidateHooks/validateNovels/validateSeriesForm'
// import useLoggedIn from '../../CustomHooks/AuthHooks/useLoggedIn'

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
            props: props,               // historyなど
            url: props.url,             // Railsのルーティング
            method: props.method,        // HTTPリクエスト
            mounted: props.mounted,     // マウントの値
            setMount: props.setMount,   // マウントの値をセット
            formType: props.formType,   // craete or edit
            dataType: props.dataType,   // series or novel
            sendItems: props.novelSeries    // 編集用データ
        })

    const title = values.series_title
    const description = values.series_description
    const tLength = title ? title.length : 0
    const dLength = description ? description.length : 0
    const id = props.match.params.id

    // フィールドに入力された字数によりクラス名を変更する
    const titleClass = classNames("ok", { "over": tLength > 50, "no": tLength === 0 })
    const descriptionClass = classNames("ok", { "over": dLength > 300 })
    const buttonClass = classNames("button", { "noButton": tLength > 50 || tLength === 0 || dLength > 300 })

    return (
        <React.Fragment>
            <Flash Success={itemSuccess} Errors={itemErrors} />
            <div className="SeriesForm">
                {/* ボタンの文字列によって表示を切り替える */}
                <div className="FormHeader">
                    {
                        props.button === "作成する" ?
                            <h3>╋シリーズ作成</h3> :
                            <h3>╋シリーズ編集</h3>
                    }
                    {
                        props.formType === "edit" ?
                        <div className="SeriesForm__SeriesPage">
                            <Link to={`/novel_series/${id}`}>シリーズ管理画面へ戻る</Link>
                        </div> :
                        null
                    }
                </div>

                {/* ボタンの文字列によってイベントを切り替える */}
                <form onSubmit={handleSubmit}>

                    {/* シリーズタイトル */}
                    <div className="TitleWrapper">
                        {title ? null : <span className={titleClass}>【入力必須】</span>}
                        <label htmlFor="series_title" className="Title">シリーズタイトル</label>
                        <span className={titleClass}>
                            {tLength}／50文字
                            {tLength > 50 ?
                                <span className={titleClass}>【50文字以内で入力してください】</span> :
                                null
                            }
                        </span>
                        <input
                            type="text"
                            placeholder="タイトル"
                            id="series_title"
                            name="series_title"
                            className="SeriesForm_title"
                            value={title}
                            onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    {/* ========== */}

                    {/* シリーズあらすじ */}
                    <div className="DescriptionWrapper">
                        <label htmlFor="series_description" className="Description">
                            あらすじ
                        </label>
                        <span className={descriptionClass}>
                            {dLength}／300文字
                            {dLength > 300 ?
                                <span className={descriptionClass}>
                                    【300文字以内で入力してください】
                                </span> :
                                null
                            }
                        </span>
                        <textarea
                            placeholder="あらすじ"
                            name="series_description"
                            id="series_description"
                            className="SeriesForm_description"
                            value={description}
                            onChange={handleChange}
                        />
                    </div>
                    {/* ========== */}

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
