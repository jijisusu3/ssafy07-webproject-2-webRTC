const HOST = "http://localhost:8080/api/"
const ACCOUNTS = "users"
const COMMUNITIES = "communities"

export default {
  accounts: {
    login: () => HOST + "auth/login",
    signup: () => HOST + ACCOUNTS ,
    currentUserInfo: () => HOST + ACCOUNTS + '/profile',
    userIdCheck: () => HOST + ACCOUNTS + '/check-userid',
    emailCheck: () => HOST + ACCOUNTS + '/check-email',
    nicknameCheck: () => HOST + ACCOUNTS + '/check-name',
  },
  communities: {
    community: () => HOST + COMMUNITIES,
    search: searchInfo => HOST + COMMUNITIES + `${searchInfo}`,
    articleDetail: articleId => HOST + COMMUNITIES + `/${articleId}`,
  }
}