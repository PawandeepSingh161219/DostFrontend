import { useState } from "react";
import styles from "../data/DataTable.module.scss"
import CheckBox from "../checkbox/Checkbox";
export default function DataTable(
    {
    columns = [],
    data = [],
    isCheckbox = false,
    onCheckBoxChange = ()=>console.log("change")
    }
) {
    return (
        <>
        <div className={styles.tableContainer}>
            <table border={1}>
                <thead>
                    <tr>
                        {
                            isCheckbox&&<th></th>
                        }
                        {columns?.map((column) => (
                            <th key={column.key}>{column.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {
                                    isCheckbox &&(<CheckBox label={row} onCheckBoxChange={onCheckBoxChange} />)
                                }
                                {columns.map((column) => (
                                    <td key={column.key}>{row[column.key]}</td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        </>
    );
}