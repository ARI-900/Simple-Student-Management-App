import React from 'react'
import { Routes, Route} from "react-router-dom"
import './App.css'
import './index.css'
import Homepage from "./components/Homepage"
import LoginSignup from './components/LoginSignup'
import AddStudent from './components/AddStudent'
import UpdateStudent from './components/UpdateStudent'

function App() {
  /// update kah code lkhnah paregah

  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/add-student" element={<AddStudent />} />
      <Route path="/update-student/:id" element={<UpdateStudent />} />
    </Routes>
  );
}

export default App