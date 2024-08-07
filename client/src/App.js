
import './App.css';
import './Style/TaskComp.css';
import TaskList from './Components/TasksListComp.js';

function App() {
  return (
    <div className="background-container" >      

        <h1>Task Management</h1>
      <TaskList />
     
    </div>
  );
}

export default App;
