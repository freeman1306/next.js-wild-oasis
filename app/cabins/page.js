import React from 'react'
import Navigation from '@/app/_components/Navigation'
import Counter from '@/app/_components/Counter';
import CabinCard from '../_components/CabinCard';
import { getCabins } from '../_lib/data-service';
import CabinList from '../_components/CabinList';

export default  async function Page() {
  // CHANGE
  const cabins = await getCabins();

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      {cabins.length > 0 && (
       <CabinList />
      )}
    </div>
  );
}
