import React from 'react'

import './UsersPage.css'
import useFetchUserItems from '../../CustomHooks/UsersHooks/useFetchUserItems'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import UsersSeries from '../UsersSeries/UsersSeries'
import UsersPageTop from './UsersPageTop/UsersPageTop'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import UsersFavoriteSeries from '../UsersFavoriteSeries/UsersFavoriteSeries'

// ユーザーページ
function UsersPage(props) {
    const { users, usersTags, usersSeries, usersErrors, seriesCount, favoriteSeries, favoriteSeriesCount } = useFetchUserItems({
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
                    {/* ユーザーページ上部 */}
                    <UsersPageTop {...props}
                        users={users}
                        userId={props.userId}
                        usersTags={usersTags}
                        currentUser={props.currentUser}
                    />
                    <div className="UsersPage__Bottom">
                        <div className="UsersPage__BottomWrapper">
                            <Tabs>
                                {/* 投稿作品とお気に入りのシリーズタイトル */}
                                <div className="UsersPage__PostedSeriesWrapper">
                                    <TabList>
                                        <Tab><p className="Tab">投稿作品{seriesCount && <span>（{seriesCount}）</span>}</p></Tab>
                                        <Tab><p className="Tab">お気に入り作品{favoriteSeriesCount && <span>（{favoriteSeriesCount}）</span>}</p></Tab>
                                    </TabList>
                                    {/* 投稿作品たち */}
                                    <TabPanel>
                                        <ul>
                                            {
                                                Object.keys(usersSeries).map(key => (
                                                    <UsersSeries key={key} series={usersSeries[key]} />
                                                ))
                                            }
                                        </ul>
                                    </TabPanel>
                                    {/* お気に入り作品達 */}
                                    <TabPanel>
                                        <ul className="UsersPage__UsersFavoritesUl">
                                            {favoriteSeries &&
                                                Object.keys(favoriteSeries).map(key => (
                                                    <UsersFavoriteSeries key={key} favoriteSeries={favoriteSeries[key]} />
                                                ))
                                            }
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
