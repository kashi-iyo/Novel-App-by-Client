import React from 'react'
import OneUser from './OneUser/OneUser'
import './TagHasUsers.css'
import usePagination from '../../../CustomHooks/Pagination/usePagination'
import useFetchTags from '../../../CustomHooks/Tags/useFetchTags'
import Pagination from '../../Pagination/Pagination'
import Spinner from '../../Spinner/Spinner'

// クリックしたタグを所有するユーザーを一覧で表示
function TagHasUsers({tagId, pageNo}) {
    const {items, tags, isLoading} =  useFetchTags({
        method: "get",
        url: `http://localhost:3001/api/v1/user_tags/${tagId}`,
    })

    // ページネーション用のデータ
    const { postsPerPage, currentPage, currentItems, indexOfLastPost, indexOfFirstPost} = usePagination({
        pageNo: pageNo,
        items: items
    })

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                <div className="TagHasUsers">
                    <p className="TagHasUsers__Count">{tags.has_data_count} 件のユーザーが登録しています。 （ {indexOfFirstPost + 1} - {items.length < 5 ? items.length : indexOfLastPost}件 ）</p>
                    <h2 className="Caption UsersCaption">╋ {tags.tag_name} を登録しているユーザー</h2>
                    <Pagination
                        postsPerPage={postsPerPage}  //1Pに表示する記事の数
                        totalPosts={items.length} // 記事数
                        currentPage={currentPage}
                        paginateHref={`/user_tags/${tagId}/page/`}
                    />
                    <ul className="TagHasUsers__Ul">
                        {currentItems &&
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
                        paginateHref={`/user_tags/${tagId}/page/`}
                    />
                </div>
            }
        </React.Fragment>
    )
}

export default TagHasUsers
