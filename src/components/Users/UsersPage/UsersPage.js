import React from 'react'

import './UsersPage.css'
import useFetchUserItems from '../../../CustomHooks/UsersHooks/useFetchUserItems'
import ErrorMessages from '../../ErrorMessages/ErrorMessages'
import UsersPageTop from './UsersPageTop/UsersPageTop'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Spinner from '../../Spinner/Spinner'
import DisplayMultipleItems from '../../DisplayMultipleItems/DisplayMultipleItems'
import Flash from '../../Flash/Flash'

// ユーザーページ
function UsersPage({ userParams, loggedInStatus, userId, history, flashMessage }) {
    const { users, usersTags, usersRelationships, handleFollow, handleUnFollow, usersSeries, errors, seriesCount, favoriteSeries, favoriteSeriesCount, isLoading } = useFetchUserItems({
            method: "get",
            url: `http://localhost:3001/api/v1/users/${userParams}`,
            editUrl: `http://localhost:3001/api/v1/users/${userParams}/edit`,
            history: history,
    })

    return (
        <React.Fragment>
            {isLoading ? <Spinner /> :
                errors ? <ErrorMessages loggedInStatus={loggedInStatus} errors={errors} /> :
                    <div className="UsersPage">
                    <Flash Success={flashMessage} />
                    {/* ユーザーページ上部 */}
                    <UsersPageTop
                        users={users}
                        userId={userId}
                        usersTags={usersTags}
                        errors={errors}
                        usersRelationships={usersRelationships}
                        handleFollow={handleFollow}
                        handleUnFollow={handleUnFollow}
                    />
                    <div className="UsersPage__Bottom">
                        <div className="UsersPage__BottomWrapper">
                            <Tabs>
                                {/* 投稿作品 / お気に入り作品 */}
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
                                        <DisplayMultipleItems
                                            items={usersSeries}
                                            seriesNo={1}
                                            isLoading={isLoading}
                                            userSeries={true}
                                        />
                                    </TabPanel>
                                    {/* お気に入り作品達 */}
                                    <TabPanel>
                                        <DisplayMultipleItems
                                            items={favoriteSeries}
                                            seriesNo={1}
                                            isLoading={isLoading}
                                            userSeries={true}
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
