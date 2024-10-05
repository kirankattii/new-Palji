// import React, { useEffect, useState } from "react"
// import "../pages/CSS/orderdetails.css"
// import { assets } from "../assets/assets"
// import { useParams } from "react-router"
// import { makeApi } from "../api/callApi"
// import Primaryloader from "../components/loaders/primaryloader"

// const OrderSummary = () => {
// 	const [orderSummaryy, setOrderSummaryy] = useState(null)
// 	const { ordersummary } = useParams()
// 	useEffect(() => {
// 		const fetchOrderSummary = async () => {
// 			try {
// 				const response = await makeApi(
// 					`/api/get-second-order-by-id/${ordersummary}`,
// 					"GET"
// 				)
// 				setOrderSummaryy(response.data.secondorder)
// 			} catch (error) {
// 				console.log(error)
// 			}
// 		}
// 		fetchOrderSummary()
// 	}, [ordersummary])
// 	// console.log(orderSummaryy)
// 	if (!orderSummaryy) {
// 		return (
// 			<div
// 				className="loading All_Product_loader"
// 				style={{ height: "90vh" }}
// 			>
// 				<div style={{
// 					display: "flex",
// 					justifyContent: "center",
// 					alignItems: "center",
// 					height: "100%",
// 					width: "100%"
// 				}}>
// 					<Primaryloader />
// 				</div>
// 			</div>
// 		)
// 	}
// 	console.log("this is orderdetails", orderSummaryy)
// 	return (
// 		<div className="ordersummary">

// 			<div className="order-details-container">
// 				<h1>Order Details</h1>
// 				<div className="order-details">
// 					<p>
// 						<strong>Order ID:</strong> {orderSummaryy._id}
// 					</p>
// 					<p>
// 						<strong>Customer Name:</strong> {orderSummaryy.userId.firstName}{" "}
// 						{orderSummaryy.userId.lastName}
// 					</p>
// 					<p>
// 						<strong>Email:</strong> {orderSummaryy.userId.email}
// 					</p>
// 					<p>
// 						<strong>Mobile Number:</strong> {orderSummaryy.userId.mobileNumber}
// 					</p>

// 					<p>
// 						<strong>Status:</strong> {orderSummaryy.status}
// 					</p>
// 					<p>
// 						<strong>Payment Method:</strong> {orderSummaryy.paymentMethod}
// 					</p>
// 					<p>
// 						<strong>Payment ID:</strong> {orderSummaryy.paymentId}
// 					</p>


// 					<h2 className="ordered-products-name">Ordered Products:</h2>
// 					{orderSummaryy?.CartId?.orderItems?.map((item) => (
// 						<div
// 							key={item._id}
// 							className="product-item"
// 						>
// 							<img
// 								src={item.productId.thumbnail}
// 								alt={item.productId.name}
// 							/>
// 							<div className="product-details">
// 								<h3>{item.productId.name}</h3>
// 								<p>
// 									<strong>Price:</strong> ₹{item.productId.PriceAfterDiscount}
// 								</p>
// 								<p>
// 									<strong>Quantity:</strong> {item.quantity}
// 								</p>
// 								<p>
// 									<strong>Total Price:</strong> ₹{item.totalPrice}
// 								</p>
// 							</div>
// 						</div>
// 					))}
// 					<p>
// 						<strong>Total Price:</strong> ₹{orderSummaryy.CartId.TotalProductPrice}
// 					</p>

// 					<p>
// 						<strong>Shipping Price:</strong> ₹
// 						{orderSummaryy.CartId.shippingPrice}
// 					</p>
// 					<p>
// 						<strong>Total Product Price:</strong> ₹
// 						{orderSummaryy.CartId.TotalProductPrice}
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }

// export default OrderSummary




// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { makeApi } from "../api/callApi";
// import Primaryloader from "../components/loaders/primaryloader";
// import styles from "./OrderSummary.module.css";

// const OrderSummary = () => {
// 	const [orderSummary, setOrderSummary] = useState(null);
// 	const { ordersummary } = useParams();

// 	useEffect(() => {
// 		const fetchOrderSummary = async () => {
// 			try {
// 				const response = await makeApi(
// 					`/api/get-second-order-by-id/${ordersummary}`,
// 					"GET"
// 				);
// 				setOrderSummary(response.data.secondorder);
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		};
// 		fetchOrderSummary();
// 	}, [ordersummary]);

