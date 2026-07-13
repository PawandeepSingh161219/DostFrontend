// const STORAGE_NAME = import.meta.env.VITE_STORAGE_INFO;
// export const setDataInfo = (params)=>{
//     if(params)
//         localStorage.setItem(STORAGE_NAME,JSON.stringify(params));
// }
// export const getDataInfo = ()=>{
//     return JSON.parse(localStorage.getItem(STORAGE_NAME));
// }



const STORAGE_NAME = import.meta.env.VITE_STORAGE_INFO;

export const setDataInfo = (params) => {
   if (params) {
      console.log(params)
      localStorage.setItem(STORAGE_NAME, JSON.stringify(params));
   }
};

export const getDataInfo = () => {
   const data = localStorage.getItem(STORAGE_NAME);
   return data ? JSON.parse(data) : null;
};