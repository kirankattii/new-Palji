import React from "react"
import { Link } from "react-router-dom"
import "./cartCalculation.css"
function CartCalculation({
	tax,
	shipping,
	CoupanApplied,
	total,
	Final,
	ButtonName,
}) {
	const formatNumber = (number) => {
		return Math.round(number).toString()
	}
	return (
		<>
			<div className="right-checkoutpayment cart-billing">
				<div className="cart-order-summary">
					<h2>order summary</h2>
					<div className="cart-billing-charges">
						<div className="cart-billing-subtotal">
							<p>SUBTOTAL</p>
							<p>₹ {formatNumber(Final)}</p>
						</div>
						<div className="cart-billing-discount">
							<p>DISCOUNT</p>
							<p>₹ {0}</p>
						</div>
						<div className="cart-billing-tax">
							<p>TAX</p>
							<p> 5%</p>
						</div>
						<div className="cart-billing-shipping">
							<p>SHIPPING</p>
							<p> {formatNumber(shipping)}</p>
						</div>
						<div className="cart-billing-shipping">
							<b>TOTAL</b>
							<b>₹ {formatNumber(total)}</b>
						</div>
					</div>
					<Link
						to="/cart/checkout/"
						className="css-for-link-tag"
					>
						<div className="cart_calculation_button">{ButtonName}</div>
					</Link>
					<hr />
					{/* <p className="cart-delivery-day">
						Delivery In <span>4 to 5 Days</span>
					</p> */}
				</div>
			</div>
			{/* <div className="cart_calculation_main_div">
				<div>ORDER SUMMARY</div>
				<div className="cart_calculation_div">

					<div className="cart_calculation_name_value">
						<div>SUB TOTAL</div>
						<div>DISCOUNT</div>
						<div>TAX</div>
						<div>SHIPPING</div>
						<div>TOTAL</div>
					</div>
			
					<div className="cart_calculation_name_value">
						<div>₹ {formatNumber(Final)}</div>
						<div>₹ 0.00</div>
						<div> 5%</div>
						<div>₹ {formatNumber(shipping)}</div>
						<div>₹ {formatNumber(total)}</div>
					</div>
				</div>
				<Link
					to="/order/checkout"
					className="css-for-link-tag"
				>
					<div className="cart_calculation_button">{ButtonName}</div>
				</Link>
			</div> */}
			<div></div>
		</>
	)
}

export default CartCalculation
{
	/* <div className="right-checkoutpayment cart-billing"> */
}
