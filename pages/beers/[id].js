import Container from "../../components/container"
import Image from "next/image"
import styles from '../../styles/Beers.module.css'
import Link from "next/link"

export async function getServerSideProps(context) {
    const id = context.query.id;
    if(id.includes('beer')){
        const beers = localStorage.getItem('beers') ? JSON.parse(localStorage.getItem('beers')) : [];
        return { props: { beer: beers[0] } }
    }
    const res = await fetch(`https://api.punkapi.com/v2/beers/${id}`)
    const beers = await res.json()

    return { props: { beer: beers[0] } }
}

export default function Beers({ beer }) {
    return <Container>
        <main>
            <Link href="/" >&lt; Go back</Link>
            <article className={styles.article}>
                <div className={styles.image_container}>
                    <Image
                        src={beer.image_url}
                        alt={beer.name}
                        className={styles.image}
                        priority
                        layout="fill"
                        objectFit="contain" />
                </div>
                <div>
                    <h2>{beer.name}</h2>
                    <p>{beer.description}</p>
                    <p>Brewed in: {beer.first_brewed}</p>
                </div>
            </article>
        </main>
    </Container>
}