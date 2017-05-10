import React from 'react'
import ReactDOM from 'react-dom'
import CommentBox from './components/CommentBox'

ReactDOM.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('container')
);
