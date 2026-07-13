import { useState } from "react"

export default function CheckBox({label="", onCheckBoxChange = ()=>console.log("checked")}){
    const [checked,setChecked] = useState(false);
    return(
        <input type="checkbox" value={label?.name} checked={checked} onChange={(e)=>{
            setChecked(!checked);
            if(e.target.checked){
                onCheckBoxChange(label)
            }
        }}></input>
    )
}