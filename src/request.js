import axios from 'axios';

const API_URL = 'https://statsapi.web.nhl.com/api/v1/';

export const getRoster = id =>
  request(`${API_URL}/teams/${id}`, {
    params: {
      expand: 'team.roster'
    }
  });

export const getStats = id =>
  request(`${API_URL}/people/${id}/stats/`, {
    params: {
      stats: 'statsSingleSeason',
      season: '20182019'
    }
  })

const request = (url, config) =>
  axios.get(url, config)
    .then(res => res.data);