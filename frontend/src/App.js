import { Toaster } from 'react-hot-toast';
import Product from './component/Product';
import { createContext, useState } from "react"

export const Context = createContext({});
export const server = "https://corsproxy.io/?https://inventory-management-53wd.onrender.com"

function App() {

  const [isAuthenticated, setisAuthenticated,] = useState(false)
  const [user, setUser,] = useState([])
  const [isloading, setisloading] = useState(false)


  return (
    <div className="App">
      <Context.Provider value={{
        isAuthenticated,
        setisAuthenticated,
        user,
        setUser,
        isloading,
        setisloading
      }} >
        < Product />
        <Toaster />
      </Context.Provider>
    </div>
  );
}

export default App;
