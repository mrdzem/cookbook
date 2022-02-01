import { Link, useNavigate } from 'react-router-dom'
import { useState} from 'react'
import React from 'react'
import axios from 'axios'
import styles from './styles.module.css'



// const Login = (prop) => {
function Login(props){

    //const {user, setUser} = useContext(UserContext);

    const [data,setRegisterData] = useState({
        email: "",
        password: ""
    });

    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setRegisterData({...data, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const url = "http://localhost:5002/api/v1/auth";
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data: res } = await axios.post(url, data, config);
            // localStorage.setItem("token", res.token);
            // localStorage.setItem("userName", res.userName);
            localStorage.setItem("userInfo", res.token);
			      
            //props.data();
            window.location = "/";
        }catch(error){
            if(error.response && error.response.status >= 400 && error.response.status <= 500){
                setError(error.response.data.message);
                //navigate("/login");
            }
        }
    };

    return (
        <div class="card" style={{width: "32rem", display: "flex", justifyContent: "center", 
        left: "50%",
        transform: "translate(-50%, 0%)"}}>
            <form onSubmit={handleSubmit}>
                <div className="card-body">
                    <label className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        required
                    />
                </div>
                <div className="card-body">
                    <label className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1"
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                        required
                    />
                </div>
                <div className="card-body" style={{textAlign:"center"}}>
                {error && <div className={styles.error_msg} style={{textAlign:"center"}}>{error}</div>}
                <button 
                    type="submit" 
                    className="btn btn-primary btn-rounded"   
                >Log in</button>
                </div>
            </form>
            <div className="card-body">
            Don't have an account? <Link to={"/register"}>Register here</Link>
            </div>
        </div>
        
    )
};

export default Login