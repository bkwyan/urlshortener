import React from 'react';

const ShortenedUrl = ({showShortenedUrl, shortenedUrl}) => {
  if(showShortenedUrl){
    return (
    <div className = 'ma'>
      <div classnae = 'absolute mt2'>
        Shortened Url is -> {` `}
        <a href = {shortenedUrl}>
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