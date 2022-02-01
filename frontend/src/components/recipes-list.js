import React, {useState, useEffect} from "react";
import RecipeDataService from "../services/recipeDataService"
import { Link } from "react-router-dom"
import { Multiselect } from 'multiselect-react-dropdown'
import dataDrop from "./data/ingredients.json"
import tagOpts from "./data/tags.json"

const RecipesList = props => {

  const [recipes, setRecipes] = useState([]);  

  const [include, setInclude] = useState([]);
  const [exclude, setExclude] = useState([]);
  const [selectedTags, setTags] = useState([]);

  const [firstInlcude, setFirstInc] = useState(true)
  const [firstExclude, setFirstExc] = useState(true)
  const [firstTag, setFirstTag] = useState(true)


  useEffect(() => {
    retrieveSearch(include, exclude, selectedTags);
  }, [include, exclude, selectedTags]);


  async function retrieveSearch (toInclude, toExclude, selectTags){
    RecipeDataService.getSearch(toInclude,toExclude, selectTags)
      .then(response => {
        setRecipes(response.data); 
      })
      .catch(e => {
        console.log(e);
      });
  };


  const [tagOptions] = useState(tagOpts);

  const [opts] = useState(dataDrop);



  const handleInclude = async (data) => {
    setInclude(data);
    if(!firstInlcude){
      retrieveSearch(include, exclude, selectedTags)
    }else{
      setFirstInc(false);
    }
    
  }

  const handleExclude = (data) => {
    setExclude(data);
    if(!firstExclude){
      retrieveSearch(include, exclude, selectedTags)
    }else{
      setFirstExc(false)
    }
  }

  const handleTags = (data) => {
    setTags(data);
    if(!firstTag){
      retrieveSearch(include, exclude, selectedTags)
    }else{
      setFirstTag(false)
    }
  }

  return (
    <div>
      Include ingrediants:
      <Multiselect
         options={opts} 
         displayValue="ingrediantName"
         selectedValues={[]}
         onSelect={selectedValues=> handleInclude(selectedValues)}
         onRemove={selectedValues=> handleInclude(selectedValues)}
         name="ingrediantName"
       /> 

    Exclude ingrediants:
    <Multiselect
         options={opts} 
         displayValue="ingrediantName"
         selectedValues={[]}
         onSelect={selectedValues=> handleExclude(selectedValues)}
         onRemove={selectedValues=> handleExclude(selectedValues)}
         name="ingrediantName"
       /> 

    Select tags:
    <Multiselect
         options={tagOptions} 
         displayValue="tagName"
         selectedValues={[]}
         onSelect={selectedValues=> handleTags(selectedValues)}
         onRemove={selectedValues=> handleTags(selectedValues)}
         name="tagName"
       /> 


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