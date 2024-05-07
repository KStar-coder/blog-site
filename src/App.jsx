

function App() {

  // Accessing env variable access for VITE : (Read VITE documentation for it)
  console.log(import.meta.env.VITE_APPWRITE_URL)

  return (
    <>
      <h2>A blog app with appwrite</h2>
    </>
  )
}

export default App
