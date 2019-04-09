import React from 'react';

const ShortenedUrl = ({showShortenedUrl, shortenedUrl, url}) => {
  if(showShortenedUrl){
    return (
      <div className = 'center ma'>
        <div className = 'absolute mt2'>
          Shortened Url is -> {` `}
          <a href = {url} target ='_blank' rel='noopener noreferrer'>
            {shortenedUrl}
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

export default ShortenedUrl;