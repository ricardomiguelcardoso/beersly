"use client"

import Container from "../../components/container"
import styles from '../../styles/Beers.module.css'
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

export default function Beers() {
    const [beerLocal, setBeerLocal] = useState(null)
    const router = useRouter();

    useEffect(() => {
        const beersLocal = localStorage.getItem('beers') ? JSON.parse(localStorage.getItem('beers')) : [];
        if (beersLocal.length) {
            const beerLocal = beersLocal.filter(beer => beer.id === router.query.id);
            setBeerLocal(beerLocal[0])
        }
    }, [])

    return <Container>
        <main>
            <Link href="/" >&lt; Go back</Link>
            {beerLocal &&
                <article className={styles.article}>
                    <div>
                        <h2>{beerLocal.name}</h2>
                        <p>{beerLocal.description}</p>
                        <p>Brewed in: {beerLocal.first_brewed}</p>
                    </div>
                </article>
            }
        </main>
    </Container>
}