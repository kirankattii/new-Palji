import React, { useEffect, useState } from "react"
import "../pages/CSS/orderdetails.css"
import { assets } from "../assets/assets"
import { useParams } from "react-router"
import { makeApi } from "../api/callApi"
import Primaryloader from "../components/loaders/primaryloader"

const OrderSummary = () => {
	const [orderSummaryy, setOrderSummaryy] = useState(null)
	const { ordersummary } = useParams()
	useEffect(() => {
		const fetchOrderSummary = async () => {
			try {
				const response = await makeApi(
					`/api/get-second-order-by-id/${ordersummary}`,
					"GET"
				)
				setOrderSummaryy(response.data.secondorder)
			} catch (error) {
				console.log(error)
			}
		}
		fetchOrderSummary()
	}, [ordersummary])
	// console.log(orderSummaryy)
	if (!orderSummaryy) {
		return (
			<div
				className="loading All_Product_loader"
				style={{ height: "90vh" }}
			>
				<div className="">
					<Primaryloader />
				</div>
			</div>
		)
	}
	console.log("this is orderdetails", orderSummaryy)
	return (
		<div className="ordersummary">
			{/* <div className="order-address">
				<div className="order-shipping-address">
					<h2>Shipping Address</h2>
	
					<p>
						{orderSummaryy.shippingAddress &&
							orderSummaryy.shippingAddress.address}
					</p>
					<p>
						<span>Phone Number</span> :{" "}
						{orderSummaryy.shippingAddress &&
							orderSummaryy.shippingAddress.phonenumber}
					</p>
				</div>
				<div className="billing-shipping-address">
					<h2>Billing Address</h2>
					<p>
						{orderSummaryy.billingAddress &&
							orderSummaryy.billingAddress.address}
					</p>
					<p>
						<span>Phone Number</span> :
						{orderSummaryy.billingAddress &&
							orderSummaryy.billingAddress.phonenumber}
					</p>
				</div>
			</div>
			<hr />
			<div className="order-summary-details">
				<img
					src={
						orderSummaryy.orderItems &&
						orderSummaryy.orderItems[0].productId.thumbnail
					}
					alt=""
				/>
				<div>
					<p>
						{orderSummaryy.orderItems &&
							orderSummaryy.orderItems[0].productId.name}
					</p>
					<p>
						Quantity : <span> </span>
						{orderSummaryy.orderItems && orderSummaryy.orderItems[0].quantity}
					</p>
					<p>
						Price : ₹
						{orderSummaryy.orderItems && orderSummaryy.orderItems[0].totalPrice}
					</p>
				</div>
				<div>
					<p>
						Order Placed :{" "}
						{orderSummaryy.createdAt &&
							new Date(orderSummaryy.createdAt).toLocaleDateString()}
					</p>
					<p>
						Delivered :{" "}
						{orderSummaryy.deliveredAt &&
							new Date(orderSummaryy.deliveredAt).toLocaleDateString()}
					</p>
				</div>
				<p>{orderSummaryy.status}</p>
			</div>
			<hr /> */}
			<div className="order-details-container">
				<h1>Order Details</h1>
				<div className="order-details">
					<p>
						<strong>Order ID:</strong> {orderSummaryy._id}
					</p>
					<p>
						<strong>Customer Name:</strong> {orderSummaryy.userId.firstName}{" "}
						{orderSummaryy.userId.lastName}
					</p>
					<p>
						<strong>Email:</strong> {orderSummaryy.userId.email}
					</p>
					<p>
						<strong>Mobile Number:</strong> {orderSummaryy.userId.mobileNumber}
					</p>
					{/* <p>
						<strong>Shipping Address:</strong>{" "}
						{orderSummaryy.shippingAddress.address},{" "}
						{orderSummaryy.shippingAddress.city},{" "}
						{orderSummaryy.shippingAddress.state},{" "}
						{orderSummaryy.shippingAddress.country},{" "}
						{orderSummaryy.shippingAddress.pincode}
					</p> */}
					<p>
						<strong>Status:</strong> {orderSummaryy.status}
					</p>
					<p>
						<strong>Payment Method:</strong> {orderSummaryy.paymentMethod}
					</p>
					<p>
						<strong>Payment ID:</strong> {orderSummaryy.paymentId}
					</p>
					<p>
						<strong>Is Paid:</strong> {orderSummaryy.isPaid ? "Yes" : "No"}
					</p>
					<p>
						<strong>Is Delivered:</strong>{" "}
						{orderSummaryy.isDelivered ? "Yes" : "No"}
					</p>
					<p>
						<strong>Created At:</strong>{" "}
						{new Date(orderSummaryy.createdAt).toLocaleString()}
					</p>
					<p>
						<strong>Last Updated At:</strong>{" "}
						{new Date(orderSummaryy.UpdateAt).toLocaleString()}
					</p>

					<h2>Ordered Products:</h2>
					{orderSummaryy?.CartId?.orderItems?.map((item) => (
						<div
							key={item._id}
							className="product-item"
						>
							<img
								src={item.productId.thumbnail}
								alt={item.productId.name}
							/>
							<div className="product-details">
								<h3>{item.productId.name}</h3>
								<p>
									<strong>Price:</strong> ₹{item.singleProductPrice}
								</p>
								<p>
									<strong>Quantity:</strong> {item.quantity}
								</p>
								<p>
									<strong>Total Price:</strong> ₹{item.totalPrice}
								</p>
							</div>
						</div>
					))}
					<p>
						<strong>Total Price:</strong> ₹{orderSummaryy.CartId.totalPrice}
					</p>
					<p>
						<strong>Tax Price:</strong> ₹{orderSummaryy.CartId.taxPrice}
					</p>
					<p>
						<strong>Shipping Price:</strong> ₹
						{orderSummaryy.CartId.shippingPrice}
					</p>
					<p>
						<strong>Total Product Price:</strong> ₹
						{orderSummaryy.CartId.TotalProductPrice}
					</p>
				</div>
			</div>
		</div>
	)
}

export default OrderSummary
