import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthControler';
import GoogleButton from 'react-google-button';
import { useEffect } from 'react';
import { get, ref, set } from 'firebase/database';
import { database } from '../config/firebase';
import logo from '../images/SCAM.svg'
import '../App.css'
import arrow from '../images/curve-arrow.png'

const SignIn = () => {
  const navigate = useNavigate();
  const { googleSignIn, user } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const updateUser = async () => {
      if (user && user.uid) {
        const starRef = ref(database, 'users/');
        const items = await get(starRef);
        const data = items.val();
        const isPresent = data && data[user.uid];
        console.log(isPresent);

        if (!isPresent) {
          try {
            await set(ref(database, `users/${user.uid}`), {
              name: user.displayName,
              userId: user.uid
            });
            navigate('/account');
          } catch (error) {
            console.log("error", error);
          }
        } else {
          navigate('/account');
        }
      }
    };

    updateUser();
  }, [user, navigate]);

  return <section className='flex' >
     

   <div className='w-full lg:w-1/3  bg-green-300 text-4xl pt-2 m-0 h-screen overflow-hidden'> {/*login page */}

      <div className='flex justify-center'>

        <div  className='img-container mt-20 bg-red-50'>
          <img src={logo} alt="logo"  />
          </div>
          
      </div>
    <h1 className='font-gFont ml-7 mt-16 text-center'>hey! welcome , </h1>
    <p className='font-thin text-base  ml-12 text-center'>Click on the following button to get started</p>


<div className='flex justify-center'>

    <GoogleButton
      style={{marginTop:"60px" , backgroundColor:"black",color:'white',border:"none", borderRadius:"5px" , padding:"5px",height:"62px", fontFamily:"gFont"}}
      type='light'
      label='Continue with Google'
      onClick={handleGoogleSignIn} />
      
</div>
    <h3 className='mt-20 text-lg font-gFont text-center text-gray-700 '>● Easy to login ● Safe ● Reliable</h3>
    </div>
    
   {/* second portion starts here */}
  
    <div className='bg-black hidden lg:flex lg:w-2/3'>
  <div className='flex flex-col w-full'>
    <h1 className='text-rose-50 md:w-48 font-bold ml-10 mt-10 customBorder rounded p-2 h-12 font-gFont text-2xl'>
      SCAM SELLER
    </h1>
      <h3 className='text-green-50 font-bold text-xl mt-32   font-gFont2 text-center '>There are <span className='circle'>45%</span> chances of you loosing money while shopping online, <br /><br /><br />so we make sure you count yourself in <span className='circle'>55%</span></h3>
      <img src={arrow} alt="arrow" width={"200px"}  />
    {/* two rings */}
    <div className='text-white margin  flex center items-center text-center'>
      <h2 className='custom-circle font-gFont2 text-lg mt-5'>File a <br /> complaint</h2>
      <h2 className='custom-circle mt-5  font-serif text-lg overlapping font-gFont2'>Search shddy <br />sellers</h2>
      </div>
      
      
  </div>
</div>


  </section>
};

export default SignIn;
