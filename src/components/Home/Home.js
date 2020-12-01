import React from 'react'

import './Home.css'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import DisplayMultipleItems from '../DisplayMultipleItems/DisplayMultipleItems'


// ホームページ
function Home({ pageNumber, history }) {
    // ローカル、本番によってURLを区別
    const domain = process.env.REACT_APP_BACKEND_URL
    const { items, count, isLoading } = useFetchItems({
        method: "get",
        url: `${domain}`
    })

    return (
        <React.Fragment>
            <DisplayMultipleItems
                items={items}
                dataType={"series"}
                caption="ホーム"
                record={`全 ${count} 件`}
                pageNumber={pageNumber}
                history={history}
                isLoading={isLoading}
                selectHref={`/SelectedSeries/`}  // パスの最後にselectのパラメータが付随する
                paginateHref={`/series/page/`}  // パスの最後にページ番号が付随する
            />
        </React.Fragment>
    )
}

export default Home
