import React from 'react'
import {Link} from 'react-router-dom'

import '../Series.css'
import './SeriesForm.css'
import useItemsInput from '../../../CustomHooks/NovelsHooks/useItemsInput'
import SeriesTagForm from '../SeriesTagForm/SeriesTagForm'
import ValidateWordsCounts from '../../ValidateWordsCounts/ValidateWordsCounts'
import Button from '../../Button/Button'

// シリーズ作成フォームを作成
function SeriesForm({method, url, formType, dataType, history, editSeries, editTags, button, currentUser, seriesId, handleFlashMessages}) {
    const {
        values, tags, addTags, removeTags, release,
        handleFalse, handleChange, handleSubmit, handleStatusChange,
    } = useItemsInput({
            url: url,             // Railsのルーティング
            method: method,        // HTTPリクエスト
            formType: formType,   // craete or edit
            dataType: dataType,   // series or novel
            sendItems: editSeries,    // 編集用データ
            editTags: editTags,    // 編集用タグ
            currentUser: currentUser,    // ログインユーザー
            history: history,    // props.history
            handleFlashMessages: handleFlashMessages // フラッシュメッセージのステートを変更するのに使用
        })
    const title = values.series_title
    const description = values.series_description

    return (
        <React.Fragment>
            <div className="series-form">
                {/* ボタンの文字列によって表示を切り替える */}
                <div className="series-form--header">
                    {
                        button === "作成する" ?
                            <h3 className="caption">シリーズ作成</h3> :
                            <h3 className="caption">シリーズ編集</h3>
                    }
                    {
                        formType === "edit" ?
                        <div className="series-form--back-to-series-page">
                            <Link to={`/novel_series/${seriesId}`}>シリーズ管理画面へ戻る</Link>
                        </div> :
                        null
                    }
                </div>

                {/* ボタンの文字列によってイベントを切り替える */}
                <form onSubmit={e => handleFalse(e)}>

                    {/* シリーズタイトル */}
                    <div className="series-form--title-wrapper">
                        {title ? null : <span className="error">【入力必須】</span>}
                        <label htmlFor="series_title" className="series-form--title-label">シリーズタイトル</label>
                        <ValidateWordsCounts
                            wordsLength={title.length}
                            upperLimit={50}
                            isRequire={true}
                        />
                        <input
                            type="text"
                            placeholder="タイトル"
                            id="series_title"
                            name="series_title"
                            className="series-form--title-input"
                            value={title}
                            onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    {/* ========== */}

                    {/* シリーズあらすじ */}
                    <div className="series-form--descroption-wrapper">
                        <label htmlFor="series_description" className="series-form--description-label">
                            あらすじ
                        </label>
                        <ValidateWordsCounts
                            wordsLength={description.length}
                            upperLimit={300}
                            isRequire={false}
                        />
                        <textarea
                            placeholder="あらすじ"
                            name="series_description"
                            id="series_description"
                            className="series-form--description-input"
                            value={description}
                            onChange={handleChange}
                        />
                    </div>
                    {/* ========== */}

                    {/* タグ追加フォーム */}
                    <SeriesTagForm
                        tags={tags}
                        addTags={addTags}
                        removeTags={removeTags}
                        tagTitle="タグ追加"
                    />

                    {/* 公開チェックボックス */}
                    <div className="release-wrapper">
                        <input
                            type="checkbox"
                            name="release"
                            id="release"
                            className="release-input"
                            checked={release}
                            onChange={handleStatusChange}
                        />
                        <label htmlFor="release" className="release-label">公開する</label>
                    </div>
                    {/* ========== */}

                    <Button
                        handleSubmit={handleSubmit}
                        badCase={
                            title.length === 0 ||
                            title.length > 50 ||
                            description.length > 300 ?
                            true :
                            false
                        }
                        buttonValue={button}
                    />
                </form>
            </div>
        </React.Fragment>
    )
}

export default SeriesForm
