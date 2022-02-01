import React, { useState, useEffect } from "react";
import { Multiselect } from 'multiselect-react-dropdown'
import './add-recipe.css'
import axios from 'axios'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import Dropdown from "./dropdown"
import data from "./data/ingredients.json"
import units from "./data/units.json"
import Tags from "./data/tags.json"

const AddReview = () =>  {

  useEffect(() => {
    setRecipe({...recipe, token: localStorage.getItem("userInfo")});
  }, [])

  const navigate = useNavigate();


  const [tagOptions] = useState(Tags);
  const [unitOptions] = useState(units);

  const [recipe,setRecipe] = useState({
    token: null,
    recipeTitle: null,
    recipeText: null,
    recipeImage: null,
    ingrediantList: [],
    tags: []
  });

  const [options] = useState(data);

  const [ingrediants, addIngrediant] = useState([]);

  const handleChange = (e,index) => {
    const {name, value} = e.target;
    const list = [...ingrediants];
    list[index][name] = value;
    addIngrediant(list);
  }

  const handleFormChange = ({ currentTarget: input }) => {
    setRecipe({...recipe, [input.name]: input.value});
  };

  const [error,setError] = useState("");

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    //setFileInputState(file.name);
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setRecipe({...recipe,recipeImage: reader.result});
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        
        const url = "http://localhost:5002/api/v1/recipeSubmit";
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data: res } = await axios.post(url, recipe, config);
        // localStorage.setItem("token", res.token);
        // localStorage.setItem("userName", res.userName);
        //localStorage.setItem("userInfo", res.token);
        
        //props.data();
        navigate("/");
    }catch(error){
        if(error.response && error.response.status >= 400 && error.response.status <= 500){
            setError(error.response.data.message);
            console.log(error);
            //navigate("/login");
        }
    }
};

  const handleAdd = () => {
    addIngrediant([...ingrediants, {ingrediantName:"", unit: "", amount: 0}])
  }

  const handleRemove = (e, index) => {
    e.preventDefault();
    const list = [...ingrediants];
    list.splice(index,1);
    addIngrediant(list);
  }

    const handleDropdown = (data,index) => {
      const list = [...ingrediants];
      list[index]["ingrediantName"] = data.ingrediantName;
      addIngrediant(list);
      setRecipe({...recipe,ingrediantList: ingrediants})
    }

    const handleUnit = (data,index) => {
      const list = [...ingrediants];
      list[index]["unit"] = data.unit;
      addIngrediant(list);
      setRecipe({...recipe,ingrediantList: ingrediants})
    }

    const handleTags= (data) => {
      setRecipe({...recipe, tags: data});
    }
    
  return (
    <div className="App">

                      
      <form>
        
        <div className="mb-3">
          <label className="form-label">Recipe Title</label>
          <br/>
          <input 
            type="text"
            className="form-control"
            name="recipeTitle"
            placeholder="insert value"
            value={recipe.recipeTitle}
            onChange={handleFormChange}
          />              
        </div>
        <div className="form-outline">
          <label className="form-label">Recipe Text</label>
          <textarea 
            className="form-control" 
            id="textAreaExample" 
            style={{ height: "200px" }}
            name="recipeText"
            value={recipe.recipeText}
            onChange={handleFormChange} 
          />
          <br />
        </div>

        Select Tags:
      <Multiselect
         options={tagOptions} 
         displayValue="tagName"
         selectedValues={[]}
         onSelect={selectedValues=> handleTags(selectedValues)}
         onRemove={selectedValues=> handleTags(selectedValues)}
         name="ingrediantName"
       /> 

        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input 
            className="form-control" 
            type="file" 
            name="image" 
            value={fileInputState} 
            onChange={handleFileInput} 
          />
        </div>
        {previewSource && (
          <img 
            src={previewSource}
            className="rounded mx-auto d-block"
            alt="choosen" 
            style={{height: '400px'}} 
          />
    )}

        {ingrediants.map((item, i) => {
        return( 
          
          <div class="card" style={{margin: "5px"}}>
                <div class="row align-items-start" style={{ margin: "10px" }}>
                {/* style={{ backgroundColor: "#d8d8d8", border: "10px" }} */}
                  <div class="col">
                    <div key={i} className="mb-3">
                     <label className="form-label">Select Ingredient</label>
                      <div style={{width:"200",display:"flex"}}>
                        <Dropdown
                          options={options} 
                          prompt="Select ingredient"
                          id="id"
                          value={ingrediants[i]}
                          onChange={data => handleDropdown(data,i)}
                          label="ingrediantName"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col">
                  <div className="mb-3">
                    <label className="form-label">Insert Amount</label>
                    <br/>
                      <input 
                          type="number"
                          className="form-control"
                          name="amount"
                          placeholder="insert value"
                          value={item.amount}
                          style={{ width: "200px" }}
                          onChange={e => handleChange(e,i)}
                        />
                </div>
                  </div>
                  <div class="col">
                  <div key={i} className="mb-3">
                     <label className="form-label">Select Unit</label>
                      <div style={{width:"200",display:"flex"}}>
                        <Dropdown
                          options={unitOptions} 
                          prompt="Select unit"
                          id="id"
                          onChange={data => handleUnit(data,i)}
                          label="unit"
                          value={ingrediants[i]}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <br/>
                  <button type="notsubmit" className="btn btn-danger" style={{ textAlign: "right"}} onClick={e => handleRemove(e,i)}>Remove</button>
                  </div>
                </div>
                  <div className="row">
                  <div>
                  <div className="col">
              
            </div>
            </div>
          </div>
          </div>
          )})}
        </form>
        <br/>
        <button type="submit" className="btn btn-primary" onClick={handleAdd}> Add Ingrediant</button>
        <br/>

        {error && <div className={styles.error_msg}>{error}</div>}
        <br/>
        <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
        <br/>
        <br/>

    </div>
  );
}

export default AddReview;