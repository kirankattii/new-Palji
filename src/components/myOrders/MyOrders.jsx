import React, { useContext, useEffect, useState } from "react"
import "./myOrders.css"
import { assets } from "../../assets/assets"
import { useNavigate } from "react-router"
import { makeApi } from "../../api/callApi.tsx"

import { Link } from "react-router-dom"
// api / get - my - order
const MyOrders = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [orderStatus, setOrderStatus] = useState([])
	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				setLoading(true)
				const response = await makeApi(`/api/get-my-second-order`, "GET")
				setOrderStatus(response.data.secondorders)
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		fetchWishlist()
	}, [])
	console.log(orderStatus)
	// Check if orderStatus is populated correctly

	// console.log("Order status", orderStatus[1])
	return (
		<div className="myorders">
			<div className="userprofile-heading">
				<h1>MY ORDERS</h1>
			</div>
			<div className="order-history">
				<div className="order-summary order-summary1">
					<div>
						<p className="myproduct-name-heading">Items</p>
						<p className="myproduct-name-heading1">Name</p>
					</div>
					<p className="myprice-product">Price</p>
					<p className="mystatus-product">Status</p>
					<p style={{ textAlign: "center", fontSize: "20px" }}></p>
				</div>
				<hr />
				{/* <br /> */}
			</div>

			<div>
				{orderStatus.map((order) => {
					return order.CartId.orderItems.map((item) => {
						return (
							<div
								className="order-summary order-summary2"
								key={item._id}
							>
								<div>
									<img
										src={item.productId.thumbnail}
										alt={item.productId.name}
									/>
									<p className="myproduct-name">{item.productId.name}</p>
								</div>
								<p>₹{item.totalPrice}</p>

								<p>{order.status}</p>
								<Link to={`/userprofile/myorders/${order._id}`}>
									<button>View</button>
								</Link>
							</div>
						)
					})
				})}
			</div>
		</div>
	)
}

export default MyOrders
