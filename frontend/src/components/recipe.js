import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import RecipeDataService from "../services/recipeDataService"
import UserDataService from "../services/userDataService"
import {  useNavigate } from 'react-router-dom'

//const Recipe = () => {
function Recipe() {
  const location = useLocation();
  const recipeId = location.state.recipeId;
  const authorID = location.state.authorID;
  const [token,setToken] = useState(null);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState();
  const [follow, setFollow] = useState(false);
  const [saved, setSaved] = useState(false);
  

  //on start
  useEffect( async () => {
    await retrieveRecipe(recipeId)
    const usertoken = localStorage.getItem("userInfo");
    if(!usertoken){
      setFollow(false);
      setSaved(false);
    }else{
      setToken(usertoken);
      retriveFollow(usertoken, authorID);
      retriveSaved(usertoken, recipeId);
    }
  }, []);

  //Handling follow icon
  const retriveFollow = async (tokenToPass, followToCheck) => {
    UserDataService.checkFollow(tokenToPass, followToCheck)
      .then(response => {
        setFollow(response.data);
      })
  }

  const addFollow = async (tokenToPass, followToCheck) => {
    UserDataService.addFollow(tokenToPass, followToCheck)
      .then(response => {
        console.log(response.data);
      })
  }

  const removeFollow = async (tokenToPass, followToCheck) => {
    UserDataService.removeFollow(tokenToPass, followToCheck)
      .then(response => {
        console.log(response.data);
      })
  }

  const handleFollow = e => {
    if(!token){
      navigate("/login");
    }else{
      if(follow){
        removeFollow(token, authorID);
      }else{
        addFollow(token, authorID);
      }
      setFollow(!follow);

    }
  }

  //handling saved icon

  const retriveSaved = async (tokenToPass, savedToCheck) => {
    UserDataService.checkSaved(tokenToPass, savedToCheck)
      .then(response => {
        setSaved(response.data);
        console.log(response.data);
      })
  }

  const addSaved = async (tokenToPass, savedToCheck) => {
    UserDataService.addSaved(tokenToPass, savedToCheck)
      .then(response => {
        console.log(response.data);
      })
  }

  const removeSaved = async (tokenToPass, savedToCheck) => {
    UserDataService.removeSaved(tokenToPass, savedToCheck)
      .then(response => {
        console.log(response.data);
      })
  }

  const handleSaved = e => {
    if(!token){
      navigate("/login");
    }else{
      if(saved){
        removeSaved(token, recipeId);
      }else{
        addSaved(token, recipeId);
      }
      setSaved(!saved)

    }
  }

  //handling recipe data

  const retrieveRecipe = async (id) => {
    RecipeDataService.getById(id)
      .then(response => {
        setRecipe(response.data); 
      })
      .catch(e => {
        console.log(e);
      });
  };

  

  

  
  return (
    <div>
      
      {recipe &&
        <div>
          <div class="row align-items-start">
            <div class="col">
              <img src={recipe.recipeImage} class="rounded float-start" style={{width: "100%", height:"auto", objectFit: "cover"}}/>
            </div>
            <div class="col">
            <div class="card">
              <div class="card-header">
                <div class="row align-items-center">
                  <div class="col">
                  By {recipe.author}
                  {!follow ?
                (<button onClick={handleFollow} className="btn btn-primary" style={{padding: "5px", margin: "10px"}}>Follow</button>):
                (<button onClick={handleFollow} className="btn btn-warning" style={{padding: "5px", margin: "10px"}}>Unfollow</button>)}
                
                  </div>
                  <div class="col">
                  {saved ?
                  (<svg xmlns="http://www.w3.org/2000/svg" onClick={handleSaved} width="32" height="32" fill="#e0b431" class="bi bi-heart-fill" viewBox="0 0 16 16" style={{ position: "absolute", right: "10px", top: "23px",marginRight: "10px"}}>
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                  </svg>) : 
                  (<svg xmlns="http://www.w3.org/2000/svg" onClick={handleSaved} width="32" height="32" fill="#e0b431" class="bi bi-heart" viewBox="0 0 16 16" style={{ position: "absolute", right: "10px", top: "23px",marginRight: "10px"}}>
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                  </svg>)}
                  </div>
                </div>
                
              </div>
            
              <div class="card-body">
                <h1>{recipe.recipeTitle}</h1>
              </div>
              <ul class="list-group list-group-flush">
              {recipe.ingrediantList.map((ingrediant) => {
                return (
                  <li class="list-group-item">{ingrediant.amount} {ingrediant.unit} of {ingrediant.ingrediantName}  </li>
                );
              })}
              </ul>
              <div class="card-body">
                <a style={{whiteSpace: "pre-line"}}>{recipe.recipeText}</a>
              </div>
            </div>
              
            </div>
          </div>
              {recipe.tags.map((tag) => {
                return (
                  <button className="btn btn-info" style={{padding: "5px", margin: "10px"}}>{tag.tagName}  </button>
                );
              })}
        </div>
      }
    </div>  
      

  )
}



export default Recipe;