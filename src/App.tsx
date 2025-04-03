import Labs from "./Labs";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Kambaz from "./Kambaz";
import store from "./Kambaz/store";
import { Provider } from "react-redux";
import Session from "./Kambaz/Account/Session";  

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Session> 
          <Routes>
            <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
          </Routes>
        </Session>
      </Provider>
    </HashRouter>
  );
}

export default App;
