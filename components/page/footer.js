import React from 'react'

import PageNavbar from "./navbar"

const Footer = () => {
  return (
		<footer className="md:hidden bg-toolbar flex flex-row justify-center">
			<div className="container p-4">
				<div className="w-full">
					<PageNavbar />
				</div>
			</div>
		</footer>
  )
}

export default Footer;