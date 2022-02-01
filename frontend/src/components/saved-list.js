import React, {useState, useEffect} from "react";
import RecipeDataService from "../services/recipeDataService"
import { Link } from "react-router-dom"
import jwt_decode from "jwt-decode";

const RecipesList = props => {

  const [recipes, setRecipes] = useState([]);  

  useEffect(() => {
    const token = localStorage.getItem("userInfo");
    if(token){
      const checkUser = jwt_decode(token);
      
      if(!checkUser){
      }else{
        retrieveRecipes(checkUser._id)
      }
    }
  }, [])


  const retrieveRecipes = (userID) => {
    RecipeDataService.getSaved(userID)
      .then(response => {
        setRecipes(response.data); 
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div>
      <h3>My favorites</h3>
      <div className="row">
        {recipes.map((recipe) => {
          return (
            <div className="col-lg-4 pb-1">
              
                  <Link to={"/recipe/"+recipe._id} style={{color: "inherit", textDecoration: "none"}} state={{ recipeId: recipe._id, authorID: recipe.authorID }}>
                  <div className="card text-center border-warning" style={{margin: "10px"}}>
                    <img src={recipe.recipeImage} style={{height: "width", height:"300px", objectFit: "cover"}}class="card-img-top" alt="..." />
                      <div className="card-body" style={{backgroundColor: "#e0b431"}}>
                        <h4 style={{color: "inherit", textDecoration: "none"}} className="card-title">{recipe.recipeTitle}</h4>
                      </div>
                  </div>
                  </Link>
                
            </div>
          );
        })}


      </div>
    </div>
  );
}

export default RecipesList;