import { memo } from "react"
import styles from "../leftHeaderNavigation/filterHeaderDataContainer.module.scss"
import { CiSearch, CiEraser } from "react-icons/ci"
import { useState } from "react";

function FilterHeaderDataContainer({
    onDepartmentChange = () => console.log("DepartmentChange"),
    onSearchByName = () => console.log("NameChange"),
    onResetFilters = () => console.log("eraserFilter")
}) {
    const [searchValue, setSearchValue] = useState("");
    const [department, setDepartment] = useState("");

    /* Handle search input */
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearchByName(value);
    };

    /* Handle department dropdown */
    const handleDepartmentChange = (e) => {
        const value = e.target.value;
        setDepartment(value);
        onDepartmentChange(value);
    };

    /* Reset filters */
    const handleResetFilters = () => {
        setSearchValue("");
        setDepartment("");

        onSearchByName("");
        onDepartmentChange("");
        onResetFilters();
    };

    return (
        <div className={styles.filterHeaderDataContainer} >
            <div className={styles.searchIcon} >
                <CiSearch style={{ color: "blue", fontSize: "30px" }} />
            </div>
            <div className={styles.searchByName} >
                <input
                 type="search"
                  placeholder="Search by name..." 
                  value={searchValue}
                  onChange={handleSearchChange}
                //   onChange={(e) => onSearchByName(e.target.value)}
                   />
            </div>
            <div className={styles.searchByDepartment} >
                <select
                 id="helloji"
                 value={department} 
                 onChange={handleDepartmentChange}
                //  onChange={(e) => onHandleChange(e.target.value)}
                 >
                    <option value="">Choose Department</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Hr">Hr</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                    <option value="Engineering">Engineering</option>
                </select>

            </div>
            <button 
            type="button"
            className={styles.editData}
            onClick={handleResetFilters}
            >
                <CiEraser style={{ color: "blue", fontSize: "30px" }} />
            </button>
        </div>
    )
};

export default memo(FilterHeaderDataContainer);