// 	if (!orderSummary) {
// 		return (
// 			<div className={styles.loaderContainer}>
// 				<Primaryloader />
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className={styles.orderSummary}>
// 			<div className={styles.orderDetailsContainer}>
// 				<h1 className={styles.title}>Order Details</h1>
// 				<div className={styles.orderDetails}>
// 					<p><strong>Order ID:</strong> {orderSummary._id}</p>
// 					<p><strong>Customer Name:</strong> {orderSummary.userId.firstName} {orderSummary.userId.lastName}</p>
// 					<p><strong>Email:</strong> {orderSummary.userId.email}</p>
// 					<p><strong>Mobile Number:</strong> {orderSummary.userId.mobileNumber}</p>
// 					<p><strong>Status:</strong> {orderSummary.status}</p>
// 					<p><strong>Payment Method:</strong> {orderSummary.paymentMethod}</p>
// 					<p><strong>Payment ID:</strong> {orderSummary.paymentId}</p>

// 					<h2 className={styles.orderedProductsTitle}>Ordered Products:</h2>
// 					{orderSummary?.CartId?.orderItems?.map((item) => (
// 						<div key={item._id} className={styles.productItem}>
// 							<img
// 								src={item.productId.thumbnail}
// 								alt={item.productId.name}
// 								className={styles.productImage}
// 							/>
// 							<div className={styles.productDetails}>
// 								<h3>{item.productId.name}</h3>
// 								<p><strong>Price:</strong> ₹{item.productId.PriceAfterDiscount}</p>
// 								<p><strong>Quantity:</strong> {item.quantity}</p>
// 								<p><strong>Total Price:</strong> ₹{item.totalPrice}</p>
// 							</div>
// 						</div>
// 					))}
// 					<div className={styles.totalSection}>
// 						<p><strong>Total Price:</strong> ₹{orderSummary.CartId.TotalProductPrice}</p>
// 						<p><strong>Shipping Price:</strong> ₹{orderSummary.CartId.shippingPrice}</p>
// 						<p><strong>Total Product Price:</strong> ₹{orderSummary.CartId.TotalProductPrice}</p>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default OrderSummary;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { makeApi } from "../api/callApi";
import Primaryloader from "../components/loaders/primaryloader";
import styles from "./OrderSummary.module.css";


const OrderSummary = () => {
	const [orderSummary, setOrderSummary] = useState(null);
	const { ordersummary } = useParams();

	useEffect(() => {
		const fetchOrderSummary = async () => {
			try {
				const response = await makeApi(
					`/api/get-second-order-by-id/${ordersummary}`,
					"GET"
				);
				setOrderSummary(response.data.secondorder);
			} catch (error) {
				console.log(error);
			}
		};
		fetchOrderSummary();
	}, [ordersummary]);

	if (!orderSummary) {
		return (
			<div className={styles.loaderContainer}>
				<Primaryloader />
			</div>
		);
	}

	return (
		<div className={styles.invoiceContainer}>
			<h1 className={styles.invoiceTitle}>Order Details</h1>

			<div className={styles.invoiceDetails}>
				<div className={styles.billingInfo}>
					<p><strong>Customer Name: </strong> {orderSummary.userId.firstName} {orderSummary.userId.lastName}</p>
					<p><strong>Email: </strong> {orderSummary.userId.email}</p>
					<p><strong>Mobile Number: </strong> {orderSummary.userId.mobileNumber}</p>
				</div>
				<div className={styles.invoiceInfo}>
					<p><strong>Order ID:</strong> {orderSummary._id}</p>

					<p><strong>Status:</strong> {orderSummary.status}</p>
					<p><strong>Payment Method:</strong> {orderSummary.paymentMethod}</p>
					<p><strong>Issued:</strong> {new Date(orderSummary.createdAt).toLocaleDateString()}</p>
				</div>
			</div>

			<table className={styles.productTable}>
				<thead>
					<tr>
						<th>PRODUCT</th>
						<th>QTY</th>
						<th>UNIT PRICE</th>
						<th>AMOUNT</th>
					</tr>
				</thead>
				<tbody>
					{orderSummary?.CartId?.orderItems?.map((item) => (
						<tr key={item._id}>
							<td>
								<div className={styles.productInfo}>
									<img src={item.productId.thumbnail} alt={item.productId.name} className={styles.productImage} />
									<span>{item.productId.name}</span>
								</div>
							</td>
							<td>{item.quantity}</td>
							<td>{item.productId.PriceAfterDiscount}</td>
							<td>₹{item.totalPrice} </td>
						</tr>
					))}
				</tbody>
			</table>
			<div className={styles.footerSection}>
				<div className={styles.totalSection}>
					<div className={styles.totalRow}>
						<span><strong>Subtotal:</strong></span>
						<span>{orderSummary.CartId.TotalProductPrice} ₹</span>
					</div>
					<div className={styles.totalRow}>
						<span><strong>Shipping Price:</strong></span>
						<span>{orderSummary.CartId.shippingPrice} ₹</span>
					</div>
					<div className={styles.totalRow}>
						<span><strong>Total:</strong></span>
						<span>{orderSummary.CartId.TotalProductPrice} ₹</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;