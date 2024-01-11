import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Card from '../components/Card';


const sliderImage = [

  {
    url: 'https://images.pexels.com/photos/12773641/pexels-photo-12773641.jpeg',
    location: 'listing/659e93259d15ad91b5d9f719'
  },
  {
    url: 'https://images.pexels.com/photos/5531295/pexels-photo-5531295.jpeg',
    location: '/listing/659e98649d15ad91b5d9f771'
  },
  {
    url: 'https://images.pexels.com/photos/2224777/pexels-photo-2224777.jpeg',
    location: '/listing/659e99849d15ad91b5d9f77b'
  },
  {
    url: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
    location: '/listing/659e9a869d15ad91b5d9f790'
  },
  {
    url: 'https://images.pexels.com/photos/13084497/pexels-photo-13084497.jpeg',
    location: '/listing/659e9b4a9d15ad91b5d9f797'
  },


]

export default function Home() {

  const [offerListing, setOfferListing] = useState([]);
  const [saleListing, setsaleListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4&order=asc`);
        const data = await res.json();
        setOfferListing(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchOffer();

    const fetchSale = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4&order=asc`)
        const data = await res.json();
        setsaleListing(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSale();

    const fetchRent = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4&order=asc`)
        const data = await res.json();
        setRentListing(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRent();

  }, [])

  // console.log( "Offer Listing ", offerListing);
  // console.log( "sale Listing ", saleListing);
  // console.log( "rent Listing ", rentListing);

  return (
    <div>
      {/* Home Detail */}
      <div className='flex flex-col gap-5 pt-20 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl lg:text-6xl font-bold text-slate-800'>Find your next <span className='text-slate-600'>destiny</span>
          <br />
          Place with peace
        </h1>
        <div className="text-slate-400 text-xs lg:text-sm leading-loose tracking-widest">
          Wix EState will help you find your home fast, easy and comfortable.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link className='text-blue-800 text-xs sm:text-sm font-semibold hover:underline tracking-wider' to={"/search"}>
          {"Let's start now . . ."}
        </Link>
      </div>
      {/* Home Crousel */}
      <div className='max-w-7xl m-auto '>
        <div className='mx-5'>

          <h1 className='my-8 font-semibold mx-4 text-2xl'>Best Properties For You . . .</h1>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {sliderImage.map((data) => (
              <SwiperSlide key={data.location}>
                <Link to={data.location}>
                  <img
                    className='object-cover w-full h-[500px] rounded-lg'
                    src={`${data.url}`} alt="img" />

                </Link>
              </SwiperSlide>
            ))}

          </Swiper>
        </div>

        {/* Offer listings */}

        <div className="my-5">
          <div className="mx-5 my-4">
            <h2 className='font-semibold text-xl '>New Offers</h2>
            <Link className='text-blue-800 hover:underline text-sm' to={'/search?offer=true'}>Show More</Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {offerListing && offerListing.map((data) => (
              <div key={data._id} className="my-3">
                <Card listing={data} />
              </div>
            ))
            }
          </div>
        </div>

        {/* on Sale Listing */}
        <div className="mx-2">
          <div className="mx-5 my-4">
            <h1 className='text-xl font-semibold '>Listing For Sale</h1>
            <Link className='text-blue-800 hover:underline text-sm' to={'/search?type=sale'}>Show More</Link>
          </div>
          <div className="flex flex-wrap gap-3 my-3 mx-2">
            {saleListing && saleListing.length > 0 && saleListing.map((data) => (
              <div className="" key={data._id}>
                <Card listing={data} />
              </div>
            ))}
          </div>
        </div>

        {/* On Rent Listing */}
        <div className="">
          <div className="mx-5 my-4">
            <h1 className='text-xl font-semibold'>Rent Listings</h1>
            <Link className='text-blue-800 hover:underline' to={`/search?type=rent`}>Show more</Link>
          </div>
          <div className="flex flex-wrap gap-3 my-4">
            {rentListing && rentListing.length > 0 && rentListing.map((data) => (
              <div className="" key={data._id}>
                <Card listing={data} />
              </div>
            ))}
          </div>
        </div>
      </div >
    </div>
  )
}
