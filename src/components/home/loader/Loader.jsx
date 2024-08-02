import React, { useEffect, useState } from "react"
import { assets } from "../../../assets/assets"
import "./loader.css"

const Loader = () => {
	const [animate, setAnimate] = useState(false)

	useEffect(() => {
		// Set animate to true after 1 second
		const timeoutId = setTimeout(() => {
			setAnimate(true)
		}, 1000)

		return () => clearTimeout(timeoutId)
	}, [])
	return (
		<div className={`loader ${animate ? "animate" : ""}`}>
			<img
				src={assets.logo2}
				alt="Logo"
			/>
		</div>
	)
}

export default Loader
