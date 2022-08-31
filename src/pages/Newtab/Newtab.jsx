import React, { useState } from 'react';
import './Newtab.css';
import './Newtab.scss';

import { FrappeGantt, Task, ViewMode } from "react-frappe-gantt";
import { useEffect } from 'react';

let d1 = new Date();
let d2 = new Date();
d2.setDate(d2.getDate() + 30);
let d3 = new Date();
d3.setDate(d3.getDate() + 90);
let d4 = new Date();
d4.setDate(d4.getDate() + 180);

const tasks = [
  {
    id: "Task 1",
    name: "SD",
    start: d1,
    end: d2,
    progress: 10,
    dependencies: ""
  },
  {
    id: "Task 2",
    name: "DD",
    start: d2,
    end: d3,
    progress: null
    // dependencies: "Task 1"
  },
  {
    id: "Task 3",
    name: "CD",
    start: d3,
    end: d4,
    progress: 0,
    dependencies: "Task 2"
  }
];

const viewModes = [
  "Quarter Day", // 0
  "Half Day",    // 1
  "Day",         // 2
  "Week",        // 3
  "Month",       // 4
  "Year"         // 5
]

// update Tasks state
const setInputValue = (input, value) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
  nativeInputValueSetter.call(input, value);

  const inp = new Event('change', { bubbles: true });
  input.dispatchEvent(inp);

  // const blur = new Event('blur', { bubbles: true });
  // input.dispatchEvent(blur);
}

const toDate = (date) => date.toJSON().slice(0, 10).replaceAll('-', '/');

const Newtab = ({ phases }) => {
  const [view, setView] = useState(viewModes[4]);
  const [tasks, setTasks] = useState(phases);


  const setDate = (start, end, selectedTask) => {
    const sDOM = selectedTask.startDOM;
    const eDOM = selectedTask.endDOM;

    setInputValue(sDOM, toDate(start));
    setInputValue(eDOM, toDate(end));
  };

  const updateTasks = (task, start, end) => {
    let newTasks = [...tasks];

    const selectedTask = newTasks.find((phase) => phase.id === task.id);
    const index = newTasks.indexOf(selectedTask);
    newTasks[index]['start'] = start;
    newTasks[index]['end'] = end;

    setTasks(newTasks);
    setDate(start, end, selectedTask);
  }

  useEffect(() => {
    document.querySelectorAll('.bar-progress').forEach(e => e.remove());
  });

  return (
    <div className="App">
      <FrappeGantt
        tasks={phases}
        viewMode={view}
        onClick={task => console.log(task, "click")}
        onDateChange={updateTasks}
        onProgressChange={(task, progress) =>
          console.log(task, progress, "progress")
        }
        onTasksChange={tasks => console.log()}
      />

      <div className="Btns">
        <button onClick={() => setView('Week')}>Week</button>
        <button onClick={() => setView('Month')}>Month</button>
        <button onClick={() => setView('Year')}>Year</button>
      </div>
    </div >
  );
};

export default Newtab;
