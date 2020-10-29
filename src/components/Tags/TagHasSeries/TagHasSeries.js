import React from 'react'
import usePagination from '../../../CustomHooks/Pagination/usePagination'
import useFetchTags from '../../../CustomHooks/Tags/useFetchTags'
import Pagination from '../../Pagination/Pagination'
import SeriesWrapper from '../../Series/SeriesWrapper/SeriesWrapper'
import './TagHasSeries.css'

// タグに関連付けられたシリーズの表示
function TagHasSeries({ tagId, pageNo }) {
    // タグに関連づけされたデータを取得
    const { items, tags } = useFetchTags({
        method: "get",
        url: `http://localhost:3001/api/v1/novel_tags/${tagId}`
    })

    // ページネーション用のデータ
    const { postsPerPage, currentPage, currentItems, indexOfLastPost, indexOfFirstPost } = usePagination({
        pageNo: pageNo,
        items: items
    })

    return (
        <div className="TagsSeries">
            <p className="TagHasUsers__Count">{tags.has_data_count} 件の作品が登録しています。 （ {indexOfFirstPost + 1} - {items.length < 5 ? items.length : indexOfLastPost}件 ）</p>
            <p className="Caption TagsSeries__caption">╋ {tags.tag_name} を登録している作品</p>
            <Pagination
                postsPerPage={postsPerPage}  //1Pに表示する記事の数
                totalPosts={items.length} // 記事数
                currentPage={currentPage}
                paginateHref={`/search_series_by_tag/${tagId}/page/`}
            />
            <div className="homeWrapper">
                {
                    Object.keys(currentItems).map(key => (
                    <SeriesWrapper key={key} items={currentItems[key]} />
                    ))
                }
            </div>
            <Pagination
                postsPerPage={postsPerPage}  //1Pに表示する記事の数
                totalPosts={items.length} // 記事数
                currentPage={currentPage}
                paginateHref={`/search_series_by_tag/${tagId}/page/`}
            />
        </div>
    )
}

export default TagHasSeries
