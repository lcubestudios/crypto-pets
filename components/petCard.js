import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

const PetCard = ({
	href = '#',
	imgSrc,
	name,
	age,
	breed
}) => {
  return (
		<Link href={href}>
			<div className="flex flex-col gap-2 md:gap-4">
				<div className="square-image rounded-lg">
					<Image
						src={imgSrc}
						alt={name}
						width="100%"
						height="100%"
						layout="responsive"
					/>
				</div>
				<div className="flex flex-col gap-0 md:gap-2">
					<p className="text-base md:text-h6">{name}{ age ? ` | ${age}` : '' }</p>
					{ breed ? <p className="text-sm md:text-base">{breed}</p> : '' }
				</div>
			</div>
		</Link>
  )
}

export default PetCard;