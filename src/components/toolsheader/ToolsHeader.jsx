import styles from "../toolsheader/ToolsHeader.module.scss"
import { TfiReload ,  } from "react-icons/tfi"
import { IoAddSharp } from "react-icons/io5"
import { GiPencil } from "react-icons/gi";
import { ImBin } from "react-icons/im";
export default function ToolsHeader(){
    return(
        <>
        <div className={styles.toolsHeader} >
                                <div className={styles.toolone} >
                                    <TfiReload style={{color:"blue" , fontSize:"20px" }} />
                                </div>
                                <div className={styles.tooltwo}>
                                    <IoAddSharp style={{color:"blue" , fontSize:"20px" }} />
                                </div>
                                <div className={styles.toolthree}>
                                    <GiPencil style={{color:"blue" , fontSize:"20px" }} />
                                </div>
                                <div className={styles.toolfour}>
                                    <ImBin style={{color:"blue" , fontSize:"20px" }} />
                                </div>
        
                            </div>
        </>
    )
}