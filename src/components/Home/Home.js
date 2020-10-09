import React, {useState} from 'react'

import './Home.css'
import SeriesWrapper from '../Series/SeriesWrapper/SeriesWrapper'
import useFetchItems from '../CustomHooks/NovelsHooks/useFetchItems'
import Spinner from '../CustomHooks/Spinner/Spinner'
import Pagination from '../Pagination/Pagination'

// ホームページ
function Home({ seriesNo }) {
    const [currentPage] = useState(seriesNo)
    const [postsPerPage] = useState(5)
    const { items, count, isLoading } = useFetchItems({
        method: "get",
        url: 'http://localhost:3001',
    })

    // ページネーション用の投稿データ
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost)

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                <div className="home">
                    <Pagination
                        postsPerPage={postsPerPage}  //1Pに表示する記事の数
                        totalPosts={items.length} // 記事数
                        seriesNo={currentPage}
                        paginateHref={`/Series/`}
                    />
                    <p className="Caption">╋作品一覧（全 {count} 件）</p>
                    <div className="homeWrapper">
                        {
                            Object.keys(currentPosts).map(key => (
                            <SeriesWrapper key={key} items={currentPosts[key]} />
                            ))
                        }
                    </div>
                    <Pagination
                        postsPerPage={postsPerPage}  //1Pに表示する記事の数
                        totalPosts={items.length} // 記事数
                        seriesNo={currentPage}
                        paginateHref={`/Series/`}
                    />
                </div>
            }
        </React.Fragment>
    )
}

export default Home
