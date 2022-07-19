import logo from './logo.svg';
import './App.css';
import SocialLogin from './Component/SocialLogin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Fileupload from './Component/Fileupload';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='' exact element={<SocialLogin />} />
          <Route path='/fileUpload' exact element={<Fileupload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
