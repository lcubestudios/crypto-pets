import React from 'react'

import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
	const publicAddress = 'my-public-address'
  return (
		<nav className="flex flex-row justify-around md:justify-end">
			<div className="mx-4 cursor-pointer">
				<Link href="/explore">
					<Image 
						src="/icon-explore.png"
						alt="explore"
						width="24"
						height="24"
					/>
				</Link>
			</div>
			<div className="mx-4 cursor-pointer">
				<Link href={`/user-profile/{publicAddress}`}>
					<Image 
						src="/icon-dashboard.png"
						alt="dashboard"
						width="24"
						height="24"
					/></Link>
			</div>
			<div className="mx-4 cursor-pointer">
				<Link href="/settings">
					<Image 
						src="/icon-settings.png"
						alt="settings"
						width="24"
						height="24"
					/>
				</Link>
			</div>
		</nav>
  )
}

export default Navbar;