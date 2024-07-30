
import React from 'react';
import Add1 from '../Components/IndexCom/Add1';
import MainCategory from '../Components/IndexCom/MainCategory';
import AllPost from '../Components/IndexCom/AllPost';
import Add from '../Components/IndexCom/Add';
import SecondCategory from '../Components/IndexCom/SecondCategory';
import PrayerTimesPage from '../Components/IndexCom/PrayerTimePage';
import ThreeCategory from '../Components/IndexCom/ThreeCategory';
import MoreThreeCategory from '../Components/IndexCom/MoreThreeCategory';
import FourthCategory from '../Components/IndexCom/FourthCategory';
import CurrencyRates from '../Components/IndexCom/CurrencyRates';
import FifthCategory from '../Components/IndexCom/FifthCategory';
import FifthMoreCategory from '../Components/IndexCom/FifthMoreCategory';
import Footer from '../Components/IndexCom/Footer';
// import MgCode from '../Components/MgCode';


const HomeLayout = () => {

  

  
  return (
    <div>
      <div className='grid lg:grid-cols-12 mt-12 md:mt-16   gap-3 grid-cols-1 '>
        <div className='col-span-2 md:ml-16 lg:ml-0'>
          <div className='hidden md:block'>
            <Add1 />
          </div>
        </div>

        <div className='lg:col-span-10 col-span-10 '>
        <div className='grid lg:grid-cols-8 grid-cols-1 gap-5 '>
              <div className='lg:col-span-5   col-span-1'>
                <MainCategory />
              </div>
              <div className='lg:col-span-3  col-span-1 px-2 h-[404px] w-[100%] mt-4 shadow-lg'>
                <AllPost />
              </div>
            </div>
          <Add />
         
          <div>
          
          </div>
         
          
        </div>
      </div>
      {/* <MgCode/> */}

<div className='grid lg:grid-cols-12 gap-3 justify-center items-center'>
  <div className='lg:col-span-10 col-span-1 flex justify-center items-center'>
    <SecondCategory />
  </div>
  
  <div className='lg:col-span-2 col-span-1 flex justify-center items-center'>
    <PrayerTimesPage />
  </div>
</div>


      <div>
        <ThreeCategory/>
      </div>
    
     

     

      <div className='grid mt-16 grid-cols-12  gap-5'>

<div className=' col-span-12'> 
  <MoreThreeCategory/>
</div>


</div>





   <div className='grid lg:grid-cols-12 gap-5 mt-9 '>
  <div className='lg:col-span-10  col-span-1 '>
    <FourthCategory />
  </div>
  
  <div className='lg:col-span-2 col-span-1 md:mt-12 mt-3 '>
    <CurrencyRates />
  </div>
</div>




 <div className='grid grid-cols-12 mt-16 mb-6 gap-3'>
        <div className='md:col-span-10 lg:col-span-10 col-span-12  '>
          <FifthCategory/>
       
      </div>
        
        <div className='col-span-2 hidden md:block'>
          <Add1/>

        </div>

      </div> 


      
<div className='grid grid-cols-12 mt-16 mb-6 gap-3'>
        <div className='col-span-12  '>
<FifthMoreCategory/>
      </div>
        
        

      </div>

      <Footer/>
      </div>



    
  );
};

export default HomeLayout;
