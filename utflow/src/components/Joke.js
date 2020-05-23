import React from 'react';

function Joke(props) {
  return (
    <div>
      <label> Question: {props.question} </label>

      <p> {props.punchline} </p>
    </div>
  );
}

export default Joke;