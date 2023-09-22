import React from 'react'
import styles from '../styles/PageHeader.module.css';
import Link from 'next/link';

export default function PageHeader({ title, description }) {
  return (
    <header className={styles.pageHeader}>
      <h1 className={styles.title}><Link href="/">{title}</Link></h1>
      {description && <h2 className={styles.description}>{description}</h2>}
    </header>
  )
}
