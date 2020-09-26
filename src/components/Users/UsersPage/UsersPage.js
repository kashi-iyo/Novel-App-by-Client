import React from 'react'
import { Link } from 'react-router-dom'
import './UsersPage.css'
import useFetchUserItems from '../../CustomHooks/UsersHooks/useFetchUserItems'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import UsersSeries from '../UsersSeries/UsersSeries'
import UsersPageTop from './UsersPageTop/UsersPageTop'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

function UsersPage(props) {
    const {
        users,
        usersSeries,
        usersErrors,
        seriesCount,
        handleFormDisplay, } = useFetchUserItems({
            method: "get",
            url: `http://localhost:3001/users/${props.userId}`,
            editUrl: `http://localhost:3001/users/${props.userId}/edit`,
            props: props,
    })

    return (
        <React.Fragment>
            {
                usersErrors ? <ErrorMessages loggedInStatus={props.loggedInStatus} errors={usersErrors} /> :
                <div className="UsersPage">
                    <UsersPageTop {...props}
                        users={users}
                        userId={props.userId}
                        handleFormDisplay={handleFormDisplay}
                        currentUser={props.currentUser}
                    />
                    <div className="UsersPage__Bottom">
                        <div className="UsersPage__BottomWrapper">
                            <Tabs>
                                {/* 投稿作品のシリーズタイトル */}
                                <div className="UsersPage__PostedSeriesWrapper">
                                    <TabList>
                                        <Tab><p className="Tab">投稿作品{seriesCount && <span>（{seriesCount}）</span>}</p></Tab>
                                        <Tab><p className="Tab">お気に入り作品</p></Tab>
                                    </TabList>
                                    <TabPanel>
                                        <ul>
                                            {
                                                Object.keys(usersSeries).map(key => (
                                                    <UsersSeries key={key} series={usersSeries[key]} />
                                                ))
                                            }
                                        </ul>
                                    </TabPanel>
                                    <TabPanel>
                                        <ul className="UsersPage__UsersFavoritesUl">
                                            {/* お気に入り作品達 */}
                                            <p><Link>aaaaaa</Link></p>
                                            <p><Link>aaaaaa</Link></p>
                                            <p><Link>aaaaaa</Link></p>
                                            <p><Link>aaaaaa</Link></p>
                                            <p><Link>aaaaaa</Link></p>
                                            <p><Link>aaaaaa</Link></p>
                                            <p><Link>aaaaaa</Link></p>
                                        </ul>
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default UsersPage
