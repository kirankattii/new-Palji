// import React, { useState, useEffect } from "react"
// import "./checkout.css"
// import Orderbar from "../orderbar/orderbar.jsx"
// import { makeApi } from "../../api/callApi"
// // import CartCalculation from "../cart/cartCalculation"
// import { useNavigate } from "react-router-dom"
// import SucessGIF from "../../assets/Order Placed.gif"
// import Primaryloader from "../../components/loaders/primaryloader.jsx"
// import { ToastContainer, toast } from "react-toastify"
// import CartCalculation from "../CartCalculation/cartCalculation.jsx"
// import BackButton from "../products/backButton.jsx"

// function Checkout() {
// 	const navigation = useNavigate()
// 	const [shippingAddresses, setShippingAddresses] = useState([])
// 	const [selectedAddress, setSelectedAddress] = useState(null)
// 	const [billingAddresses, setBillingAddresses] = useState([])

// 	const [selectPaymentMethod, setSelectPaymentMethod] = useState(null)
// 	const [loading, setLoading] = useState(false)
// 	const [cartItem, setCartItem] = useState([])
// 	const [selectedShippingAddress, setSelectedShippingAddress] = useState(null)
// 	const [selectedBillingAddress, setSelectedBillingAddress] = useState(null)
// 	const [currentPage, setCurrentPage] = useState("CHECKOUT")
// 	const [orderPlaced, setOrderPlaced] = useState(false)

// 	useEffect(() => {
// 		const fetchCartItem = async () => {
// 			const response = await makeApi("/api/my-cart", "GET")
// 			setCartItem(response.data)
// 		}
// 		fetchCartItem()
// 	}, [])

// 	const fetchShippingAddresses = async () => {
// 		try {
// 			setLoading(true)
// 			const response = await makeApi("/api/get-my-shiped-address", "GET")
// 			setShippingAddresses(response.data.shipedaddress)
// 			setLoading(false)
// 		} catch (error) {
// 			console.error("Error fetching shipping addresses: ", error)
// 			setLoading(false)
// 		}
// 	}
// 	const fetchBillingAddresses = async () => {
// 		try {
// 			setLoading(true)
// 			const response = await makeApi("/api/get-my-billing-address", "GET")
// 			setBillingAddresses(response.data.billingaddress)
// 			setLoading(false)
// 		} catch (error) {
// 			console.error("Error fetching shipping addresses: ", error)
// 			setLoading(false)
// 		}
// 	}

// 	useEffect(() => {
// 		fetchShippingAddresses()
// 		fetchBillingAddresses()
// 	}, [])

// 	const handleAddressSelect = (address) => {
// 		setSelectedAddress(address)
// 	}
// 	const handleShippingAddressSelect = (address) => {
// 		console.log("Selected shipping address:", address)
// 		setSelectedShippingAddress(address)
// 		console.log("Updated selected shipping address:", selectedShippingAddress)
// 	}

// 	const handleBillingAddressSelect = (address) => {
// 		console.log("Selected billing address:", address)
// 		setSelectedBillingAddress(address)
// 		console.log("Updated selected billing address:", selectedBillingAddress)
// 	}

// 	const handlepaymentmethodSelect = (payment) => {
// 		setSelectPaymentMethod(payment)
// 	}

