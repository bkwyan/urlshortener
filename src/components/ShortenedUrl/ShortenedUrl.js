import React from 'react';

class ShortenedUrl extends React.Component{

  constructor(props){
    super(props);
    this.state = {

    }
  }

  onClickedUrl = () => {
    fetch('http://localhost:3000/' + this.props.hash)
      .then(response => response.json())
      .catch(e => console.log(e))
  }

  render(){
    if(this.props.showShortenedUrl){
      return (
        <div className = 'center ma'>
          <div className = 'absolute mt2'>
            Shortened Url is -> {` `}
            <a href = {'/' + this.props.hash} target ='_blank' rel='noopener noreferrer' onClick = {this.onClickedUrl}>
              {this.props.shortenedUrl}
            </a>
          </div>
        </div>
      );
    } else{
      return (
        <div>
          <p> Waiting for Url </p>
        </div>
      );
    }
  }
}

export default ShortenedUrl;