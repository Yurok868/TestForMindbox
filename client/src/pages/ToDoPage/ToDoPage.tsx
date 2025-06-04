import React, { useEffect, useState } from 'react';
import styles from './ToDoPage.module.css';
import { exampleData } from '../../widgets/data/index';

type Task = {
  text: string;
  isCompleted: boolean;
};

export function ToDoPage(): React.JSX.Element {
  const [sort, setSort] = useState<string>('All');
  const [tasks, setTasks] = useState(exampleData);
  const [tasksForShow, setTasksForShow] = useState(tasks);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const [newTask, setNewTask] = useState('');

  const changeStatus = (el: Task): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.text === el.text ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const deleteTasks = (): void => {
    setTasks((prev) => prev.filter((el) => !el.isCompleted));
  };

  const addNewTask = (): void => {
    const hasTask = tasks.some((task) => task.text === newTask);
    if (hasTask) {
      alert(`Здача с названием: "${newTask}" уже есть, создайте другую!`);
    } else {
      setTasks((prev) => [...prev, { text: newTask, isCompleted: false }]);
      setNewTask('');
    }
  };

  useEffect(() => {
    if (sort === 'All') {
      setTasksForShow(tasks);
    } else if (sort === 'Active') {
      setTasksForShow(tasks.filter((el) => !el.isCompleted));
    } else if (sort === 'Completed') {
      setTasksForShow(tasks.filter((el) => el.isCompleted));
    }
    setCount(tasks.reduce((acc, task) => acc + (!task.isCompleted ? 1 : 0), 0));
  }, [sort, tasks]);

  return (
    <div className={styles.conteiner}>
      <div className={styles.title}>todos</div>
      <div className={styles.question}>
        <div onClick={() => setShow((prev) => !prev)}>
          {!show && <img src="click.svg" alt="Completed" width={25} height={25} />}
          {show && <img src="click1.svg" alt="Completed" width={25} height={25} />}
        </div>
        <input
          placeholder="What needs to be done?"
          className={styles.input}
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addNewTask();
            }
          }}
        />
        <button className={styles.addButton} onClick={addNewTask}>
          Add
        </button>
      </div>
      {show && (
        <div className={styles.tasks}>
          {tasksForShow.length > 0
            ? tasksForShow.map((el) => (
                <div key={el.text} className={styles.oneTask} onClick={() => changeStatus(el)}>
                  <div>
                    {el.isCompleted ? (
                      <div>
                        <img src="true.svg" alt="Completed" width={30} height={30} />
                      </div>
                    ) : (
                      <div>
                        <img src="false.svg" alt="Completed" width={30} height={30} />
                      </div>
                    )}
                  </div>
                  {el.isCompleted ? (
                    <del>{el.text}</del>
                  ) : (
                    <div style={{ color: 'black' }}>{el.text}</div>
                  )}
                </div>
              ))
            : 'Нет задач в этом разделе'}
        </div>
      )}
      <div className={styles.buttons}>
        <div>{count} items left</div>
        <div className={styles.treBut}>
          <button className={sort === 'All' ? styles.active : ''} onClick={() => setSort('All')}>
            All
          </button>
          <button
            className={sort === 'Active' ? styles.active : ''}
            onClick={() => setSort('Active')}
          >
            Active
          </button>
          <button
            className={sort === 'Completed' ? styles.active : ''}
            onClick={() => setSort('Completed')}
          >
            Completed
          </button>
        </div>
        <button onClick={deleteTasks}>Clear completed</button>
      </div>
    </div>
  );
}
