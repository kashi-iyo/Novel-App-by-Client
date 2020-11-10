import React from 'react'
import usePagination from '../../CustomHooks/Pagination/usePagination'
import Pagination from '../Pagination/Pagination'
import Spinner from '../Spinner/Spinner'
import UsersWrapper from '../Users/UsersWrapper'
import './DisplayMultipleUsers.css'


// ユーザー一覧表示
// → RelationshipUsers/TagHasUsers
function DisplayMultipleUsers({pageNumber, perPage, users, isLoading,  recordCaption, paginateHref, caption}) {

    // ページネーション用のデータ
    const { postsPerPage, currentPage, currentItems, indexOfLastPost, indexOfFirstPost} = usePagination({
        pageNumber: pageNumber,
        perPage: perPage,
        items: users
    })

    return (
        <React.Fragment>
            {/* ローダー */}
            {isLoading ? <Spinner /> :
                <div className="display-multiple-users">
                    {/* 見出し */}
                    <h2 className="display-multiple-items--caption">
                        {caption}
                    </h2>
                    {/* 件数見出し */}
                    {users.length !== 0 &&
                        <React.Fragment>
                            <p className="display-multiple-items--record-numbers">
                                {recordCaption}
                                （ {indexOfFirstPost + 1} - {users.length < postsPerPage ? users.length : indexOfLastPost}件 ）
                            </p>
                            <Pagination
                                postsPerPage={postsPerPage}  //1Pに表示する記事の数
                                totalPosts={users.length} // 記事数
                                currentPage={currentPage}
                                paginateHref={paginateHref}
                            />
                            <UsersWrapper
                                items={currentItems}
                            />
                            <Pagination
                                postsPerPage={postsPerPage}  //1Pに表示する記事の数
                                totalPosts={users.length} // 記事数
                                currentPage={currentPage}
                                paginateHref={paginateHref}
                                />
                        </React.Fragment>
                    }
                </div>
            }
        </React.Fragment>
    )
}

export default DisplayMultipleUsers
