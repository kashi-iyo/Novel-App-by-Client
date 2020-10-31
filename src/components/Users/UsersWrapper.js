import React from 'react'
import OneUser from './OneUser'

function UsersWrapper({items}) {
    return (
        <React.Fragment>
            <ul className="TagHasUsers__Ul">
                {items &&
                    Object.keys(items).map(key => {
                        return (
                            <OneUser
                                key={key}
                                link={`/users/${items[key].user_id}`}
                                name={items[key].nickname}
                                profile={items[key].profile}
                                tags={items[key].tag}
                            />
                        )
                    })
                }
            </ul>
        </React.Fragment>
    )
}

export default UsersWrapper
