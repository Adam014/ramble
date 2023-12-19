// StatsImage.tsx
import React from 'react';
import Image from 'next/image';
import { CountUp } from 'use-count-up';

interface StatsImageProps {
  icon: string;
  count: number;
  count_start: number;
  label: string;
}

const StatsImage: React.FC<StatsImageProps> = ({ icon, count, count_start, label }) => (
  <div className='flex w-1/3'>
    <div className="flex items-center mt-12">
      <Image src={icon} height={80} width={80} alt={`${label}-icon`} />
      <div>
        <h3 className='text-5xl ml-16'>
          +<CountUp isCounting start={count_start} end={count} duration={5} thousandsSeparator=','/>
        </h3>
        <p className='ml-16'>{label}</p>
      </div>
    </div>
  </div>
);

export default StatsImage;
