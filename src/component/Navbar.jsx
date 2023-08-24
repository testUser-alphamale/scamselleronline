import React from 'react'
import { UserAuth } from '../context/AuthControler';

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const handleSignOut = async () => {
      try {
        await logOut();
      } catch (err) {
        console.log(err);
      }
    };
  return (
    <div>
        <nav className='bg-black  text-gray-800 flex justify-between pt-3 pb-3 font-gFont'>

    <p className='sm:mx-6 mx-1 text-rose-50  pt-2 md:pt-3  text-xs  sm:text-base hello-text'>
      Hello ! <br />  {user.displayName}{' '}</p>
    <h1 className='text-rose-50 sm:w-48 w-32 font-bold text-center sm:mr-20  customBorder2 rounded sm:p-1 mt-0 p-1 sm:h-10 h-8 font-gFont sm:text-2xl mr-1 '>
      SCAM SELLER</h1>

    <div className="flex items-center">
      <button className="flex items-center mx-3  text-rose-100  pl-1 pr-1 border-circle text-sm sm:text-lg" onClick={handleSignOut}>
        Logout
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>

      </button>
    </div>
  </nav>
</div>
  )
}

export default Navbar