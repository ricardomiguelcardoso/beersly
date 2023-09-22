"use client"
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Card from '../components/card';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../components/button';
import Modal from '../components/modal';
import Container from '../components/container';
import Select from '../components/select';

export default function Home() {
  const [beersList, setBeersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [nameBeer, setNameBeer] = useState('');
  const [descriptionBeer, setDescriptionBeer] = useState('');
  const [monthBeer, setMonthBeer] = useState('01');
  const [yearBeer, setYearBeer] = useState(1999);
  const [error, setError] = useState(false);
  const [order, setOrder] = useState('REC');

  const getAllBeers = useCallback(() => {
    setLoading(true);
    axios.get('https://api.punkapi.com/v2/beers?page=1&per_page=10').then(res => {
      const beersLocal = localStorage.getItem('beers') ? JSON.parse(localStorage.getItem('beers')) : [];//gettingn local beers
      const beersApi = res.data.map(beer => ({ id: beer.id, name: beer.name, description: beer.description, image_url: beer.image_url, first_brewed: beer.first_brewed }));//Getting and limiting the number of beers from punkapi to 10

      if (order === 'REC' || order === "OLD") {
        beersLocal.sort((a, b) => {
          if (order === 'REC') return b.id - a.id
          if (order === 'OLD') return a.id - b.id
        });
        beersApi.sort((a, b) => {
          if (order === 'REC') return b.id - a.id
          if (order === 'OLD') return a.id - b.id
        });
        setBeersList(order === 'REC' ? [...beersLocal, ...beersApi] : [...beersApi, ...beersLocal])
      }

      if (order === 'NAME') {
        const allBeers = [...beersLocal, ...beersApi]
        allBeers.sort((a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })
        setBeersList(allBeers)
      }
      if (order === 'DATE') {

        const allBeers = [...beersLocal, ...beersApi]
        allBeers.sort((a, b) => {
          const aDate = a.first_brewed.split('/');
          const aDateAux = new Date(`${aDate[1]}-${aDate[0]}-01`)
          const bDate = b.first_brewed.split('/');
          const bDateAux = new Date(`${bDate[1]}-${bDate[0]}-01`)
          if (aDateAux < bDateAux) return -1
          if (aDateAux > bDateAux) return 1
          return 0
        })
        setBeersList(allBeers)
      }
      setLoading(false);
    })
  }, [order]);

  useEffect(() => {
    getAllBeers()
  }, [])

  useEffect(() => {
    getAllBeers()
  }, [order])


  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setNameBeer(value)
        break;
      case 'description':
        setDescriptionBeer(value)
        break;
      case 'month':
        setMonthBeer(value)
        break;
      case 'year':
        setYearBeer(value)
        break;
        case 'order':
        setOrder(value)
        break;

      default:
        break;
    }
  }

  const handleSave = (e) => {
    e.preventDefault();
    if (nameBeer && descriptionBeer && yearBeer) {

      const newBeer = { id: `beer_${Date.now()}`, name: nameBeer, description: descriptionBeer, first_brewed: `${monthBeer}/${yearBeer}` };
      const beers = localStorage.getItem('beers') ? JSON.parse(localStorage.getItem('beers')) : [];
      beers.push(newBeer)
      localStorage.setItem('beers', JSON.stringify(beers))
      setModalOpen(false);
      getAllBeers();
    } else {
      setError(true)
    }
  }

  const openModal = () => {
    setNameBeer('');
    setDescriptionBeer('');
    setMonthBeer('01');
    setYearBeer(1999);
    setModalOpen(true);
    setError(false);
  }
  return (
    <>
      <Head>
        <title>Beersly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <div className={styles.top_actions}>
            <Select value={order} action={handleInput} name="order">
              <option value="REC">Recent</option>
              <option value="OLD">Oldest</option>
              <option value="NAME">Name</option>
              <option value="DATE">Date Brewed</option>
            </Select>
            <Button title="+ Add beer" action={openModal} />
          </div>
        <div className={styles.grid}>
          {!loading ? beersList.map(beer => <Card title={beer.name} href={beer.id} image={beer.image_url} key={beer.id} />) : 'Loading...'}
        </div>
        </Container>
      </main>
      <Modal title="Add new Beer" open={modalOpen} closeAction={() => setModalOpen(false)}>
        <form onSubmit={handleSave}>
          <div className={styles.form_wrapper}>
            <div>
              <span>Name</span>
              <input type='text' placeholder='Name' value={nameBeer} onChange={handleInput} name="name" />
            </div>
            <div className={styles.description}>
              <span>Description</span>
              <textarea placeholder='Description' value={descriptionBeer} name="description" onChange={handleInput}></textarea>
            </div>
            <div>
              <span>Month</span>
              <select value={monthBeer} name="month" onChange={handleInput}>
                <option value="01">Jan</option>
                <option value="02">Feb</option>
                <option value="03">Mar</option>
                <option value="04">Apr</option>
                <option value="05">May</option>
                <option value="06">Jun</option>
                <option value="07">Jul</option>
                <option value="08">Aug</option>
                <option value="09">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </select>
            </div>
            <div>
              <span>Year</span>
              <input type='number' placeholder='Year' value={yearBeer} onChange={handleInput} name="year" />
            </div>
            {error &&
              <p className={styles.error}>One or more fields are empty</p>
            }
          </div>
          <div className={styles.form_footer}>
            <Button title="Cancel" action={() => setModalOpen(false)} />
            <Button title="Save" type="submit" />
          </div>
        </form>
      </Modal>
    </>
  );
}
