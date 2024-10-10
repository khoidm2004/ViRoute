import { useState } from 'react'
import './App.css'
import Taskbar from './components/taskbar'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
     <Taskbar />
    </>
  )
}
export default App