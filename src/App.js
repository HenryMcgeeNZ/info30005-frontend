import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AccountBox } from "./components/accountBox";
import styled from "styled-components";
//import "./App.css";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <AppContainer>
      <AccountBox />
    </AppContainer>

    // <div className="app">
    //   <Router>
    //     <Switch>
    //       <Route exact path="/login" component={Login} />
    //       <Route exact path="/menu" component={Menu} />
    //       <Route exact path="/orders" component={Orders} />
    //       <Route path="/*" component={Home} />
    //     </Switch>
    //   </Router>
    // </div>
  );
}

export default App;
