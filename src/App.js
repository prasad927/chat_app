import './App.css';
import { Button } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Components/Pages/HomePage';
import ChatPage from './Components/Pages/ChatPage';


/*proxy property used for connectiong frontend and backend which is run on diff ports*/
function App() {
  return (
    <div className="App">
          <Routes>
            <Route exact path="/" element={<HomePage/>}></Route>
            <Route path="/chats" element={<ChatPage/>}></Route>
          </Routes>
    </div>
  );
}

export default App;
