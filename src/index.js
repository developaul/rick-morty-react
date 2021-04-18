import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import generateStore from './redux/store'

import App from './App'

import 'font-awesome/css/font-awesome.css'
import './index.css'

const store = generateStore()

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
})


const WithRouter = () => <BrowserRouter><App /></BrowserRouter>
const WithStore = () => <Provider store={store}><WithRouter /></Provider>
const WithApollo = () => <ApolloProvider client={client}><WithStore /></ApolloProvider>

ReactDOM.render(<WithApollo />, document.getElementById('root'));
