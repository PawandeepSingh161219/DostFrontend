import DataTable from "../../components/data/DataTable"
import styles from "../dashboard/Dashboard.module.scss"
import { useState, useEffect, useCallback } from "react";
import FormCard from "../../components/formcard/FormCard";
import FilterHeaderDataContainer from "../../components/leftHeaderNavigation/filterHeaderDataContainer";
import ToolsHeader from "../../components/toolsheader/ToolsHeader";
export default function Dashboard() {
    const columns = [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Name' },
        { key: 'email', header: 'Email' },
        { key: 'department', header: 'Department' },
        { key: 'age', header: 'Age' },
    ];
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        department: ""
    });

    // const [dataLoaded, setDataLoaded] = useState([]);

    useEffect(() => {
        import("../../data.json")
            .then((res) => {
                const data = res.default;
                setAllData(data);
                setFilteredData(data);
                // setDataLoaded(res.default);
            })
            .catch((err) => console.error("Error loading JSON:", err));
    }, []);

    useEffect(() => {
        let result = [...allData];

        if (filters.name) {
            result = result.filter((item) =>
                item.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }
        if (filters.department) {
            result = result.filter((item) =>
                item.department.toLowerCase().includes(filters.department.toLowerCase())
            );
        }
        setFilteredData(result);
    }, [filters, allData]);

    // function handleSubmit() {

    // }
    const onDepartmentChange = useCallback(async (department) => {
        setFilters((prev) => ({
            ...prev,
            department
        }));

        // const res = await import("../../data.json")
        // const data = res.default;
        // setDataLoaded(data.filter((v) => v.department.toLowerCase().includes(department.toLowerCase())));
        // .then((res) => {
        //     const data = res.default;
        //     setDataLoaded(data.filter((v)=>v.department.toLowerCase().includes(department.toLowerCase())));
        // })
        // .catch((err) => console.error("Error loading JSON:", err));
    }, []);

    const onSearchByName = useCallback((name) => {
        setFilters((prev) => ({
            ...prev,
            name
        }));
        // import("../../data.json")
        //     // console.log(name)
        //     .then((res) => {
        //         const data = res.default;
        //         setDataLoaded(data.filter((value) => value.name.toLowerCase().includes(name.toLowerCase())));
        //     })
        //     .catch((err) => console.error("Error loading JSON:", err));
    }, []);

    const onResetFilters = useCallback(() => {
        setFilters({
            name: "",
            department: ""
        });
    }, []);

    function onCheckBoxChange(label) {
        console.log(label);
    }

    function handleSubmit(data) {
        console.log("Form submitted:", data);
    }

    return (
        <>
            <div className={styles.dashboardpage} >
                <div className={styles.dashboardContainerLeft} >
                    <FilterHeaderDataContainer
                        onDepartmentChange={onDepartmentChange}
                        onSearchByName={onSearchByName}
                        onResetFilters={onResetFilters}
                    />
                    {/* <DataTable columns={coloumns} data={dataLoaded} isCheckbox={true} onCheckBoxChange={onCheckBoxChange} /> */}
                    <DataTable columns={columns}
                        data={filteredData}
                        isCheckbox={true}
                        onCheckBoxChange={onCheckBoxChange} />

                </div>
                <div className={styles.dashboardContainerRight} >
                    <ToolsHeader />
                    <div className={styles.updateForm} >
                        <FormCard
                            formType="addEmployee"
                            onSubmit={handleSubmit} />
                    </div>
                </div>
            </div>
        </>
    )
}