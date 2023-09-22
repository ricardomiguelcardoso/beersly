// import Navbar from './navbar'
// import Footer from './footer'
import PageHeader from "./page-header"

export default function Layout({ children }) {
  return (
    <>
      <PageHeader title="Beersly" description="Your collection of Beers"/>
      {children}
    </>
  )
}