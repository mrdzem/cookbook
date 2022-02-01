import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'

const Register = () => {

    const [RegisterData,setRegisterData] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setRegisterData({...RegisterData, [input.name]: input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const url = "http://localhost:5002/api/v1/user";
            const {RegisterData: res} = await axios.post(url, RegisterData);
            
            navigate("/login");
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
                <label className="form-label">User Name </label>
                <input 
                    type="userName" 
                    className="form-control" 
                    id="exampleInputusername1"
                    name="userName"
                    onChange={handleChange}
                    value={RegisterData.userName}
                    required
                />
            </div>
            <div className="card-body">
                <label className="form-label">Email address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp"
                    name="email"
                    onChange={handleChange}
                    value={RegisterData.email}
                    required
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="card-body">
                <label className="form-label">Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1"
                    name="password"
                    onChange={handleChange}
                    value={RegisterData.password}
                    required
                />
            </div>
            <div className="card-body" style={{textAlign: "center"}}>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button 
                type="submit" 
                className="btn btn-primary"
                
            >
                Register
            </button>
            </div>
        </form>
        </div> 
    )
};

export default Register