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
import RelationshipUsers from './components/Follow/RelationshipUsers'
import SelectedSeries from './components/Series/SelectedSeries/SelectedSeries'
import Flash from './components/Flash/Flash'
import useFlash from './CustomHooks/FlashHooks/useFlash'
import ErrorMessages from './components/ErrorMessages/ErrorMessages'


export default function App() {
  const { flashMessages, handleFlashMessages } = useFlash()
  const { loggedInStatus, currentUser, isLoading, userId, handleLogout, handleLogin } = useLoggedIn({handleFlashMessages})


  return (
    <div className="App">
      <React.Fragment>
        {isLoading ? <Spinner /> :
          <BrowserRouter>
            {/* フラッシュメッセージ */}
            <Route render={props => (
              flashMessages && <Flash
                flashMessages={flashMessages}
              />
            )} />
            {/* ヘッダー */}
            <Route render={props => (
              <Header {...props}
                userId={userId}
                currentUser={currentUser}
                loggedInStatus={loggedInStatus}
                history={props.history}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                handleFlashMessages={handleFlashMessages}
              />
            )} />
            {/* エラーメッセージ用コンポーネント */}
            <Route exact path="/error_messages"
              render={props => (
              <ErrorMessages {...props}
                  errorType={props.history.location.state.errorType}
                  errors={props.history.location.state.errors}
              />
            )} />
            <Switch>
              {/* ルートパスへのアクセスは全て"/Series/1"へ */}
              <Route exact path="/">
                <Redirect to="/Series/1"/>
              </Route>
              {/* ホーム */}
              <Route exact path={"/Series/:page_number"} render={props => (
                <Home {...props}
                  history={props.history}
                  pageNumber={props.match.params.page_number}
                />
              )} />
              {/* 認証系機能へのルーティング===================== */}
              <Route exact path={"/login"}
                render={props => (
                  !loggedInStatus ?
                    <Login {...props}
                      history={props.history}
                      handleLogin={handleLogin}
                    /> :
                    <Redirect to="/" />
                )}/>
              <Route exact path={"/signup"}
                render={props => (
                  !loggedInStatus ?
                    <Signup {...props}
                      history={props.history}
                      handleLogin={handleLogin}
                    /> :
                    <Redirect to="/"/>
                )}/>
              {/* 認証系機能へのルーティング===================== */}

              {/* ユーザー系機能へのルーティング */}
              <Route
                exact path="/users/:id"
                render={props => (
                  <UsersPage {...props}
                    props={props}
                    userId={userId}
                    history={props.history}
                    loggedInStatus={loggedInStatus}
                    userParams={props.match.params.id}
                    handleFlashMessages={handleFlashMessages}
                  />
                )}
              />
              <Route
                  exact path="/users/:id/edit"
                  render={props => (
                    loggedInStatus ? <UsersEdit
                      {...props}
                      userId={userId}
                      history={props.history}
                      currentUser={currentUser}
                      loggedInStatus={loggedInStatus}
                      handleFlashMessages={handleFlashMessages}
                    /> :
                      <Redirect
                        to={{
                          pathname: "/"
                        }}
                      />
                  )}
              />
              {/* フォローユーザー一覧/フォロワー一覧へのルーティング */}
              <Route exact path="/users/:user_id/:relationships?"
                render={props => (
                  <Redirect
                    to={`/users/${props.match.params.user_id}/${props.match.params.relationships}/1`}
                  />
                )}
              />
              <Route
                exact path="/users/:user_id/:relationships?/:page_number"
                render={props => (
                  <RelationshipUsers
                    userId={props.match.params.user_id}
                    relationshipsParams={props.match.params.relationships}
                    pageNumber={props.match.params.page_number}
                    history={props.history}
                    handleFlashMessages={handleFlashMessages}
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
                exact path="/user_tags/:id/page/:page_number"
                render={props => (
                  <TagHasUsers {...props}
                    tagId={props.match.params.id}
                    pageNumber={props.match.params.page_number}
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
                  loggedInStatus ? <SeriesCreate {...props}
                    loggedInStatus={loggedInStatus}
                    currentUser={currentUser}
                    isLoading={isLoading}
                    history={props.history}
                  /> :
                    <Redirect
                      to={{
                        pathname: "/error_messages",
                        state: { errorType: "series-create" }
                      }}
                    />
                  )}
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
                <Route exact path="/series/tag/:tag_id"
                  render={props => (
                    <Redirect {...props}
                      to={`/series/tag/${props.match.params.id}/page/1`}
                    />
                  )}
                />
                <Route
                    exact path="/series/tag/:tag_id/page/:page_number"
                    render={props => (
                      <TagHasSeries {...props}
                        tagId={props.match.params.tag_id}
                        pageNumber={props.match.params.page_number}
                      />
                    )}
                />
                <Route exact path="/selectedSeries/:selected_params?"
                  render={props => (
                    <Redirect {...props}
                      to={`/selectedSeries/${props.match.params.selected_params}/1`}
                    />
                  )}
                />
                <Route exact path={"/selectedSeries/:selected_params?/:page_number"}
                  render={props => (
                    <SelectedSeries {...props}
                      props={props}
                      history={props.history}
                      selectedItem={props.location.state}
                      selectedParams={props.match.params.selected_params}
                      pageNumber={props.match.params.page_number}
                  />)}/>
              </Switch>
              {/* ============================================================== */}
            </Switch>
        </BrowserRouter>
        }
      </React.Fragment>
    </div>
  )
}
