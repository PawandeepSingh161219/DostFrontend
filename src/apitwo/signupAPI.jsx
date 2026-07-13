import axios from "axios";

export async function signupUser(payload){
    try{
        const res=await axios.post(
            `${API_BASE_URL}${PATH.Signup}`,
            payload
        );
        return res.data;
    }catch(err){
        console.error("Signup error:", err  
        )
    }
}