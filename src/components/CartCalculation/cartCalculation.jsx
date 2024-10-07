// import React from "react"
// import { Link, useNavigate } from "react-router-dom"
// // import "./cartCalculation.css"
// import useCoupon from "../../hook/coupanHook"
// import styles from './OrderSummary.module.css';

// // import useCoupon from "../hook/coupanHook"


// function CartCalculation({
// 	tax,
// 	shipping,
// 	CoupanApplied,
// 	total,
// 	Final,
// 	ButtonName,
// 	disabled,
// }) {
// 	const formatNumber = (number) => {
// 		return Math.round(number).toString()
// 	}

// 	const {
// 		couponCode,
// 		setCouponCode,
// 		appliedCoupon,
// 		couponDiscount,
// 		applyCoupon,
// 		removeCoupon,
// 	} = useCoupon()
// 	const navigate = useNavigate()
// 	return (
// 		<>
// 			<div className="right-checkoutpayment cart-billing">
// 				<div className="cart-order-summary">
// 					<h2>order summary</h2>
// 					<div className="cart-billing-charges">
// 						<div className="cart-billing-subtotal">
// 							<p>SUBTOTAL</p>
// 							<p>₹{formatNumber(Final)}</p>
// 						</div>
// 						<div className="cart-billing-discount">
// 							<p>DISCOUNT</p>
// 							<p>{appliedCoupon ? couponDiscount : 0}%</p>
// 						</div>
// 						{/* <div className="cart-billing-tax">
// 							<p>TAX</p>
// 							<p> 5%</p>
// 						</div> */}
// 						<div className="cart-billing-shipping">
// 							<p>SHIPPING</p>
// 							<p> {formatNumber(shipping)}</p>
// 						</div>
// 						<div className="cart-billing-shipping">
// 							<b>TOTAL</b>
// 							<b>₹{formatNumber(Final)}</b>
// 						</div>
// 					</div>

// 					<button
// 						className="cart_calculation_button"
// 						disabled={disabled} // Apply the disabled attribute
// 						style={{ opacity: disabled ? 0.5 : 1 }}
// 						onClick={() => navigate("/cart/checkout/")}
// 					>
// 						{ButtonName}
// 					</button>
// 					<hr />

// 				</div>
// 			</div>

// 			<div></div>
// 		</>
// 	)
// }

// export default CartCalculation
// {
// 	/* <div className="right-checkoutpayment cart-billing"> */
// }




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useCoupon from "../../hook/coupanHook";
// import styles from './CartCalculation.module.css';

// function CartCalculation({
// 	tax,
// 	shipping,
// 	CoupanApplied,
// 	total,
// 	Final,
// 	ButtonName,
// 	disabled,
// }) {

// 	const [loadingData, setLoadingData] = useState({
// 		final: true,
// 		discount: true,
// 		shipping: true
// 	});

// 	const formatNumber = (number) => {
// 		return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number);
// 	};

// 	const {
// 		couponCode,
// 		setCouponCode,
// 		appliedCoupon,
// 		couponDiscount,
// 		applyCoupon,
// 		removeCoupon,
// 	} = useCoupon();
// 	const navigate = useNavigate();


// 	useEffect(() => {
// 		// Simulate data fetching
// 		if (Final !== undefined && Final !== null) {
// 			setLoadingData(prev => ({ ...prev, final: false }));
// 		}
// 		if (shipping !== undefined && shipping !== null) {
// 			setLoadingData(prev => ({ ...prev, shipping: false }));
// 		}
// 		// Add similar checks for other values as needed
// 	}, [Final, shipping]);



// 	return (
// 		<div className={styles.orderSummary}>
// 			<h2 className={styles.title}>Order  Details</h2>

// 			<div className={styles.details}>
// 				<div className={styles.row}>
// 					<span>Order Amount:</span>
// 					<span>{formatNumber(Final)}</span>
// 				</div>
// 				<div className={styles.row}>
// 					<span>Discount:</span>
// 					<span className={styles.savings}>-{formatNumber(0)}</span>
// 				</div>

// 				<div className={styles.row}>
// 					<span>Delivery Fee:</span>
// 					<span>
// 						{shipping === 0 ? (
// 							<>
// 								Free

// 							</>
// 						) : (
// 							formatNumber(shipping)
// 						)}
// 					</span>
// 				</div>
// 			</div>

// 			<div className={styles.total}>
// 				<span>Order Total:</span>
// 				<span>{formatNumber(Final)}</span>
// 			</div>

// 			{/* <div className={styles.savings}>
// 				Cheers! You saved: {formatNumber(appliedCoupon ? (Final * couponDiscount / 100) : 0)}
// 			</div> */}

// 			<div className={styles.actions}>
// 				<button
// 					className={styles.signUp}
// 					disabled={disabled}
// 					style={{ opacity: disabled ? 0.5 : 1 }}
// 					onClick={() => navigate("/cart/checkout/")}
// 				>
// 					{ButtonName}
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

// export default CartCalculation;






import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCoupon from "../../hook/coupanHook";
import styles from './CartCalculation.module.css';

function CartCalculation({
	tax,
	shipping,
	CoupanApplied,
	total,
	Final,
	ButtonName,
	disabled,
}) {

	const [loadingData, setLoadingData] = useState({
		final: true,
		discount: true,
		shipping: true
	});

	const formatNumber = (number) => {
		return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number);
	};

	const {
		couponCode,
		setCouponCode,
		appliedCoupon,
		couponDiscount,
		applyCoupon,
		removeCoupon,
	} = useCoupon();
	const navigate = useNavigate();


	useEffect(() => {
		// Simulate data fetching
		if (Final !== undefined && Final !== null) {
			setLoadingData(prev => ({ ...prev, final: false }));
		}
		if (shipping !== undefined && shipping !== null) {
			setLoadingData(prev => ({ ...prev, shipping: false }));
		}
		// Add similar checks for other values as needed
	}, [Final, shipping]);



	return (
		<div className={styles.orderSummary}>
			<h2 className={styles.title}>Order Details</h2>

			<div className={styles.details}>
				<div className={styles.row}>
					<span>Order Amount:</span>
					{loadingData.final ? (
						<span className={styles.loading}></span>
					) : (
						<span>{formatNumber(Final)}</span>
					)}
				</div>
				<div className={styles.row}>
					<span>Discount:</span>
					<span className={styles.savings}>-{formatNumber(0)}</span>
				</div>

				<div className={styles.row}>
					<span>Delivery Fee:</span>
					{loadingData.shipping ? (
						<span className={styles.loading}></span>
					) : (
						<span>
							{shipping === 0 ? (
								<>Free</>
							) : (
								formatNumber(shipping)
							)}
						</span>
					)}
				</div>
			</div>

			<div className={styles.total}>
				<span>Order Total:</span>
				{loadingData.final ? (
					<span className={styles.loading}></span>
				) : (
					<span>{formatNumber(Final)}</span>
				)}
			</div>

			<div className={styles.actions}>
				<button
					className={styles.signUp}
					disabled={disabled}
					style={{ opacity: disabled ? 0.5 : 1 }}
					onClick={() => navigate("/cart/checkout/")}
				>
					{ButtonName}
				</button>
			</div>
		</div>

	);
}

export default CartCalculation;
