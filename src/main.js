import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import initReactFastclick from 'react-fastclick';
import '../dist/css/Home.scss'

import { IntlProvider, addLocaleData } from 'react-intl';

import zh from 'react-intl/locale-data/zh';//react-intl语言包
import en from 'react-intl/locale-data/en';//react-intl语言包

addLocaleData([...en, ...zh]);//需要放入本地数据库

// window.con = controller.Stores
const { init } = controller.Stores
initReactFastclick();

render(
  <IntlProvider
    locale={init.Getlanguage}
    messages={init.GetMessages}
  >
    <Router>
      <Provider store={controller.Stores}>
        <div className="container">
          <Route exact path="/woodoos" component={HomePage} />
          {/* <Route exact path="/testing" component={Test} /> */}
          <Route exact path="/Fetch" component={FetchTest} />
          <Route exact path="/woodoos/HomePage/:id" component={ItemPage} />
          <Redirect from="*" to="/woodoos" />
          <Notice />
        </div>
      </Provider>
    </Router>
  </IntlProvider>
  ,
  document.getElementById('root')
)