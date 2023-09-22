import React from 'react'
import styles from '../styles/Modal.module.css'

export default function Modal({ children, title, closeAction, open }) {
    return (
        <>
            {open &&
                <div className={styles.modal}>
                    <div className={styles.background}></div>
                    <div className={styles.card}>
                        <div className={styles.header}>
                            <p className={styles.title}>{title}</p>
                            <span onClick={closeAction}>X</span>
                        </div>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}
