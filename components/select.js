import React from 'react'
import styles from '../styles/Select.module.css'

export default function Select({action, children, value, name}) {
  return (
    <select  className={styles.slct} onChange={action} value={value} name={name}>{children}</select>
  )
}
