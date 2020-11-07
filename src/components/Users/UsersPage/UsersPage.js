import React from 'react'

import './UsersPage.css'
import useFetchUserItems from '../../../CustomHooks/UsersHooks/useFetchUserItems'
import UsersPageTop from './UsersPageTop/UsersPageTop'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Spinner from '../../Spinner/Spinner'
import DisplayMultipleItems from '../../DisplayMultipleItems/DisplayMultipleItems'


// ユーザーページ
function UsersPage({ userParams, userId, history }) {
    const { users, usersTags,
        usersRelationships, setUsersRelationships,
        usersSeries, errors, seriesCount, favoriteSeries, favoriteSeriesCount, isLoading } = useFetchUserItems({
        method: "get",
        url: `http://localhost:3001/api/v1/users/${userParams}`,
        editUrl: `http://localhost:3001/api/v1/users/${userParams}/edit`,
        history: history
    })
console.log(usersSeries)
    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                <div className="users-page">
                    {/* ユーザーページ上部 */}
                    <UsersPageTop
                        users={users}
                        userId={userId}
                        usersTags={usersTags}
                        errors={errors}
                        usersRelationships={usersRelationships}
                        setUsersRelationships={setUsersRelationships}
                    />
                    <div className="users-page--bottom-">
                        <div className="users-page--bottom-wrapper">
                            <Tabs>
                                {/* 投稿作品 / お気に入り作品 */}
                                <div className="users-page--posted-series-wrapper">
                                    <TabList>
                                        <Tab>
                                            <p className="Tab">
                                                投稿作品<span>（{seriesCount}）</span>
                                            </p>
                                        </Tab>
                                        <Tab>
                                            <p className="Tab">
                                                お気に入り作品<span>（{favoriteSeriesCount}）</span>
                                            </p>
                                        </Tab>
                                    </TabList>
                                    {/* 投稿作品たち */}
                                    <TabPanel>
                                        {usersSeries.length !== 0 ?
                                            <DisplayMultipleItems
                                                items={usersSeries}
                                                pageNumber={1}
                                                isLoading={isLoading}
                                                userSeries={true}
                                            /> :
                                            <p className="users-page--posted-no-series">投稿作品はありません。気軽に投稿してみましょう！</p>}
                                    </TabPanel>
                                    {/* お気に入り作品達 */}
                                    <TabPanel>
                                        {favoriteSeries.length !== 0 ?
                                            <DisplayMultipleItems
                                                items={favoriteSeries}
                                                pageNumber={1}
                                                isLoading={isLoading}
                                                userSeries={true}
                                            /> :
                                            <p className="users-page--posted-no-favorites-series">お気に入りにした作品はありません。</p>
                                        }
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
