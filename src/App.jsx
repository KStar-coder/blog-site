import { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from "./components"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .catch((e) => {
        console.log("Loading error : ", e);
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gradient-to-b from-[#032030] via-[#003554] to-[#004D74] ">
      <div className="w-full block">
        < Header />
        <main>
          {/* <Outlet /> */}
        </main>
        <Footer />
      </div >
    </div >
  ) : (null)
}

export default App
