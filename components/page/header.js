import React from 'react'

import Link from "next/link"
import Image from "next/image"

import PageNavbar from "./navbar"

const Header = () => {
  return (
		<header className="flex flex-row justify-center md:bg-white">
			<div className="container p-4">
				<div className="grid grid-cols-12">
					<div className="col-span-6">
						<Link href="/">
							<Image src="/logo-horizontal.png" alt="Crypto Pets" width="135" height="27" />
						</Link>
					</div>
					<div className="hidden md:block col-span-6">
						<PageNavbar />
					</div>
				</div>
			</div>
		</header>
  )
}

export default Header;