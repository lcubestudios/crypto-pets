import React from 'react'
import axios from 'axios'

import Image from 'next/image'

import UiButton from '../components/ui/button'

const Auth = () => {
	const checkUser = async () => {
		// const key = '0x25C16626CC830F95796cA42cDC92E9F7df713dB2'
		const key = '0x25C16626CC830F95796cA42cDC92E9F7df713dB4'

		await axios
			.get(`https://api.lcubestudios.io/dev/crypto-pets-api/user_profile.php?public_address=${ key }`)
			.then(({ data }) => {
				// Check if user exists
				if (data) {
					window.location = '/dashboard'
				}
				else {
					window.location = '/register-user'
				}
			})
	}
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
			<UiButton label="Check User" onClick={checkUser} />
    </div>
  )
}

Auth.layout = 'withoutFrame';

export default Auth;