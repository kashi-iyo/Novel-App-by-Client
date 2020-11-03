import React from 'react'
import useFetchTags from '../../../CustomHooks/Tags/useFetchTags'
import DisplayMultipleUsers from '../../DisplayMultipleItems/DisplayMultipleUsers'

// クリックしたタグを所有するユーザーを一覧で表示
function TagHasUsers({tagId, pageNumber}) {
    const {items, tags, isLoading} =  useFetchTags({
        method: "get",
        url: `http://localhost:3001/api/v1/user_tags/${tagId}`,
    })

    return (
        <React.Fragment>
            <DisplayMultipleUsers
                pageNumber={pageNumber}
                users={items}
                isLoading={isLoading}
                caption={`${tags.tag_name}を登録しているユーザー一覧`}
                recordCaption={`${tags.has_data_count}件のユーザーが登録しています。`}
                paginateHref={`/user_tags/${tagId}/page/`}
            />
        </React.Fragment>
    )
}

export default TagHasUsers
