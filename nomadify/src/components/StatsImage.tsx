import React from 'react';
import Image from 'next/image';
import CountUp from 'react-countup';

interface StatsImageProps {
  icon: string;
  count: number;
  label: string;
}

const StatsImage: React.FC<StatsImageProps> = ({ icon, count, label }) => (
  <div className="flex gap-5 items-center mt-20">
    <Image src={icon} height={50} width={50} alt={`${label}-icon`} />
    <h3 className="text-3xl">
      <CountUp end={count} duration={4} />+ {label}
    </h3>
  </div>
);

export default StatsImage;