import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Button, TextField } from '@mui/material';
import {ReactSession} from 'react-client-session';

const Feature = ({ features, index, setFeatures }) => {
  const upVote = () => {
    const updatedFeature = { ...features[index] };
    let currentVote = updatedFeature.upVoted ? 1 : (updatedFeature.downVoted ? -1 : 0);
    updatedFeature.upVoted = !updatedFeature.upVoted;
    updatedFeature.downVoted = false;
    let newVote = updatedFeature.upVoted ? 1 : (updatedFeature.downVoted ? -1 : 0);
    updatedFeature.votes = updatedFeature.votes - currentVote + newVote;
    setFeatures(features.map((feature) => feature._id === features[index]._id ? updatedFeature : feature));
  };
  const downVote = () => {
    const updatedFeature = { ...features[index] };
    let currentVote = updatedFeature.upVoted ? 1 : (updatedFeature.downVoted ? -1 : 0);
    updatedFeature.downVoted = !updatedFeature.downVoted;
    updatedFeature.upVoted = false;
    let newVote = updatedFeature.upVoted ? 1 : (updatedFeature.downVoted ? -1 : 0);
    updatedFeature.votes = updatedFeature.votes - currentVote + newVote;
    setFeatures(features.map((feature) => feature._id === features[index]._id ? updatedFeature : feature));
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  /* TODO: check if user is logged in AND own the project the feature is related to */
  const username = ReactSession.get("username");
  const loggedin = useState(username !== '');
  const [newTag, setNewTag] = useState('');

  const handleTextChange = (e) => {
    setNewTag(e.target.value);
  }

  /* TODO : save new tag to database */
  const addNewTag = () => {
    features[index]['tags'].push(newTag);
    setNewTag('');
  }

  return (
    <div className="child feature">
      <div className="feature-container">
        <div className="content">
          <div className="feature-content">
            <span style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              {capitalizeFirstLetter(features[index].text)}
            </span>
          </div>
          <div className="tag-container">
            {features[index]['tags'].map(tag =>
              <div key={tag}>
                <span className="tag">{tag.toUpperCase()}</span>
                <div>&nbsp;</div>
              </div>
            )}
            {loggedin[0] && 
            <div>
              <TextField
                label="Add New Tag"
                value={newTag}
                size="small"
                onChange={handleTextChange}
              />
              <Button onClick={addNewTag}>Add</Button> 
            </div> }
          </div>
        </div>
        <div className="votes-container">
          <span>
            <FontAwesomeIcon icon={faChevronUp} size="lg" className={features[index].upVoted ? 'votedUp' : 'voteup'} onClick={upVote} />
          </span>
          <span>
            {features[index].votes}
          </span>
          <span>
            <FontAwesomeIcon icon={faChevronDown} size="lg" className={features[index].downVoted ? 'votedDown' : 'votedown'} onClick={downVote} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Feature;
