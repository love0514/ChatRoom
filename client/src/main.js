import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './layouts/ChatRoom'
import '../dist/css/Home.scss'
import Store from './store'
// import { IntlProvider, addLocaleData } from 'react-intl';

// import zh from 'react-intl/locale-data/zh';//react-intl语言包
// import en from 'react-intl/locale-data/en';//react-intl语言包

// addLocaleData([...en, ...zh]);//需要放入本地数据库

// window.con = controller.Stores
// const { init }= controller.Stores
// initReactFastclick();

render(
  <Router>
    <Provider store={Store.Store}>
    <div className="container">
      <Route exact path="/" component={Home} />
      <Redirect from="*" to="/" />

    </div>
    </Provider>
  </Router>
  ,
  document.getElementById('root')
)