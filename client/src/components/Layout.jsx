import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout(){
  return (
    <div className='px-16 flex  flex-col min-h-screen'>
      <Header/>
      <Outlet/>
    </div>
  )
}
