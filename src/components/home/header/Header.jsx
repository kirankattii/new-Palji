import React, { useEffect, useState } from "react"
import { assets } from "../../../assets/assets.js"
import "./header.css"
import Loader from "../loader/Loader.jsx"

const Header = () => {
	const [isloading, setIsLoading] = useState(true)
	const [animate, setAnimate] = useState(false)
	useEffect(() => {
		const fakeDataFetch = () => {
			setTimeout(() => {
				setIsLoading(false)
			}, 1000)
		}
		setAnimate(true)
		fakeDataFetch()
	}, [])
	return (
		<div className={`header ${animate ? "initial" : ""}`}>
			<h1>
				Heaven<span>lyBake</span>
			</h1>
			<div className="cup-cakes">
				<img
					src={assets.cup_cakes}
					alt=""
				/>
			</div>
		</div>
	)
}

export default Header
