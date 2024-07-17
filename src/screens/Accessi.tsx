import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5'
import Header from '../components/Header'

const Accessi=()=> {
    const navigate = useNavigate();
    const handleIndietro = () => {
        navigate("/");
      };
  return (
    <div>
      <Header />
      <nav className="flex m-2" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </a>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Accessi e Permessi</span>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex items-center justify-between px-10 mt-2 border-b-2 pb-5">
        <button onClick={handleIndietro} className="flex items-center text-yellow-600 hover:text-yellow-700 focus:outline-none">
          <IoArrowBackCircle className="mr-2" size={40} />
        </button>
        <h1 className='text-center text-5xl font-bold flex-grow text-yellow-500'>
          ACCESSI E PERMESSI
        </h1>
      </div>


    </div>
  )
}

export default Accessi