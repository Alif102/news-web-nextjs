
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


const HomeLayout = () => {

  

  
  return (
    <div>
      <div className='grid lg:grid-cols-12 mt-32   gap-3 grid-cols-1 '>
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





   <div className='grid lg:grid-cols-12 gap-3 mt-9 justify-center '>
  <div className='lg:col-span-10  col-span-1 flex justify-center items-center'>
    <FourthCategory />
  </div>
  
  <div className='lg:col-span-2 col-span-1 flex justify-center '>
    <CurrencyRates />
  </div>
</div>




 <div className='grid grid-cols-12 mt-16 mb-6 gap-3'>
        <div className='col-span-10  '>
          <FifthCategory/>
       
      </div>
        
        <div className='col-span-2'>
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
