
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Create from "./components/Create";
import MovieDetails from "./pages/MovieDetails";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React from "react";
import NotFound from "./pages/NotFound";
 import EditMovie from "./pages/EditMovie";
function App() {
  return (
      <Router>
        <div className="App">
          <Navbar />

          <div className="content">
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route exact path="/create"><Create /></Route>
              <Route path="/movies/:id"><MovieDetails /></Route>
              <Route path="/editMovie/:id"><EditMovie /></Route>
              <Route path="*"><NotFound/></Route>
            </Switch>
          </div>
        </div>
      </Router>
  );
}
export default App;
