// repository.js

// import axios from 'axios'
const axios = require('axios')

const baseUrl = 'https://badgrapi.azurewebsites.net/api'
const issuerBadgesResource = '/Badge/IssuerBadges'
const issuerBadgeDetailsResource = '/Badge/BadgeDetails/'
const issuerAssertions = '/Badge/IssuerAssertions'
const issuerBadgeDetailsById = 'Badge/BadgeDetailsById/'

export default {
  createConn: function () {
    return axios.create({
      baseUrl
      // headers:{"Authorization":"Bearer myTokenHere"}
    })
  },
  getIssuerBadgeByBadgeName (badgeName) {
    let newAxios = axios.create({ baseURL: baseUrl })
    return newAxios.get(issuerBadgeDetailsResource + badgeName)
  },
  getIssuerBadges () {
    let newAxios = axios.create({ baseURL: baseUrl })
    return newAxios.get(issuerBadgesResource)
  },
  getIssuerAssertionss () {
    let newAxios = axios.create({ baseURL: baseUrl })
    return newAxios.get(issuerAssertions)
  },
  getIssuerBadgeByBadgeId (badgeId) {
    let newAxios = axios.create({ baseURL: baseUrl })
    return newAxios.get(issuerBadgeDetailsById + badgeId)
  }
  // post(payload){
  //     Repository = createConn()
  //     return Repository.post('${resource}', payload)
  // },
}
