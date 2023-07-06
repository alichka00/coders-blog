import { ConfigProvider } from 'antd'
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
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Global />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ConfigProvider>
  </Provider>,

  document.getElementById('root'),
)
