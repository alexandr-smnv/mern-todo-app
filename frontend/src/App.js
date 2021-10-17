import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import NotesPage from "./screens/NotesPage/NotesPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import ProfilePage from "./screens/ProfilePage/ProfilePage";
import './App.css';



function App() {
  const [search, setSearch] = React.useState('');

  return (
    <BrowserRouter>
      <Header setSearch={setSearch}/>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/createnote">
          <CreateNote />
        </Route>
        <Route path="/note/:id">
          <SingleNote />
        </Route>
        <Route path="/notes">
          <NotesPage search={search}/>
        </Route>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
