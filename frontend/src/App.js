import React, {useState, useEffect } from "react";
import { Routes, Route, Link} from "react-router-dom";
import jwt_decode from "jwt-decode";


import Login from "./components/login"
import Followed from "./components/followed-list"
import EditRecipe from "./components/edit-recipe"
import Saved from "./components/saved-list"
import Recipe from "./components/recipe"
import AddReview from "./components/add-recipe"
import RecipesList from "./components/recipes-list"
import Register from "./components/register"
import AuthorRecipes from "./components/author-recipes"






function App() {

  useEffect(() => {
    const token = localStorage.getItem("userInfo");
    if(token){
      const checkUser = jwt_decode(token);
      
      if(!checkUser){
        logout();
      }else{
        setLog();
        setUserName(checkUser.userName);
        setUser(checkUser._id)
      }
    }
  }, [])

  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);

  async function logout(){
    localStorage.removeItem("userInfo");
    setUserName("");
  };

  async function setLog(){
    setUser(localStorage.getItem("userInfo"));
  }



  return (
    <div>




      <nav className="navbar navbar-expand-lg navbar-dark " style={{ backgroundColor: "#e6b400" }} >
        
        <div className="navbar-nav mr-auto">
        <a href="/restaurants" className="navbar-brand" style={{ marginLeft: "15px"}}>
          CookBook
        </a>
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Recipes
            </Link>
          </li>
          {user &&
          <li className="nav-item">
            <Link to={"/saved"} className="nav-link">
              My Favorites
            </Link>
          </li>}
          {user &&
          <li className="nav-item">
            <Link to={"/followed"} className="nav-link">
              Followed authors
            </Link>
          </li>
          }

          { !user ? (<li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Sign in
            </Link>
          </li>):(
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <strong>{userName}</strong>
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li> <Link to={"/addRecipe"} className="dropdown-item">Add recipe</Link></li>
              <li><Link to={"/author/"+user} state={{  authorID: user}} className="dropdown-item" >My recipes</Link></li>
              <hr class="dropdown-divider" />
              <li><a className="dropdown-item" href="/restaurants" onClick={logout}>Log out</a></li>
            </ul>
          </li>)}
        </div>
      </nav>




      <div className="container mt-3">
        <Routes>
          <Route 
            path={"/"}
            element={<RecipesList />}
          />
          <Route 
            path={"/restaurants"}
            element={<RecipesList />}
          />
          <Route 
            path={"/followed"}
            element={<Followed />}
          />
          <Route 
            path={"/saved"}
            element={<Saved />}
          />
          <Route 
            path="/addRecipe"
            element={<AddReview user={user} />}
          />
          <Route 
            path="/recipe/:id"
            element={<Recipe user={user} />}
          />
          <Route 
            path="/recipe/edit/:id"
            element={<EditRecipe user={user} />}
          />
          <Route 
            path="/author/:authorID"
            element={<AuthorRecipes user={user} />}
          />
          <Route 
            path="/login"
            element={<Login data={setLog} user={user}/>}
          />
          <Route 
            path="/register"
            element={<Register />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
