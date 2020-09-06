import React, {useState} from 'react'

import SeriesForm from '../SeriesForm/SeriesForm'

function SeriesCreate(props) {
    const [seriesTitle, setSeriesTitle] = useState("")
    const [seriesDescription, setSeriesDescription] = useState("")

    return (
        <div className="seriesCreate">
            <h3>シリーズを作成する</h3>

            <SeriesForm {...props}
                seriesTitle={seriesTitle}
                setSeriesTitle={setSeriesTitle}
                seriesDescription={seriesDescription}
                setSeriesDescription={setSeriesDescription}
                button="作成する"
            />
        </div>
    )
}

export default SeriesCreate
