import React from 'react'
import OneUser from './OneUser/OneUser'
import './TagHasUsers.css'
import TagsFeed from '../UsersTagsFeed/UsersTagsFeed'
import usePagination from '../../../CustomHooks/Pagination/usePagination'
import useFetchTags from '../../../CustomHooks/Tags/useFetchTags'
import Pagination from '../../Pagination/Pagination'

// クリックしたタグを所有するユーザーを一覧で表示
function TagHasUsers({tagId, pageNo}) {
    const {items, tags} =  useFetchTags({
        method: "get",
        url: `http://localhost:3001/api/v1/user_tags/${tagId}`,
    })

    // ページネーション用のデータ
    const { postsPerPage, currentPage, currentItems} = usePagination({
        pageNo: pageNo,
        items: items
    })

    return (
        <div className="TagHasUsers">
            <TagsFeed />
            <Pagination
                postsPerPage={postsPerPage}  //1Pに表示する記事の数
                totalPosts={items.length} // 記事数
                currentPage={currentPage}
                paginateHref={`/search_series_by_tag/${tagId}/page/`}
            />
            <h2 className="Caption UsersCaption">╋{tags.tag_name} を登録しているユーザー</h2>
            <ul className="TagHasUsers__Ul">
                {currentItems&&
                    Object.keys(currentItems).map(key => {
                        return (
                            <OneUser
                                key={key}
                                link={`/users/${currentItems[key].user_id}`}
                                name={currentItems[key].nickname}
                                profile={currentItems[key].profile}
                            />
                        )
                    })
                }
            </ul>
            <Pagination
                postsPerPage={postsPerPage}  //1Pに表示する記事の数
                totalPosts={items.length} // 記事数
                currentPage={currentPage}
                paginateHref={`/search_series_by_tag/${tagId}/page/`}
            />
        </div>
    )
}

export default TagHasUsers
