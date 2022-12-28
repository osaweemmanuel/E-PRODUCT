import { useSelector } from "react-redux";
const Home = () => {
    const {isLoading}=useSelector((store)=>store.cart)

    // if(isLoading){
    //     return <h1>Loading...</h1>
    // }
    return (
     
      <div name='home' className='w-full py-64'>
        <div className='max-w-[1240px] mx-auto'>
          <div className='text-center mx-auto'>
            <h2 className='text-5xl font-bold'>
              Trusted by developers across the world
            </h2>
            <p className='text-3xl py-6 text-gray-600'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est quod,
              voluptate commodi quia debitis quisquam facere eum corporis sapiente
              at vitae sed, dolorum earum deleniti nihil, enim esse inventore
              corrupti.
            </p>
          </div>
  
          <div className='grid md:grid-cols-3 md:gap-1 px-2 text-center'>
            <div className='border py-8 shadow-xl rounded-xl'>
              <p className='text-6xl font-bold text-indigo-600'>100%</p>
              <p className="text-gray-400 mt-2">completion</p>
            </div>
  
            <div className='border py-8 shadow-xl rounded-xl md:gap-1'>
              <p className='text-6xl font-bold text-indigo-600'>24/7</p>
              <p className="text-gray-400 mt-2">delivery</p>
            </div>
  
            <div className='border py-8 shadow-xl rounded-xl'>
              <p className='text-6xl font-bold text-indigo-600'>100k</p>
              <p className="text-gray-400 mt-2">transactions</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default Home;