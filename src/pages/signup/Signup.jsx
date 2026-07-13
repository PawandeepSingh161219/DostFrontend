import styles from "../signup/Signup.module.scss"
import { Link } from "react-router-dom"
import { useState } from "react";
import api from "../../api/api";
import useContextUiData from "../../hooks/useContextUiData";
import { useNavigate } from "react-router-dom";
export default function Signup() {
    const navigate = useNavigate();

    // const {setLoaderInfo,toast} = useContextUiData();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSumbit = async (e)=>{   
        e.preventDefault();

        try{
            const response = await api.post("/auth/signup", formData);
           
            if(response.data.status){
      navigate("/login");
            // toast("Signup successful! Please login.");
            }
        }catch(error){
            console.error("Signup error:", error.response ? error.response.data : error.message);
        };
    }
    return (
        <>
            <div className={styles.signupPage}>
                <div className={styles.signupContainer}>
                    <h2>Create Account</h2>


                    <form onSubmit={handleSumbit} >
                        <input type="text" placeholder="Full Name" name="name" value={formData.name} onChange={handleChange}/>
                        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                        <button type="submit">Sign Up</button>
                    </form>


                    <p className="loginText">
                        Already have an account?  <Link to="/login"> Login</Link>
                    </p>
                </div>
            </div>
        </>
    )
}