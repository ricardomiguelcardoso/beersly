import React from 'react'
import styles from '../styles/Buttons.module.css'

export default function Button({title, action, type="button"}) {
  return (
    <button className={styles.btn} onClick={action} type={type}>{title}</button>
  )
}
