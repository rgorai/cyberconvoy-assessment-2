import './App.css'
import { BrowserRouter } from 'react-router-dom'
import OAuthButton from './components/OAuthButton'


function App() {
  return (
    <>
      <BrowserRouter>
        {/* navbar */}

        <main>
          <OAuthButton />

          {/* <Routes>

            
          </Routes> */}
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
