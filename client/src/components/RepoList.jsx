import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map(repo => (
      <a href={repo.url}>{repo.username}</a>
    ))}
  </div>
)

export default RepoList;