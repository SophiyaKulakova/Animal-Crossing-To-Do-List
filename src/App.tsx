import './App.css';
import Todolist from './Todolist';
import { TasksType } from './shared/models/task.model';
import { FilterValuesType } from './shared/models/filter.model';
import { useState }  from 'react';
import { v4 as uuidv4 } from 'uuid';



function App(): JSX.Element {
  let [tasks, setTasks] = useState<TasksType[]>([
    { id: uuidv4(), title: "Check the mail", isDone: true },
    { id: uuidv4(), title: "Talk to all villagers", isDone: true },
    { id: uuidv4(), title: "Check for island visitors", isDone: false }
  ]);
  console.log(tasks)

  let [filter, setFilter] = useState<FilterValuesType>("all")

  function addTask(title: string) {
    const newTask = {
      id: uuidv4(), 
      title: title, 
      isDone: false
    };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeStatus (taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
    task.isDone = isDone;
    }
    setTasks([...tasks]);
  }
     
  function removeTask(id: string): void {
    const filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
  }

  function changeFilter(value: FilterValuesType): void {
    setFilter(value);
  }

  let tasksForToDoList = tasks;
  if (filter === "completed") {
    tasksForToDoList = tasks.filter(t => t.isDone === true);
  }

  if (filter === "active") {
    tasksForToDoList = tasks.filter(t => t.isDone === false);
  }

  return (
    <div className="App">
      <Todolist title="Daily goals" 
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask} 
                changeTaskStatus={changeStatus}
                filter = {filter}
                
      />
    </div>
    );
}

export default App;
