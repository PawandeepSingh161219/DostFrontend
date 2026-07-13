import { useContext } from "react";
import { UiData } from "../context/UiData";

export default function useContextUiData(){
    return useContext(UiData);
}














































// export const useContextData = () => {
//    const context = useContext(UiData);
//    if (!context) {
//       throw new Error("Must be used inside Provider");
//    }
//    return context;
// };