// 	const handleSubmit = async (event) => {
// 		if (!selectPaymentMethod) {
// 			toast("Please select payment method")
// 			return
// 		}
// 		event.preventDefault()
// 		const data = {
// 			// shippingAddress: selectedAddress,
// 			// billingAddress: selectedAddress,
// 			// paymentMethod: selectPaymentMethod,
// 			// CartId: cartItem._id,
// 			shippingAddress: selectedShippingAddress,
// 			billingAddress: selectedBillingAddress, // Change selectedAddress to selectedBillingAddress
// 			paymentMethod: selectPaymentMethod,
// 			CartId: cartItem._id,
// 		}
// 		try {
// 			setLoading(true)
// 			const response = await makeApi("/api/create-second-order", "POST", data)
// 			setOrderPlaced(true)
// 			setTimeout(() => {
// 				setOrderPlaced(false)
// 				navigation("/product/all-products")
// 			}, 5000)
// 		} catch (error) {
// 			console.error("Error fetching shipping addresses: ", error)
// 		} finally {
// 			setLoading(false)
// 		}
// 	}
// 	const ManageCurrnetPage = (e) => {
// 		e.preventDefault()
// 		if (!selectedShippingAddress) {
// 			toast.error("Please select a shipping address")
// 		} else if (!selectedBillingAddress) {
// 			toast.error("Please select a billing address")
// 		} else {
// 			setCurrentPage("PAYMENT")
// 		}
// 	}
// 	const navigate = useNavigate()

// 	return (
// 		<>
// 			<ToastContainer
// 				position="top-center"
// 				autoClose={3000}
// 				hideProgressBar={false}
// 				newestOnTop={false}
// 				closeOnClick
// 				rtl={false}
// 				pauseOnFocusLoss
// 				draggable
// 				pauseOnHover
// 			/>

// 			{orderPlaced && (
// 				<div className="success-gif-container">
// 					<img
// 						src={SucessGIF}
// 						alt="Success GIF"
// 						className="success-gif"
// 					/>
// 				</div>
// 			)}
// 			{!orderPlaced && (
// 				<div className="a_checkout">
// 					{currentPage === "CHECKOUT" ? (
// 						<div>
// 							<div>
// 								<Orderbar activeOptionName="CHECKOUT" />
// 							</div>
// 							<div className="checkout_to_cart">
// 								<BackButton pageLocation="/cart" />
// 							</div>
// 							<div className="main_checkout_div">
// 								{/* Shipping address */}

// 								<div className="shipping-address-container Order_page_display_none ">
// 									<div>
// 										<div className="shipping-address-title">
// 											<h2>Shipping Address</h2>
// 											<button
// 												onClick={() => navigate("/userprofile/myaddress")}
// 											>
// 												Add New Address
// 											</button>
// 										</div>

