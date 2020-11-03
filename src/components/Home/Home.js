import React from 'react'

import './Home.css'
import useFetchItems from '../../CustomHooks/NovelsHooks/useFetchItems'
import DisplayMultipleItems from '../DisplayMultipleItems/DisplayMultipleItems'
import Flash from '../Flash/Flash'

// ホームページ
function Home({ pageNumber, history, flashMessage }) {
    const { items, count, isLoading } = useFetchItems({
        method: "get",
        url: 'http://localhost:3001',
    })

    return (
        <React.Fragment>
            <Flash Success={flashMessage} />
            <DisplayMultipleItems
                items={items}
                dataType={"series"}
                caption="╋ ホーム "
                record={`全 ${count} 件`}
                pageNumber={pageNumber}
                history={history}
                isLoading={isLoading}
                paginateHref={`/Series/`}
            />
        </React.Fragment>
    )
}

export default Home
