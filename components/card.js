import React from 'react'
import styles from '../styles/Card.module.css'
import Image from 'next/image';
import Link from 'next/link';

export default function Card({ title, image, href }) {
    return (
        <>
            <Link className={styles.card} href={href.toString().startsWith('beer')?`beers-device/${href}`:`beers/${href}`}>
                {image &&
                    <div className={styles.image_container}>
                        <Image src={image}
                            alt="description"
                            className={styles.image}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                }
                <h3 className={styles.title}>{title}</h3>
            </Link >
        </>
    )
} 