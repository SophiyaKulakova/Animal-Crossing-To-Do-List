import { PropsType } from "./shared/models/task.model";
import { useState, ChangeEvent, KeyboardEvent }  from 'react';


export function Todolist(props: PropsType): JSX.Element {
  let [error, setError] = useState("")
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError("");
    if (e.key === 'Enter') {
      props.addTask(newTaskTitle) 
      setNewTaskTitle("");
    } 
  }

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim()) 
      setNewTaskTitle("");
    } else {
        setError("Field is required")
    }
  }
  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active"); 
  const onComletedClickHandler = () => props.changeFilter("completed");
  
  return (
    <div>
      <header className="header">
        <a href="/" className="app-name">Animal Crossing To-Do List</a>
      </header>
      <div className="main-container">
        <div></div>
        <div className="to-do-container">
          <h3 className="dailytodo">{props.title}</h3>
          <div>
            <input value = {newTaskTitle} 
              onChange = {onNewTitleChangeHandler}
              onKeyDown = {onKeyDownHandler}
              className={error ? "error" : ""}
            />
            <button onClick={addTask} className="plus-button">+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
          <ul className="to-do-list">
            {
              props.tasks.map( t => {
                const onRemoveHandler = () => props.removeTask(t.id);
                const onChangeHadler = (e: ChangeEvent<HTMLInputElement>) => { 
                  props.changeTaskStatus(t.id, e.currentTarget.checked)
                };

                return <li key = {t.id} className={`li-item ${t.isDone ? "li-done" : ""}`}>
                  <input type="checkbox" className="checkmark-input"
                    onChange={onChangeHadler}
                    checked={t.isDone}></input>
                  <span>{t.title}</span>
                  <button onClick={onRemoveHandler}>
                    <img className="img-delete-button" src="icons/trash.svg" alt="img-delete-button"></img>
                  </button>
                </li>
                })
            }
          </ul>
          <div className="filter-buttons">
            <button className = {props.filter === "all" ? "active-filter" : "nonactive-filter"}
                    onClick={onAllClickHandler}>All</button>
            <button className = {props.filter === "active" ? "active-filter" : "nonactive-filter"} 
                    onClick={onActiveClickHandler}>Active</button>
            <button className = {props.filter === "completed" ? "active-filter" : "nonactive-filter"} 
                    onClick={onComletedClickHandler}>Completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todolist;
