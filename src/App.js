import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

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
import useLoggedIn from './components/CustomHooks/Auth/useLoggedIn'
import Spinner from './components/CustomHooks/Spinner/Spinner'
import UsersPage from './components/Users/UsersPage/UsersPage'
import UsersEdit from './components/Users/UsersEdit/UsersEdit'
import TagsSeries from './components/Series/TagsSeries/TagsSeries'

export default function App() {
  const { loggedInStatus, currentUser, isLoading, userId } = useLoggedIn()

  
  return (
    <div className="App">
      <React.Fragment>
        {!isLoading &&
          <BrowserRouter>
            <Route render={props => (
              <Header {...props} currentUser={currentUser} loggedInStatus={loggedInStatus} />
            )} />
            <Switch>
              <Route exact path={"/"} render={props => (
                <Home {...props} />
              )} />

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
                  <UsersPage {...props} loggedInStatus={loggedInStatus} currentUser={currentUser} userId={userId} />
                )}
              />
              <Route
                  exact path="/users/:id/edit"
                  render={props => (
                    <UsersEdit
                      {...props}
                      loggedInStatus={loggedInStatus}
                      currentUser={currentUser}
                      userId={userId} />
                  )}
                />

              {/* 小説系機能へのルーティング =================================== */}
              <Route
                exact path="/series_create"
                render={props => (
                  <SeriesCreate {...props}
                    loggedInStatus={loggedInStatus} /> )}
              />
              <Route
                exact path={`/novel_series/:id/edit`}
                render={props => ( <SeriesEdit {...props}
                  currentUser={currentUser} /> )}
              />
              <Route
                exact path="/novel_series/:id"
                render={props => ( <NovelsFeed {...props}
                  currentUser={currentUser}
                  loggedInStatus={loggedInStatus} />)}
              />
              <Switch>
                <Route
                  exact path="/novel_series/:id"
                  render={props => (<NovelsFeed {...props} currentUser={currentUser} loggedInStatus={loggedInStatus}  />)}
                />
                <Route
                  exact path="/novel_series/:id/novels/:id"
                  render={props => (<NovelsContents {...props} currentUser={currentUser} />)}
                />
                <Route
                  exact path="/novel_series/:id/add_novels"
                  render={props => (
                    <NovelsCreate {...props} currentUser={currentUser} loggedInStatus={loggedInStatus} />
                  )}
                />
                <Route
                  exact path="/novel_series/:id/novels/:id/edit"
                  render={props => (
                    <NovelsEdit {...props} currentUser={currentUser} loggedInStatus={loggedInStatus} />
                  )}
              />
              <Route
                  exact path="/search_series_by_tag/:id"
                  render={props => (
                    <TagsSeries {...props}  />
                  )}
                />
              </Switch>
              {/* ============================================================== */}
            </Switch>
        </BrowserRouter>
        }
        {isLoading && <Spinner />}
      </React.Fragment>
    </div>
  )
}
