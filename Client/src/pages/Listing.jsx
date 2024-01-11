import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking
} from 'react-icons/fa'
import Contact from '../components/Contact'


export const Listing = () => {
  const params = useParams();
  const [listData, setListData] = useState({
    imageUrls: []
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      setLoading(true);
      const ListData = async () => {
        const id = params.id;
        const res = await fetch(`/api/listing/list/${id}`)
        const data = await res.json();

        if (data.success === false) {
          setLoading(false);
          setError(true)
        }

        setListData(data)
        setLoading(false);
      }

      ListData();

    } catch (error) {
      setError(true);
      setLoading(false);
    }

  }, [params.id])

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? listData.imageUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === listData.imageUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  console.log(currentUser);

  console.log(listData);
  return (
    <main className="">

      {loading ? <h2 className='text-center animate-bounce  my-10 text-xl'>Loading <span className='animate-pulse text-black text-lg'>. . .</span> </h2> : ""}
      {error ? <p className='text-center my-10 text-xl animate-pulse text-black'>Something went wrong!</p> : ''}

      {listData && !error && !loading && (
        <>

          <div className="max-w-[1200px] h-[480px] w-full m-auto py-8 relative group">
            <img
              src={listData.imageUrls[currentIndex]}
              className=' h-full w-full rounded-2xl bg-center object-cover'
              alt='bg img' />

            {/* left arrow */}
            <div className='hidden group-hover:block absolute top-[50%] rounded-2xl translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 cursor-pointer text-white'>
              <BsChevronCompactLeft onClick={prevSlide} />
            </div>

            {/* right arrow */}
            <div className='hidden group-hover:block absolute top-[50%] rounded-2xl translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 cursor-pointer text-white'>
              <BsChevronCompactRight onClick={nextSlide} />
            </div>

            <div className="flex top-4 text-gray-700 justify-center py-2">
              {
                listData.imageUrls.map((_slide, index) => (
                  <div
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="text-2xl cursor-pointer">
                    <RxDotFilled className='hover:text-3xl' />
                  </div>
                ))
              }
            </div>
          </div>

          <div className="flex flex-col max-w-4xl mx-auto p-3  my-7 gap-4">
            <div className='flex flex-col gap-2'>
              <div className="flex flex-wrap flex-col gap-2">
                <div className='flex justify-between'>
                  <h1 className='text-[30px] font-bold'>{listData.name}</h1>
                </div>
                <p className='flex flex-wrap gap-2 items-center'>
                    <FaMapMarkerAlt className='cursor-pointer  text-green-600 gap-4' />
                    {listData.address || "India, Maharashtra, Mumbai - 3001"}
                  </p>
                <div className='flex justify-between items-center text-center'>

                  <p className='flex flex-row items-center'>
                    {listData.offer ?
                      <span className='text-black font-bold text-2xl' >₹{listData.regularPrice - listData.discountedPrice + " "}
                        <span className="line-through text-slate-600 text-sm">₹{listData.regularPrice}</span></span>
                      : <span className='text-black font-bold text-2xl'>₹{listData.regularPrice} </span>}

                  </p>
                  <div className='flex justify-end'>
                    <span className='p-2 bg-red-600 font-semibold rounded-lg ml-1'>{listData.type === 'rent' ? " For Rent" : ' For Sale'}</span>

                    {listData.discountedPrice &&
                      <span className='p-2 px-3 mx-2 bg-green-600 font-semibold rounded-lg'>Discount ₹{listData.discountedPrice}</span>
                    }
                  </div>

                </div>
              </div>
              <p> <span className='font-semibold'>Description -</span> {listData.description}</p>

              <ul className='flex flex-wrap items-center my-3 text-green-600 gap-2 sm:gap-6 font-semibold '>
                <li className='flex items-center gap-2 whitespace-nowrap'>
                  <FaBed className='text-lg' />
                  {listData.bedrooms > 1 ? `Beds ${listData.bedrooms}` : `Bad ${listData.bedrooms}`}
                </li>
                <li className='flex items-center gap-2 whitespace-nowrap ml-3'>
                  <FaBath className='text-lg' />
                  {listData.bathrooms > 1 ? `Beds ${listData.bathrooms}` : `Bad ${listData.bathrooms}`}
                </li>
                <li className='flex items-center gap-2 whitespace-nowrap ml-3'>
                  <FaParking className='text-lg' />
                  {listData.parking ? " PArking Spot" : 'No Parking Spot'}
                </li>
                <li className='flex items-center gap-2 whitespace-nowrap ml-3'>
                  <FaChair className='text-lg' />
                  {listData.furnished ? "Furnished" : "Not Furnished"}
                </li>
              </ul>
              {currentUser && currentUser._id !== listData.userRef && !contact && (
                <button onClick={() => setContact(true)} className='bg-slate-700 p-3 uppercase text-white rounded-lg hover:opacity-90 '>Contact Landlord</button>
              )}
              {contact && currentUser._id !== listData.userRef && <Contact listing={listData} />}
            </div>
          </div>


        </>
      )}


    </main>



  )
}
