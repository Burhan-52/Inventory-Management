import { Toaster } from 'react-hot-toast';
import Product from './component/Product';
import { createContext, useState } from "react"

export const Context = createContext({});

function App() {
  
  const [isAuthenticated, setisAuthenticated,] = useState(false)
  const [user, setUser,] = useState([])

  return (
    <div className="App">
      <Context.Provider value={{
        isAuthenticated,
        setisAuthenticated,
        user,
        setUser
      }} >
        < Product />
        <Toaster />
      </Context.Provider>
    </div>
  );
}

export default App;
