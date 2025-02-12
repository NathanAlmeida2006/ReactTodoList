import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";
import "./App.css";

function App() {
  return (
    <TaskProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
