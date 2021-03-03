import React, { Component } from 'react'
import Header from '../../components/Header'
import Quiz from '../../components/Quiz'

export default class index extends Component {
  render() {
    return (
      <div>
        <Header />
        <Quiz />
      </div>
    )
  }
}