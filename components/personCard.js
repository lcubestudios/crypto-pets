import React, { useState } from 'react'

import Image from 'next/image'

const PersonCard = ({
	name,
	email,
	phone_number,
	country,
	ens,
	public_address
}) => {
	const [isExpanded, setIsExpanded] = useState(false)
  return (
		<div 
			className="info-card bg-white rounded-lg p-8 md:p-10 lg:p-12 md:pointer-events-none clip-text"
			onClick={() => {
				setIsExpanded(!isExpanded)
			}}
		>
			<div className={`flex ${
				isExpanded
				? 'flex-col text-center'
				: 'flex-row text-left'
			} md:flex-row md:text-left items-center gap-8 md:gap-10 lg:gap-12`}>
				<div className="rounded-full bg-primary w-100px md:w-200px overflow-hidden">
					<Image 
						src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80" 
						alt="Person"
						width="100%"
						height="100%"
						layout="responsive"
					/>
				</div>
				<div className="flex-1 h-full flex flex-col justify-center">
					<h1 className="text-h6 mb-4">{name}</h1>
					{ email ? <p className="mb-2">{email}</p> : '' }
					{ phone_number ? <p className="mb-2">{phone_number}</p> : '' }
					<div className={`${ isExpanded ? 'block' : 'hidden' } md:block`}>
						{ country ? <p className="mb-2">{country}</p> : '' }
						{ ens ? <p className="mb-2">{ens}</p> : '' }
						{ public_address ? <p className="mb-2">{public_address}</p> : '' }
					</div>
				</div>
			</div>
		</div>
  )
}

export default PersonCard;