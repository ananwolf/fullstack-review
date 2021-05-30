import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    let query = {username: term};
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: query,
      success: () => {
        console.log('Data found, returning with matching repos');
      },
      error: (err) => {
        console.log('POST failed', err);
      }
    });
  }

  fetchRepos () {
    axios.get('/repos')
    .then((data) => {
      this.setState({
        repos: data.data
      })
    })
    .catch((err) => {
      console.log(err);
      return;
    })
  }

  componentDidMount() {
    this.fetchRepos();
  }

  componentDidUpdate() {
    this.fetchRepos();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('app'));