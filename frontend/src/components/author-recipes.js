import React, {useState, useEffect} from "react";
import RecipeDataService from "../services/recipeDataService"
import { Link , useLocation, useNavigate } from "react-router-dom"


const RecipesList = props => {

  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);  
  const location = useLocation();
  const authorID = location.state.authorID;

  useEffect(() => {
    retrieveRecipes();
  }, []);


  const retrieveRecipes = () => {
    RecipeDataService.getByAuthor(authorID)
      .then(response => {

        setRecipes(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const handleDelete = async (e, recipeID) => {
    e.preventDefault();
    await RecipeDataService.deleteRecipe(localStorage.getItem("userInfo"), recipeID);
    retrieveRecipes();
  }

  const [ingrediants, addIngrediant] = useState([]);

  return (
    <div>
      <div className="row">
        {recipes.map((recipe) => {
          return (
            <div className="col-lg-4 pb-1">
              <div className="card text-center border-warning">
              <img src={recipe.recipeImage} style={{height: "width", height:"300px", objectFit: "cover"}}class="card-img-top" alt="..." />
                <div className="card-body" style={{backgroundColor: "#e0b431"}}>
                  <h5 className="card-title">{recipe.recipeTitle}</h5>
                  <Link to={"/recipe/edit/"+recipe._id} className="btn btn-primary col-lg-5 mx-1 mb-1" state={{ recipe: recipe }}>
                    Edit
                  </Link>
                  <button className="btn btn-danger col-lg-5 mx-1 mb-1" onClick={ e => handleDelete(e,recipe._id)}> Delete </button>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
}

export default RecipesList;