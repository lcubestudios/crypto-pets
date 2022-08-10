import React from 'react'

const button = ({
	label = '',
	onClick = () => {}
}) => {
  return (
		<button className="bg-primary text-white px-6 py-2 rounded-sm" onClick={onClick}>
			{label}
		</button>
  )
}

export default button;