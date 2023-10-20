import Menu from "../components/Menu"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

export default function RootLayout() {
  return (
    <>
      <header>
        <h1>Software anecdotes</h1>
        <Menu />
      </header>
      <main><Outlet /></main>
      <Footer />
    </>
  )
}
