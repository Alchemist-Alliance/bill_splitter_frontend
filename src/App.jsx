import "./App.css";
import { Header } from "./components";

function App() {
  return (
    <>
      <Header />
      <div className="wrapper">
        <div>
          <div className="current_trip">
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className="recent_expense">
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </>
  );
}

export default App;
