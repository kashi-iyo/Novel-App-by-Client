import React from 'react'
import useFollow from '../../CustomHooks/FollowHooks/useFollow'
import usePagination from '../../CustomHooks/Pagination/usePagination'
import Pagination from '../Pagination/Pagination'
import Spinner from '../Spinner/Spinner'
import UsersWrapper from '../Users/UsersWrapper'

function RelationshipUsers({ userId, pageNo, dataType }) {
    const {items, isLoading} =  useFollow({
        method: "get",
        url: `http://localhost:3001/api/v1/relationships/${userId}/${dataType}`,
    })
    const users = items.users
    const usersCount = items.users_count

    // ページネーション用のデータ
    const { postsPerPage, currentPage, currentItems, indexOfLastPost, indexOfFirstPost} = usePagination({
        pageNo: pageNo,
        perPage: 30,
        items: users
    })

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                <div className="TagHasUsers">
                    <p className="TagHasUsers__Count">
                        {usersCount} 人のユーザー
                        （ {indexOfFirstPost + 1} - {users.length < 30 ? users.length : indexOfLastPost}件 ）
                    </p>
                    <h2 className="Caption UsersCaption">
                        ╋ {items.user} さんの{dataType === "followings" ? "フォローユーザー" : "フォロワー"}
                    </h2>
                    <Pagination
                        postsPerPage={postsPerPage}  //1Pに表示する記事の数
                        totalPosts={users.length} // 記事数
                        currentPage={currentPage}
                        paginateHref={`/users/${userId}/${dataType}/`}
                    />
                    {/* ユーザー一覧 */}
                    <UsersWrapper items={currentItems} />
                    <Pagination
                        postsPerPage={postsPerPage}  //1Pに表示する記事の数
                        totalPosts={users.length} // 記事数
                        currentPage={currentPage}
                        paginateHref={`/users/${userId}/${dataType}/`}
                    />
                </div>
            }
        </React.Fragment>
    )
}

export default RelationshipUsers
