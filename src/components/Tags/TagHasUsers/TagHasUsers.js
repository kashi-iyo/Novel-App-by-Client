import React from 'react'
import useFetchTags from '../../../CustomHooks/Tags/useFetchTags'
import DisplayMultipleUsers from '../../DisplayMultipleItems/DisplayMultipleUsers'

// クリックしたタグを所有するユーザーを一覧で表示
function TagHasUsers({tagId, pageNumber, history, handleFlashMessages }) {
    const {items, isLoading} =  useFetchTags({
        method: "get",
        url: `http://localhost:3001/api/v1/user_tags/${tagId}`,
        history: history,
        handleFlashMessages: handleFlashMessages
    })

    return (
        <React.Fragment>
            <DisplayMultipleUsers
                pageNumber={pageNumber}
                users={items.users}
                isLoading={isLoading}
                caption={`${items.tag.tag_name}を登録しているユーザー一覧`}
                recordCaption={`${items.tag.has_data_count}件のユーザーが登録しています。`}
                paginateHref={`/user_tags/${tagId}/page/`}
            />
        </React.Fragment>
    )
}

export default TagHasUsers
