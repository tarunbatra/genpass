import React from 'react'
import PasswordGenerator from './PasswordGenerator'
import styles from './styles.module.css'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export { PasswordGenerator };
