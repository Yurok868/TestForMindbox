import React from 'react'
import styles from '../header/Header.module.css'

export default function Header(): React.JSX.Element {
  return (
    <div className={styles.header}>
        <div>ToDoMindbox</div>
    </div>
  )
}
