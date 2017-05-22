import axios from 'axios';
const LOAD_REPOS_SUCCESS = 'LOAD_REPOS_SUCCESS';

const loadReposSuccess = (repos)=> ({
  type: LOAD_REPOS_SUCCESS,
  repos
});

const loadRepos = ()=> {
  return (dispatch)=> {
    return axios.get(`/api/github/${localStorage.getItem('token')}`)
      .then(response => dispatch(loadReposSuccess(response.data.data)));
  };
};

export {
  loadRepos,
};

const reducer = (state=[], action)=> {
  switch(action.type){
    case LOAD_REPOS_SUCCESS:
      state = action.repos;
      break;
  }
  return state;
};

export default reducer;
