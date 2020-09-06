import React, { useState } from 'react'
import axios from 'axios'
import classNames from 'classnames'

function SeriesForm(props) {
    const [errors, setErrors] = useState("")
    const [successMessages, setSuccessMessages]= useState("")
    const seriesTitle = props.seriesTitle
    const seriesDescription = props.seriesDescription
    const path = props.path

    // Railに渡すデータ
    const series = {
        novel_series: {
            series_title: props.seriesTitle,
            series_description: props.seriesDescription,
            author: props.user.nickname
        }
    }

    // リダイレクト
    const redirect = (location) => {
        props.history.push(location)
    }

    // シリーズ作成
    const handleSeriesCreate = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3001/api/v1/novel_series',
            series,
            { withCredentials: true }
        )
            .then(response => {
                if (response.data.status === 'created') {
                    redirect(response.data.location)
                    setSuccessMessages(response.data.success_messages)
                } else {
                    setErrors(response.data.errors)
                }
            }).catch(error => console.log(error))
    }

    // シリーズ編集
    const handleSeriesEdit = (e) => {
        e.preventDefault()

        axios.patch(`http://localhost:3001${path}`,
            series,
            { withCredentials: true }
        )
            .then(response => {
                if (response.data.status === 'ok') {
                    setSuccessMessages(response.data.successful)
                    redirect(response.data.location)
                    setErrors("")
                } else if (response.data.status === 'unprocessable_entity') {
                    setErrors(response.data.errors)
                    redirect(response.data.location)
                    setSuccessMessages("")
                }
            }).catch(error => console.log(error))
    }

    // 字数によりクラス名を変更する
    const titleClass = classNames("ok", { "no": seriesTitle.length > 50 })
    const descriptionClass = classNames("ok", { "no": seriesDescription.length > 300 })

    return (
        <div>
            <form onSubmit={props.button === "作成する" ? handleSeriesCreate : handleSeriesEdit}>
                { successMessages ?
                    <p className="success">{successMessages}</p> :
                    null
                }
                { errors ?
                    <p className="error">{errors}</p> :
                    null
                }
                <div className="TitleWrapper">
                    <span className="Title">シリーズタイトル</span>
                    <span className={titleClass}>
                        {seriesTitle.length}／50文字
                        {seriesTitle.length > 50 ?
                            <p className="no">50文字以内で入力してください。</p> :
                            null
                        }
                    </span>
                </div>
                <input
                    type="text"
                    placeholder="シリーズタイトル"
                    name="series_title"
                    className="series_title"
                    value={seriesTitle}
                    onChange={e => props.setSeriesTitle(e.target.value)}
                /> <br></br>

                <div className="DescriptionWrapper">
                    <span className="Description">あらすじ</span>
                    <span className={descriptionClass}>
                        {seriesDescription.length}／300文字
                        {descriptionClass === "no" ?
                            <p className="no">300文字以内で入力してください。</p> :
                            null
                        }
                    </span>
                </div>
                <textarea
                    placeholder="あらすじ"
                    name="series_description"
                    className="series_description"
                    value={seriesDescription}
                    onChange={e => props.setSeriesDescription(e.target.value)}
                />
                
                <button type="submit" className="button">{props.button}</button>
            </form>
        </div>
    )
}

export default SeriesForm