// 										<div className="shipping-address-list">
// 											{loading && (
// 												<div>
// 													{" "}
// 													<Primaryloader />{" "}
// 												</div>
// 											)}
// 											{!loading &&
// 												shippingAddresses.map((address, index) => (
// 													<div
// 														key={index}
// 														className="address-item"
// 													>
// 														<input
// 															type="radio"
// 															id={`shipping-address-${index}`}
// 															name="shippingAddress"
// 															value={address._id}
// 															checked={selectedShippingAddress === address}
// 															onChange={() =>
// 																handleShippingAddressSelect(address)
// 															}
// 															className="address-radio"
// 														/>
// 														<label
// 															htmlFor={`shipping-address-${index}`}
// 															className="address-label"
// 														>
// 															{`${address.firstname} ${address.lastname}, ${address.address}, ${address.city}, ${address.state}, ${address.country}`}
// 														</label>
// 													</div>
// 												))}
// 										</div>
// 									</div>
// 									<div>
// 										<div className="shipping-address-title">
// 											<h2>Billing Address</h2>
// 											<button
// 												onClick={() => navigate("/userprofile/myaddress")}
// 											>
// 												Add New Address
// 											</button>
// 										</div>
// 										<div className="shipping-address-list">
// 											{loading && (
// 												<div>
// 													{" "}
// 													<Primaryloader />{" "}
// 												</div>
// 											)}
// 											{!loading &&
// 												billingAddresses.map((address, index) => (
// 													<div
// 														key={index}
// 														className="address-item"
// 													>
// 														<input
// 															type="radio"
// 															id={`billing-address-${index}`}
// 															name="billingAddress"
// 															value={address._id}
// 															checked={selectedBillingAddress === address}
// 															onChange={() =>
// 																handleBillingAddressSelect(address)
// 															}
// 															className="address-radio"
// 														/>
// 														<label
// 															htmlFor={`billing-address-${index}`}
// 															className="address-label"
// 														>
// 															{`${address.name} , ${address.address}, ${address.city}, ${address.state}, ${address.country}`}
// 														</label>
// 													</div>
// 												))}
// 										</div>
// 									</div>
// 								</div>
// 								{/* payment */}
// 								<div onClick={(e) => ManageCurrnetPage(e)}>
// 									<CartCalculation
// 										tax={cartItem.taxPrice}
// 										shipping={cartItem.shippingPrice}
// 										total={cartItem.totalPrice}
// 										CoupanApplied={cartItem.Iscoupanapplied}
// 										Final={cartItem.TotalProductPrice}
// 										ButtonName="PROCEED TO PAYMENT"
// 									/>
// 								</div>
// 							</div>
// 						</div>
// 					) : (
// 						<div>
// 							<div>
// 								<Orderbar activeOptionName="PAYMENT" />
// 							</div>
// 							<div className="checkout_to_cart">
// 								<BackButton pageLocation="/cart" />
// 							</div>
// 							<div className="main_checkout_div">
// 								<div className="shipping-address-container">
// 									<div className="shipping-address-title">Payment Method</div>
// 									<div>
// 										<div
// 											className="address-item"
// 											onClick={() =>
// 												handlepaymentmethodSelect("Cash On Delievery")
// 											}
// 										>
// 											<input
// 												type="radio"
// 												id={`Cash On Delievery`}
// 												name="shipping-address"
// 												value="Cash On Delievery"
// 												checked={selectPaymentMethod === "Cash On Delievery"}
// 												onChange={() =>
// 													handlepaymentmethodSelect("Cash On Delievery")
// 												}
// 												className="address-radio"
// 											/>
// 											<label
// 												htmlFor={`payment`}
// 												className="address-label"
// 											>
// 												Cash On Delievery
// 											</label>
// 										</div>
// 										<div
// 											className="address-item"
// 											onClick={() => handlepaymentmethodSelect("Razorpay")}
// 										>
// 											<input
// 												type="radio"
// 												id={`Razorpay`}
// 												name="shipping-address"
// 												value="Razorpay"
// 												checked={selectPaymentMethod === "Razorpay"}
// 												onChange={() => handlepaymentmethodSelect("Razorpay")}
// 												className="address-radio"
// 											/>
// 											<label
// 												htmlFor={`payment`}
// 												className="address-label"
// 											>
// 												Razorpay
// 											</label>
// 										</div>
// 									</div>
// 								</div>
// 								<div onClick={(e) => handleSubmit(e)}>
// 									<CartCalculation
// 										tax={cartItem.taxPrice}
// 										shipping={cartItem.shippingPrice}
// 										total={cartItem.totalPrice}
// 										CoupanApplied={cartItem.Iscoupanapplied}
// 										Final={cartItem.TotalProductPrice}
// 										ButtonName="PLACE ORDER"
// 									/>
// 								</div>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</>
// 	)
// }

// export default Checkout

import React, { useState, useEffect } from "react"
import "./checkout.css"
import Orderbar from "../orderbar/orderbar.jsx"
import { makeApi } from "../../api/callApi"
import { useNavigate } from "react-router-dom"
import SucessGIF from "../../assets/Order Placed.gif"
import Primaryloader from "../../components/loaders/primaryloader.jsx"
import { ToastContainer, toast } from "react-toastify"
import CartCalculation from "../CartCalculation/cartCalculation.jsx"
import BackButton from "../products/backButton.jsx"
import useCoupon from "../../hook/coupanHook.jsx"
import CouponFunctions from "../../utils/couponFunctions.jsx"

