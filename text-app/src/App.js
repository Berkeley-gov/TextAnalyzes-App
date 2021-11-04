import React, { Component } from 'react';
import Navbar from './components/Navbar';
import TextAnalysisForm from './components/TextAnalysisForm';

export default class App extends React.Component {
  render() {
    return(
        (
            <div className="App">
              <Navbar/>
              <TextAnalysisForm className="p-6 m-6"/>
            </div>
        )
    );
  }
}
