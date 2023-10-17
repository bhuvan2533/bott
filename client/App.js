import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import WelcomeScreen from "./Components/ClientScreens/WelcomeScreen/WelcomeScreen.jsx";
import ChatScreen from "./Components/ClientScreens/ChatInterface/ChatInterface.jsx";
import AdminScreen from "./Components/AdminScreens/AdminLogin/AdminLogin.jsx"
import AdminHomepage from "./Components/AdminScreens/AdminHomepage/AdminHomepage.jsx";
import ManageUsers from "./Components/AdminScreens/ManageUsers/ManageUsers.jsx";
import Addusers from "./Components/AdminScreens/ManageUsers/Addusers.jsx";
import ManageQuestions from "./Components/AdminScreens/ManageQuestions/ManageQuestions.jsx";
import AddQuestions from "./Components/AdminScreens/ManageQuestions/AddQuestions.jsx";
import ViewQuestions from "./Components/AdminScreens/ManageQuestions/ViewQuestions.jsx";
import BroadcastMessage from "./Components/AdminScreens/AdminHomepage/BroadcastMessage.jsx";
import ViewTickets from "./Components/AdminScreens/ManageQuestions/ViewTickets.jsx";
import UpdateQuestions from "./Components/AdminScreens/ManageQuestions/UpdateQuestions.jsx";

function App() {
  return (
    <div className="App">
      {/* Hello Ganesha */}
      <Router>
        <Routes>
          
          <Route path="/" exact element={<WelcomeScreen />} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/admin">
            <Route exact index={true} element={<AdminScreen />} />
            <Route path="home" element={<AdminHomepage />}  />
            <Route path="manage-users">
                <Route exact index={true} element={<ManageUsers />} />
                <Route path="add-user" element={<Addusers />} />
            </Route>
            <Route path="questions">
                <Route exact index={true} element={<ManageQuestions />} />
                <Route path="add-qa" element={<AddQuestions />} />
                <Route path="view-qa" element={<ViewQuestions />} />
                <Route path="view-tickets" element={<ViewTickets />} />
                <Route path="update-question/:questionId" element={<UpdateQuestions />} />
            </Route>
            <Route path="broadcast" element={<BroadcastMessage />}  />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
