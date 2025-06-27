import SurveyComponent from "./components/Survey";
import "./App.css";

function App() {
  return (
    <>
      <div className="header">
        <img src="/public/assets/99_Division.png"></img>
        <h1>הטבות קרן הסיוע למילואים - 2025</h1>
      </div>
      <p>ענו על על השאלות מטה וקבלו את רשימת ההטבות אליהן אתם זכאים!</p>
      <SurveyComponent />
    </>
  );
}

export default App;
