import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import './App.css'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import SeriesCreate from './components/Series/SeriesCreate/SeriesCreate'
import SeriesEdit from './components/Series/SeriesEdit/SeriesEdit'
import NovelsFeed from './components/Novels/NovelsFeed/NovelsFeed'
import NovelsContents from './components/Novels/NovelsContents/NovelsContents'
import NovelsCreate from './components/Novels/NovelsForm/NovelsCreate/NovelsCreate'
import NovelsEdit from './components/Novels/NovelsForm/NovelsEdit/NovelsEdit'
import useLoggedIn from './CustomHooks/Auth/useLoggedIn'
import Spinner from './components/Spinner/Spinner'
import UsersPage from './components/Users/UsersPage/UsersPage'
import UsersEdit from './components/Users/UsersEdit/UsersEdit'
import TagHasSeries from './components/Tags/TagHasSeries/TagHasSeries'
import TagHasUsers from './components/Tags/TagHasUsers/TagHasUsers'
import UsersTagsFeed from './components/Tags/UsersTagsFeed/UsersTagsFeed'
import SeriesTagsFeed from './components/Tags/SeriesTagsFeed/SeriesTagsFeed'

export default function App() {
  const { loggedInStatus, currentUser, isLoading, userId } = useLoggedIn()


  return (
    <div className="App">
      <React.Fragment>
        {isLoading ? <Spinner /> :
          <BrowserRouter>
            {/* ヘッダー */}
            <Route render={props => (
              <Header {...props} currentUser={currentUser} loggedInStatus={loggedInStatus} />
            )} />
            <Switch>
              {/* ルートパスへのアクセスは全て"/Series/1"へ */}
              <Route exact path="/">
                <Redirect to="/Series/1" />
              </Route>
              {/* ホーム */}
              <Route exact path={"/Series/:series_no"} render={props => (
                <Home {...props} seriesNo={props.match.params.series_no} />
              )} />
              {/* <Redirect from="/" to="/Series/1" /> */}
              {/* 認証系機能へのルーティング===================== */}
              {!loggedInStatus &&
                <Route exact path={"/login"} render={props => (
                  <Login {...props} />
                )} />
              },
              {!loggedInStatus &&
                <Route exact path={"/signup"} render={props => (
                  <Signup {...props} />
                )} />
              }
              {/* 認証系機能へのルーティング===================== */}

              {/* ユーザー系機能へのルーティング */}
              <Route
                exact path="/users/:id"
                render={props => (
                  <UsersPage {...props}
                    loggedInStatus={loggedInStatus}
                    userParams={props.match.params.id}
                    userId={userId}
                    history={props.history}
                  />
                )}
              />
              <Route
                  exact path="/users/:id/edit"
                  render={props => (
                    <UsersEdit
                      {...props}
                      loggedInStatus={loggedInStatus}
                      currentUser={currentUser}
                      history={props.history}
                      userId={userId}
                    />
                  )}
              />
              {/* 登録している趣味タグを持つユーザー一覧 */}
              {/* リダイレクト */}
              <Route exact path="/user_tags/:id"
                  render={props => (
                    <Redirect {...props}
                      to={`/user_tags/${props.match.params.id}/page/1`}
                    />
                  )}
              />
              <Route
                exact path="/user_tags/:id/page/:page_no"
                render={props => (
                  <TagHasUsers {...props}
                    tagId={props.match.params.id}
                    pageNo={props.match.params.page_no}
                  />
                )}
              />
              <Route
                  exact path="/users_tags_feed"
                  render={props => (
                    <UsersTagsFeed {...props}  />
                  )}
              />
            {/* 小説系機能へのルーティング =================================== */}
              {/* シリーズ作成 */}
              <Route
                exact path="/series_create"
                render={props => (
                  <SeriesCreate {...props}
                    loggedInStatus={loggedInStatus}
                    currentUser={currentUser}
                    isLoading={isLoading}
                    history={props.history}
                  />)}
              />
              {/* シリーズ編集 */}
              <Route
                exact path={`/novel_series/:id/edit`}
                render={props => ( <SeriesEdit {...props}
                  currentUser={currentUser}
                  seriesId={props.match.params.id}
                  history={props.history}
                  userId={userId}
                />)}
              />
              {/* シリーズ詳細ページ */}
              <Route
                exact path="/novel_series/:id"
                render={props => (<NovelsFeed {...props}
                  history={props.history}
                  seriesId={props.match.params.id}
                  currentUser={currentUser}
                  loggedInStatus={loggedInStatus}
                  userId={userId}/>)}
              />
              <Switch>
                {/* 小説1話分 */}
                <Route
                  exact path="/novel_series/:id/novels/:novel_id"
                  render={props => (<NovelsContents {...props}
                    currentUser={currentUser}
                    userId={userId}
                    seriesId={props.match.params.id}
                    novelId={props.match.params.novel_id}
                    history={props.history}
                  />
                )}
                />
                {/* 小説作成 */}
                <Route
                  exact path="/novel_series/:id/add_novels"
                  render={props => (
                    <NovelsCreate {...props}
                      loggedInStatus={loggedInStatus}
                      seriesId={props.match.params.id}
                      history={props.history}
                    />
                  )}
                />
                {/* 小説編集 */}
                <Route
                  exact path="/novel_series/:id/novels/:novel_id/edit"
                  render={props => (
                    <NovelsEdit {...props}
                      userId={userId}
                      seriesId={props.match.params.id}
                      novelsId={props.match.params.novel_id}
                      history={props.history}
                    />
                  )}
                />
                {/* シリーズタグフィード */}
                <Route
                  exact path="/series_tags_feed"
                  render={props => (
                    <SeriesTagsFeed {...props}  />
                  )}
                />
                {/* 特定のタグを持つシリーズ */}
                {/* リダイレクト */}
                <Route exact path="/search_series_by_tag/:id"
                  render={props => (
                    <Redirect {...props}
                      to={`/search_series_by_tag/${props.match.params.id}/page/1`}
                    />
                  )}
                />
                <Route
                    exact path="/search_series_by_tag/:id/page/:page_no"
                    render={props => (
                      <TagHasSeries {...props}
                        tagId={props.match.params.id}
                        pageNo={props.match.params.page_no}
                      />
                    )}
                />
              </Switch>
              {/* ============================================================== */}
            </Switch>
        </BrowserRouter>
        }
      </React.Fragment>
    </div>
  )
}
