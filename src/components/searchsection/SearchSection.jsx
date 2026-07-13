import styles from "../searchsection/searchsection.module.scss"

export default function SearchSection() {
    return (
        <>
            <form className={styles.searchForm} >
                <input type="search" placeholder="Search here"/>
                <button>Log in</button>
            </form>
        </>
    )
}