import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Hero } from './components/Hero';
import { Landing } from './components/Landing';
import { OneRingQuote } from './components/OneRingQuote';
import { Vonage } from './components/Vonage';
import { LOTRQuote } from './components/LOTRQuote';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/hero' component={Hero} />
        <Route path='/landing' component={Landing} />
        <Route path='/ring-quote' component={OneRingQuote} />
            <Route path='/vonage' component={Vonage} />
            <Route path='/lotr-quote' component={LOTRQuote} />
      </Layout>
    );
  }
}
