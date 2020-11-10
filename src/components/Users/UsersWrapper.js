import React from 'react'
import OneUser from './OneUser'

function UsersWrapper({ items }) {

    return (
        <React.Fragment>
            <ul className="TagHasUsers__Ul">
                {items &&
                    Object.keys(items).map(key => (
                        <OneUser
                            key={key}
                            link={`/users/${items[key].user_id}`}
                            userId={items[key].user_id}
                            name={items[key].nickname}
                            profile={items[key].profile}
                            tags={items[key].tag}
                            relationships={items[key].relationships}
                        />)
                    )
                }
            </ul>
        </React.Fragment>
    )
}

export default UsersWrapper
