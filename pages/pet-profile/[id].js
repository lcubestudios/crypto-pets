import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

const PetProfile = () => {
  const router = useRouter()
  const { id } = router.query

	const isMyPet = true
	const imgSrc = 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&h=1035&q=80'
	const name = "Pet Name" 
	const age = "Age"
	const breed = "Breed"
	const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget augue ultrices, blandit turpis id, tempus dui. Donec euismod ipsum velit, nec dictum ipsum posuere a. Praesent molestie, orci a tempus accumsan, sem mauris ultrices eros, placerat tincidunt ipsum nulla nec magna. Ut molestie varius velit a commodo. Vivamus blandit ex non erat ultricies elementum. Mauris semper, leo vel aliquet ullamcorper, odio est elementum risus, sed pharetra libero mi sit amet mauris. Suspendisse potenti. Donec congue nunc vitae diam interdum condimentum. Phasellus a mattis sem. Nullam interdum placerat felis in pellentesque.'
	const ownerImgSrc = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80'

  return (
    <div className="grid grid-cols-12">
			<div className="col-span-12 md:col-start-3 md:col-end-10 lg:col-start-4 lg:col-end-11 flex flex-col gap-8">
				<div className="square-tile rounded-lg">
					<div 
						className="cover-image w-full h-full" 
						style={{
							backgroundImage: `url('${ imgSrc }')`
						}}
					/>
				</div>
				<div className="col-span-12 flex flex-col gap-2">
					<div className="flex flex-row justify-between items-center">
						<h1 className="text-base md:text-h6">{name}</h1>
					</div>
					{ age ? <p className="text-sm md:text-base">{age}</p> : '' }
					{ breed ? <p className="text-sm md:text-base">{breed}</p> : '' }
				</div>
				<div className="col-span-12 flex flex-col gap-4">
					<h2 className="text-base md:text-h6">Owner</h2>
					<div className="rounded-full bg-primary w-60px overflow-hidden">
						<Image 
							src={ownerImgSrc} 
							alt="Person"
							width="100%"
							height="100%"
							layout="responsive"
						/>
					</div>
				</div>
				<div className="col-span-12 flex flex-col gap-4">
					<h2 className="text-base md:text-h6">Description</h2>
					<p>
						{ description }
					</p>
				</div>
			</div>
    </div>
  )
}

export default PetProfile;