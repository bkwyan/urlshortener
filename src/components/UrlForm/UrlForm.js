import React from 'react';

const UrlForm = ({onInputChange, onButtonSubmit}) => {
  return (
    <div>
      <p className='f3'>
        {'Please enter the URL you wish to shorten.'}
      </p>
      <div className = 'center'>
        <div className='form center pa4 br3 shadow-5'>
          <input 
            className = 'f4 pa2 w-70 center'
            type='text'
            size = '70'
            placeholder = 'Paste your url...'
            onChange={onInputChange}
          />
          <button
            className='w-30 grow f4 link ph3 pv2 dib'
            onClick={onButtonSubmit}
          >Submit </button>
        </div>
      </div>
    </div>
  );
}

export default UrlForm;