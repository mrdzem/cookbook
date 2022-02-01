import http from "../http-common"

class RecipeDataService {
    async getAll() {
        return http.get(`/recipes`);
    }
    async getById(id) {
      return http.get(`/recipes/id/${id}`);
    }

    async getByTag(tag) {
      return http.get(`/recipes/tag/${tag}`);
    }

    async getByAuthor(authorID) {
      return http.get(`/recipes/author/${authorID}`);
    }

    async getSaved(userID) {
      return http.get(`/recipes/saved/${userID}`);
    }

    async getFollowed(userID) {
      return http.get(`/recipes/followed/${userID}`);
    }

    async deleteRecipe(tokenToPass, recipeID){
      const toPass = "?token="+tokenToPass
      return http.delete(`/recipeSubmit/delete/${recipeID}` + toPass);
    }

    async getSearch(include, exclude, tags) {
      var inc="";
      var exc="";
      var tagsStr="";

      for (var i=0; i < include.length; i++){
        inc+="&include="+include[i].ingrediantName
      }

      for (var j=0; j < exclude.length; j++){
        exc+="&exclude="+exclude[j].ingrediantName
      }

      for (var p=0; p < tags.length; p++){
        tagsStr+="&tag="+tags[p].tagName
      }

  
      return http.get(`/recipes/search?`+inc+exc+tagsStr);

      
    }
}

export default new RecipeDataService();