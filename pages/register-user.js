import React from 'react'

import Image from 'next/image'

import UiButton from '../components/ui/button'

const RegisterUser = () => {
  return (
    <div className="flex flex-col items-center gap-8 pt-56">
			<div className="form-logo">
				<Image 
					src="/logo-vertical.png" 
					alt="Crypto Pets" 
					width="100%"
					height="100%"
					layout="responsive"
				/>
			</div>
			<UiButton label="Check User" />
    </div>
  )
}

RegisterUser.layout = 'withoutFrame'

export default RegisterUser;