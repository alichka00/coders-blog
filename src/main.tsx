import { ConfigProvider, App as AntApp } from 'antd'
import ukUA from 'antd/es/locale/uk_UA'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import App from './App'
import store from './store'

import Global from 'styles/global'
import { theme } from 'styles/theme'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#563D7C',
        },
      }}
      locale={ukUA}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AntApp>
            <Global />
            <App />
          </AntApp>
        </BrowserRouter>
      </ThemeProvider>
    </ConfigProvider>
  </Provider>,

  document.getElementById('root'),
)
