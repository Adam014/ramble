import React from 'react'
import Image from 'next/image'

interface TagProps {
  icon: string
  label: string
}

const Tag: React.FC<TagProps> = ({ icon, label }) => {
  return (
    <div className="tag h-9 rounded-2xl justify-center flex items-center mr-2 p-4 mb-8">
      {icon && <Image src={icon} alt="check" height={25} width={25} />}
      <h2 className={icon ? 'pl-2' : ''}>{label}</h2>
    </div>
  )
}

export default Tag
