import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes/Routes'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

ReactDOM.render(<LocaleProvider locale={enUS}><Routes/></LocaleProvider>, document.getElementById('app'))