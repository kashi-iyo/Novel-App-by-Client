import React, {useState} from 'react'

import './UsersPage.css'
import useFetchUserItems from '../../CustomHooks/UsersHooks/useFetchUserItems'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import UsersSeries from '../UsersSeries/UsersSeries'
import UsersPageTop from './UsersPageTop/UsersPageTop'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Spinner from '../../CustomHooks/Spinner/Spinner'
import UsersPagination from '../../Pagination/UsersPagination'

// ユーザーページ
function UsersPage(props) {
    const userId = props.match.params.id
    const { users, usersTags, usersSeries, usersErrors, seriesCount, favoriteSeries, favoriteSeriesCount, isLoading } = useFetchUserItems({
            method: "get",
            url: `http://localhost:3001/users/${userId}`,
            editUrl: `http://localhost:3001/users/${userId}/edit`,
            props: props,
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)


    // ページネーション用の投稿データ
    const indexOfLastPost = currentPage * postsPerPage  // 1x10
    const indexOfFirstPost = indexOfLastPost - postsPerPage // 10 - 10
    const currentSeries = usersSeries.slice(indexOfFirstPost, indexOfLastPost) // slie(0, 10)
    const currentFavoriteSeries = favoriteSeries.slice(indexOfFirstPost, indexOfLastPost)

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
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
                                                Object.keys(currentSeries).map(key => (
                                                    <UsersSeries key={key} series={currentSeries[key]} />
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
                                                Object.keys(currentFavoriteSeries).map(key => (
                                                    <UsersSeries key={key} series={currentFavoriteSeries[key]} />
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
