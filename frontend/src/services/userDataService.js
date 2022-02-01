import http from "../http-common"

class UserDataService {

    //follow icon
    checkFollow(tokenToPass, followId) {
      const toPass = JSON.stringify({token: tokenToPass, userId: followId})
      return http.post(`/user/checkFollow`, toPass)
    }

    addFollow(tokenToPass, followId) {
      const toPass = JSON.stringify({token: tokenToPass, userId: followId})
      return http.put(`/user/addFollow`, toPass)
    }

    removeFollow(tokenToPass, followId) {
      const toPass = JSON.stringify({token: tokenToPass, userId: followId})
      return http.put(`/user/removeFollow`, toPass)
    }

    //saved icon
    checkSaved(tokenToPass, recipeID) {
      const toPass = JSON.stringify({token: tokenToPass, recipeID: recipeID})
      return http.post(`/user/checkSaved`, toPass)
    }

    addSaved(tokenToPass, recipeID) {
      const toPass = JSON.stringify({token: tokenToPass, recipeID: recipeID})
      return http.put(`/user/addSaved`, toPass)
    }

    removeSaved(tokenToPass, recipeID) {
      const toPass = JSON.stringify({token: tokenToPass, recipeID: recipeID})
      return http.put(`/user/removeSaved`, toPass)
    }

}

export default new UserDataService();



