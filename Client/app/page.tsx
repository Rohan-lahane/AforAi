'use client'
import Login from '@/Components/Login'
import styles from './page.module.css'
import Link from 'next/link'
import LanguageSelect from '@/Components/LanguageSelect'


 const HomePage=()=> {

 

  return (
    <main className='landing-page'>
     <p>A for Ai.</p>
     <div className='landing-buttons'>
     <Link href='/signup'><button>Sign Up</button></Link>
     <Link href='about'><button>About A for Ai</button></Link>
     </div>
     
    </main>
  )
}

export default HomePage