function Checkout() {
	const navigate = useNavigate()
	const [shippingAddresses, setShippingAddresses] = useState([])
	const [selectedAddress, setSelectedAddress] = useState(null)
	const [billingAddresses, setBillingAddresses] = useState([])

	const [selectPaymentMethod, setSelectPaymentMethod] = useState(null)
	const [loading, setLoading] = useState(false)
	const [cartItem, setCartItem] = useState([])
	const [selectedShippingAddress, setSelectedShippingAddress] = useState(null)
	const [selectedBillingAddress, setSelectedBillingAddress] = useState(null)
	const [currentPage, setCurrentPage] = useState("CHECKOUT")
	const [orderPlaced, setOrderPlaced] = useState(false)

	const {
		couponCode,
		setCouponCode,
		appliedCoupon,
		couponDiscount,
		applyCoupon,
		removeCoupon,
	} = useCoupon()

	useEffect(() => {
		const fetchCartItem = async () => {
			const response = await makeApi("/api/my-cart", "GET")
			setCartItem(response.data)
		}
		fetchCartItem()
	}, [])

	const fetchShippingAddresses = async () => {
		try {
			setLoading(true)
			const response = await makeApi("/api/get-my-shiped-address", "GET")
			setShippingAddresses(response.data.shipedaddress)
			setLoading(false)
		} catch (error) {
			console.error("Error fetching shipping addresses: ", error)
			setLoading(false)
		}
	}

	const fetchBillingAddresses = async () => {
		try {
			setLoading(true)
			const response = await makeApi("/api/get-my-billing-address", "GET")
			setBillingAddresses(response.data.billingaddress)
			setLoading(false)
		} catch (error) {
			console.error("Error fetching billing addresses: ", error)
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchShippingAddresses()
		fetchBillingAddresses()
	}, [])

	const handleAddressSelect = (address) => {
		setSelectedAddress(address)
	}

	const handleShippingAddressSelect = (address) => {
		console.log("Selected shipping address:", address)
		setSelectedShippingAddress(address)
		console.log("Updated selected shipping address:", selectedShippingAddress)
	}

	const handleBillingAddressSelect = (address) => {
		console.log("Selected billing address:", address)
		setSelectedBillingAddress(address)
		console.log("Updated selected billing address:", selectedBillingAddress)
	}

	const handlePaymentMethodSelect = (payment) => {
		setSelectPaymentMethod(payment)
	}

	const handleSubmit = async (event) => {
		if (!selectPaymentMethod) {
			toast("Please select a payment method")
			return
		}
		event.preventDefault()
		const data = {
			shippingAddress: selectedShippingAddress,
			billingAddress: selectedBillingAddress,
			paymentMethod: selectPaymentMethod,
			CartId: cartItem._id,
		}
		try {
			setLoading(true)
			const response = await makeApi("/api/create-second-order", "POST", data)
			setOrderPlaced(true)
			setTimeout(() => {
				setOrderPlaced(false)
				navigate("/product/all-products")
			}, 5000)
		} catch (error) {
			console.error("Error placing order: ", error)
		} finally {
			setLoading(false)
		}
	}

	const manageCurrentPage = (e) => {
		e.preventDefault()
		if (!selectedShippingAddress) {
			toast.error("Please select a shipping address")
		} else if (!selectedBillingAddress) {
			toast.error("Please select a billing address")
		} else {
			setCurrentPage("PAYMENT")
		}
	}

	// Calculate final price after applying coupon discount
	const calculateFinalPrice = () => {
		if (appliedCoupon) {
			return cartItem.TotalProductPrice * ((100 - couponDiscount) / 100)
		}
		return cartItem.TotalProductPrice
	}

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			{orderPlaced && (
				<div className="success-gif-container">
					<img
						src={SucessGIF}
						alt="Success GIF"
						className="success-gif"
					/>
				</div>
			)}
			{!orderPlaced && (
				<div className="a_checkout">
					{currentPage === "CHECKOUT" ? (
						<div>
							<Orderbar activeOptionName="CHECKOUT" />
							<div className="checkout_to_cart">
								<BackButton pageLocation="/cart" />
							</div>
							<div className="main_checkout_div">
								{/* Shipping and Billing Addresses */}
								<div className="shipping-address-container Order_page_display_none">
									<div>
										<div className="shipping-address-title">
											<h2>Shipping Address</h2>
											<button
												onClick={() => navigate("/userprofile/myaddress")}
											>
												Add New Address
											</button>
										</div>

										<div className="shipping-address-list">
											{loading && <Primaryloader />}
											{!loading &&
												shippingAddresses.map((address, index) => (
													<div
														key={index}
														className="address-item"
													>
														<input
															type="radio"
															id={`shipping-address-${index}`}
															name="shippingAddress"
															value={address._id}
															checked={selectedShippingAddress === address}
															onChange={() =>
																handleShippingAddressSelect(address)
															}
															className="address-radio"
														/>
														<label
															htmlFor={`shipping-address-${index}`}
															className="address-label"
														>
															{`${address.firstname} ${address.lastname}, ${address.address}, ${address.city}, ${address.state}, ${address.country}`}
														</label>
													</div>
												))}
										</div>
									</div>
									<div>
										<div className="shipping-address-title">
											<h2>Billing Address</h2>
											<button
												onClick={() => navigate("/userprofile/myaddress")}
											>
												Add New Address
											</button>
										</div>
										<div className="shipping-address-list">
											{loading && <Primaryloader />}
											{!loading &&
												billingAddresses.map((address, index) => (
													<div
														key={index}
														className="address-item"
													>
														<input
															type="radio"
															id={`billing-address-${index}`}
															name="billingAddress"
															value={address._id}
															checked={selectedBillingAddress === address}
															onChange={() =>
																handleBillingAddressSelect(address)
															}
															className="address-radio"
														/>
														<label
															htmlFor={`billing-address-${index}`}
															className="address-label"
														>
															{`${address.name} ${address.address}, ${address.city}, ${address.state}, ${address.country}`}
														</label>
													</div>
												))}
										</div>
									</div>
								</div>
								{/* Proceed to Payment */}
								<div onClick={(e) => manageCurrentPage(e)}>
									<CartCalculation
										tax={cartItem.taxPrice}
										shipping={cartItem.shippingPrice}
										total={cartItem.totalPrice}
										CoupanApplied={appliedCoupon}
										Final={calculateFinalPrice()}
										ButtonName="PROCEED TO PAYMENT"
									/>
									{/* <CouponFunctions /> */}
								</div>
							</div>
						</div>
					) : (
						<div>
							<Orderbar activeOptionName="PAYMENT" />
							<div className="checkout_to_cart">
								<BackButton pageLocation="/cart" />
							</div>
							<div className="main_checkout_div">
								{/* Payment Method */}
								<div className="shipping-address-container">
									<div className="shipping-address-title">Payment Method</div>
									<div>
										<div
											className="address-item"
											onClick={() =>
												handlePaymentMethodSelect("Cash On Delivery")
											}
										>
											<input
												type="radio"
												id="CashOnDelivery"
												name="payment-method"
												value="Cash On Delivery"
												checked={selectPaymentMethod === "Cash On Delivery"}
												onChange={() =>
													handlePaymentMethodSelect("Cash On Delivery")
												}
												className="address-radio"
											/>
											<label
												htmlFor="CashOnDelivery"
												className="address-label"
											>
												Cash On Delivery
											</label>
										</div>
										<div
											className="address-item"
											onClick={() => handlePaymentMethodSelect("Razorpay")}
										>
											<input
												type="radio"
												id="Razorpay"
												name="payment-method"
												value="Razorpay"
												checked={selectPaymentMethod === "Razorpay"}
												onChange={() => handlePaymentMethodSelect("Razorpay")}
												className="address-radio"
											/>
											<label
												htmlFor="Razorpay"
												className="address-label"
											>
												Razorpay
											</label>
										</div>
									</div>
								</div>
								<div onClick={(e) => handleSubmit(e)}>
									<CartCalculation
										tax={cartItem.taxPrice}
										shipping={cartItem.shippingPrice}
										total={cartItem.totalPrice}
										CoupanApplied={appliedCoupon}
										Final={calculateFinalPrice()}
										ButtonName="PLACE ORDER"
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default Checkout
