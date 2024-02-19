import { Navbar } from "./layout/Navbar";
import "./App.scss";
import { Sidebar } from "./shared/components/sidebar/Sidebar";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <div>XD</div>
      </div>
    </>
  );
}

export default App;
