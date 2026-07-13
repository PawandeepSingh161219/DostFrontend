
   // const value = useMemo(() => ({isLogin,setIsLogin,loader, setLoader,loginUser,loginInfo}), [isLogin, loader]);
// import { useEffect, useMemo, useState } from "react";
// import { UiData } from "./UiData";
// import Loader from "../components/loader/Loader";
// import { getDataInfo, setDataInfo } from "../utils/storage";
// import { toast } from "react-toastify";

// export default function GlobalUiProvider({ children }) {
//     const [isLogin, setIsLogin] = useState(false);
//     const [loader, setLoader] = useState(false);
//     const [loginInfo, setLoginInfo] = useState(null);

    
//     useEffect(() => {
//         const savedData = getDataInfo();
//         if(savedData?.login){
//               setLoginInfo(savedData);
//               setIsLogin(!!savedData?.login);
//         }
      
//     }, []);

//     function loginUser(data) {
//         console.log("Login data received:##########", data);
//         if (!data || !data.token) {
//     console.error("Invalid login data");
//     return;
//   }
//         setLoginInfo(data);
//         setDataInfo({
//             login: true,
//             token: data.token,
//             user: data.name
//         });
//         setIsLogin(true);
//     }

  
//     useEffect(() => {
//         const oldData = getDataInfo() || {};
//         setDataInfo({
//             ...oldData,
//             login: isLogin
//         });

//     }, [isLogin]);
// usememo wala code yahaan pr aayega jo upar likha h 

//     return (
//         <UiData.Provider value={value}>
//             <Loader isLoader={loader} />
//             {children}
//         </UiData.Provider>
//     );
// }






































































































































































// import { useEffect, useState } from "react";
// import { UiData } from "./UiData";
// import Loader from "../components/loader/Loader";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { getDataInfo } from "../utils/storage";
// export default function GlobalUiContext({ children }) 
// {
//     const [isLogin, setIsLogin] = useState(false);
//     const [loader, setLoader] = useState(false)
//     function setLoaderInfo(isLoad) {
//         setLoader(isLoad);
//     }
//     const initData = {
//         isLogin,
//         setIsLogin,
//         setLoaderInfo,
//         // toast
//     }

//     useEffect(()=>{
//         const sData = getDataInfo();
//         if(sData?.login){
//             setIsLogin(true);
//         }
//     },[])

// // sir ji se poochna h y 
// // const sData = getDataInfo();
// // setIsLogin(!!sData?.token);


// // useEffect(()=>{
// //     const sData = getDataInfo();
// //     setIsLogin(!!sData?.token);
// // },[])

//     return (
//         <>
//             <UiData.Provider value={initData}>
//                 <Loader isLoader={loader} />
//                 {children}
//             </UiData.Provider>
//         </>
//     )
// }