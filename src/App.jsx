
// import './App.css'
// import GlobalUiContext from './context/GlobalUiContext'
import AppProviders from './context/AppProviders'
import AppRouter from './route/AppRouter'

function App() {
  //console.log(import.meta.env.VITE_API_URL)
  return (
    <>
      <AppProviders>
        {/* <GlobalUiContext> */}
          <AppRouter />
        {/* </GlobalUiContext> */}
      </AppProviders>
    </>
  )
}

export default App
