import React, { Component } from 'react';
import Particles from 'react-particles-js';
import ShortenedUrl from './components/ShortenedUrl/ShortenedUrl';
import Rank from './components/Rank/Rank';
import UrlForm from './components/UrlForm/UrlForm';
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
    this.state = {
      url: '',
      shortenedUrl: '',
      showShortenedUrl: false,
      id: '',
    }
  }

  componentDidMount()  {
  fetch('http://localhost:3000')
    .then(response => response.json())
    .then(console.log)
  }

  onInputChange = (event) => {
    this.setState({url: event.target.value})
  }

  onButtonSubmit = () => {
    fetch('http://localhost:3000/newurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        url: this.state.url
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data){
        this.setState({shortenedUrl: data.shortenedurl});
        this.setState({id: data.id});
        this.setState({showShortenedUrl: true});
      }
    })
  }

  render() {
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
          shortenedUrl = {this.state.shortenedUrl}
          showShortenedUrl = {this.state.showShortenedUrl}
          url = {this.state.url}
        />
      </div>
    );
  }
}

export default App;
