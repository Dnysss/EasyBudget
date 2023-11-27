
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import SignUp from './user/sign up/SignUp';
import SignIn from './user/sign in/SignIn';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
