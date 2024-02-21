import { Navbar } from "./layout/Navbar";
import "./App.scss";
import { Sidebar } from "./shared/components/sidebar/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DeploymentsList } from "./features/deployments-list/DeploymentsList";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <BrowserRouter>
          <Routes>
            <Route path="/deployments" element={<DeploymentsList />} />
          </Routes>
          
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
