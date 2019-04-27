// repository.js

// import axios from 'axios'
const axios = require('axios')

const baseUrl = 'https://badgrapi.azurewebsites.net/api'
const issuerBadgesResource = '/Badge/IssuerBadges'
const issuerBadgeDetailsResource = '/Badge/BadgeDetails/'

export default {
  createConn: function () {
    return axios.create({
      baseUrl
      // headers:{"Authorization":"Bearer myTokenHere"}
    })
  },
  getIssuerBadgeByBadgeName (badgeName) {
    var newAxios = axios.create({ baseURL: baseUrl })
    return newAxios.get(issuerBadgeDetailsResource + badgeName)
  },
  getIssuerBadges () {
    var newAxios = axios.create({ baseURL: baseUrl })
    return newAxios.get(issuerBadgesResource)
  }
  // post(payload){
  //     Repository = createConn()
  //     return Repository.post('${resource}', payload)
  // },
}
