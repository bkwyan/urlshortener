import React, { Component } from 'react';
import Particles from 'react-particles-js'
import ShortenedUrl from './components/ShortenedUrl/ShortenedUrl'
import Rank from './components/Rank/Rank'
import UrlForm from './components/UrlForm/UrlForm'
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state ={
      input: '',
      url: '',
      shortenedUrl: 'someUrl',
      showShortenedUrl: false,
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({
      url: this.state.input,
      showShortenedUrl: true,
    })
  }

  render() {
    const { shortenedUrl, showShortenedUrl } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Rank />
        <UrlForm 
          onInputChange = {this.onInputChange}
          onButtonSubmit = {this.onButtonSubmit}
        />
        <ShortenedUrl 
          shortenedUrl = {shortenedUrl} 
          showShortenedUrl = {showShortenedUrl}
        />
      </div>
    );
  }
}

export default App;
