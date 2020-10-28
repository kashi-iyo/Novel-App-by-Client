import React from 'react'

import './UsersPage.css'
import useFetchUserItems from '../../../CustomHooks/UsersHooks/useFetchUserItems'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import UsersSeries from '../UsersSeries/UsersSeries'
import UsersPageTop from './UsersPageTop/UsersPageTop'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Spinner from '../../Spinner/Spinner'
import UsersPagination from '../../Pagination/UsersPagination'
import usePagination from '../../../CustomHooks/Pagination/usePagination'

// ユーザーページ
function UsersPage({ userParams, loggedInStatus, userId, history }) {
    const { users, usersTags, usersSeries, usersErrors, seriesCount, favoriteSeries, favoriteSeriesCount, isLoading } = useFetchUserItems({
            method: "get",
            url: `http://localhost:3001/api/v1/users/${userParams}`,
            editUrl: `http://localhost:3001/api/v1/users/${userParams}/edit`,
            history: history,
    })
    const { postsPerPage, setCurrentPage, currentPage, currentItems, currentItems2 } = usePagination({
        pageNo: 1,
        items: usersSeries,
        items2: favoriteSeries,
    })

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                usersErrors ? <ErrorMessages loggedInStatus={loggedInStatus} errors={usersErrors} /> :
                    <div className="UsersPage">
                    {/* ユーザーページ上部 */}
                    <UsersPageTop
                        users={users}
                        userId={userId}
                        usersTags={usersTags}
                    />
                    <div className="UsersPage__Bottom">
                        <div className="UsersPage__BottomWrapper">
                            <Tabs>
                                {/* 投稿作品とお気に入りのシリーズタイトル */}
                                <div className="UsersPage__PostedSeriesWrapper">
                                    <TabList>
                                        <Tab>
                                            <p className="Tab">
                                                投稿作品{seriesCount && <span>（{seriesCount}）</span>}
                                            </p>
                                        </Tab>
                                        <Tab>
                                            <p className="Tab">
                                                お気に入り作品{favoriteSeriesCount && <span>（{favoriteSeriesCount}）</span>}
                                            </p>
                                        </Tab>
                                    </TabList>
                                    {/* 投稿作品たち */}
                                    <TabPanel>
                                        <UsersPagination
                                            postsPerPage={postsPerPage}  //1Pに表示する記事の数
                                            totalPosts={usersSeries.length} // 記事数
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                        />
                                        <ul>
                                            {
                                                Object.keys(currentItems).map(key => (
                                                    <UsersSeries key={key} series={currentItems[key]} />
                                                ))
                                            }
                                        </ul>
                                        <UsersPagination
                                            postsPerPage={postsPerPage}  //1Pに表示する記事の数
                                            totalPosts={usersSeries.length} // 記事数
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                        />
                                    </TabPanel>
                                    {/* お気に入り作品達 */}
                                    <TabPanel>
                                        <UsersPagination
                                            postsPerPage={postsPerPage}  //1Pに表示する記事の数
                                            totalPosts={favoriteSeries.length} // 記事数
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                        />
                                        <ul className="UsersPage__UsersFavoritesUl">
                                            {favoriteSeries &&
                                                Object.keys(currentItems2).map(key => (
                                                    <UsersSeries key={key} series={currentItems2[key]} />
                                                ))
                                            }
                                        </ul>
                                        <UsersPagination
                                            postsPerPage={postsPerPage}  //1Pに表示する記事の数
                                            totalPosts={favoriteSeries.length} // 記事数
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                        />
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
