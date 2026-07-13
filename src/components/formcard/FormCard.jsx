import { Activity } from "react";
import styles from "../formcard/FormCard.module.scss"
import { CiCircleRemove } from "react-icons/ci";

export default function FormCard({ formType = '', onSubmit = () => console.log("submited") }) {
    return (
        <>
            <Activity mode={formType == 'login'}>


            </Activity>
            <Activity mode={formType == 'addEmployee'}>
                {/* <form onSubmit={onSubmit}> */}
                    <div className={styles.formContainer}>
                        <h2>Add New Entry</h2>

                        <form className={styles.formBox}>

                            {/* Name */}
                            <label>Name</label>
                            <input type="text" placeholder="Enter name" />

                            {/* Email */}
                            <label>Email</label>
                            <input type="email" placeholder="Enter email" />

                            {/* Department */}
                            <label>Department</label>
                            <div className={styles.selectBox}>
                                <select>
                                    <option value="">Select department</option>
                                    <option value="hr">HR</option>
                                    <option value="sales">Sales</option>
                                    <option value="it">IT</option>
                                </select>
                                <CiCircleRemove className={styles.clearIcon} />
                            </div>

                            {/* Active Checkbox */}
                            <div className={styles.checkboxRow}>
                                <input type="checkbox" id="active" />
                                <label htmlFor="active">Active</label>
                            </div>

                            {/* Buttons */}
                            <div className={styles.btnRow}>
                                <button type="button" className={styles.cancelBtn}>Cancel</button>
                                <button type="submit" className={styles.updateBtn}>Update</button>
                            </div>

                        </form>
                    </div>

                {/* </form> */}
            </Activity>
            <Activity mode={formType == 'signup'}>

            </Activity>
        </>
    )
}