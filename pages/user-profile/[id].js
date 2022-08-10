import { useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import PersonCard from '../../components/personCard'
import PetCard from '../../components/petCard'
import UiButton from '../../components/ui/button'

const Dashboard = () => {
	const [viewType, setViewType] = useState('grid');
	const petList = [1,2,3,4]

  return (
    <div className="flex flex-col gap-8">
			<section>
      	<PersonCard 
					name="Person Name"
					email="user@email.com"
					phone_number="000 000 0000"
					country="Country of Residence"
					ens="ens-name.eth"
					public_address="Public Addess"
				/>
			</section>
			<header className="flex flex-row justify-between">
				<div className="flex felx-row items-center gap-4">
					<h4>My Pets</h4>
					{
						viewType === 'list'
						? <button onClick={() => {
							setViewType('grid')
						}}>
								<Image src="/icon-grid-view.png" alt="Grid View" width="13" height="13"/>
							</button>
						: <button onClick={() => {
							setViewType('list')
						}}>
								<Image src="/icon-list-view.png" alt="List View" width="13" height="13"/>
							</button>
					}
				</div>
				<div>
					<Link href="/register-pet">
						<UiButton label="Add a pet">Add a pet</UiButton>
					</Link>
				</div>
			</header>
			<section>
				<div className="grid grid-cols-12 gap-x-4 lg:gap-x-8  gap-y-8">
					{
						petList.map((item) => {
							return (
								// eslint-disable-next-line react/jsx-key
								<div className={`col-span-${ viewType === 'list' ? '12' : '4' }`}>
									<PetCard 
										name="Pet Name" 
										age="Age"
										breed="Breed"
										imgSrc="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&h=1035&q=80"
									/>
								</div>
							)
						})
					}
				</div>
			</section>
    </div>
  )
}

export default Dashboard;
