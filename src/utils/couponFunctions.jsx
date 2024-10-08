import React, { useContext, useEffect, useState } from "react"
// import { makeApi } from "../api/callApi"
import { assets } from "../assets/assets"
import { useNavigate } from "react-router"
import Orderbar from "../components/orderbar/orderbar"
import { ToastContainer } from "react-toastify"
import Primaryloader from "../components/loaders/primaryloader"
import { Link } from "react-router-dom"
import {
	cartItemFetchCart,
	cartItemAddToCart,
	cartItemRemoveFromCart,
	removeAllProductsFromCart,
} from "../utils/productFunction"
import useCoupon from "../hook/coupanHook"
import { ShopContext } from "../context/ShopContext"
import { makeApi } from "../api/callApi"
import CartCalculation from "../components/CartCalculation/cartCalculation"

const CouponFunctions = () => {
	const {
		cartItems,
		getTotalCartDiscountAmount,
		all_product,
		getTotalCartAmount,
	} = useContext(ShopContext)

	const {
		couponCode,
		setCouponCode,
		appliedCoupon,
		couponDiscount,
		applyCoupon,
		removeCoupon,
	} = useCoupon()

	const totalDiscount = (
		getTotalCartAmount() - getTotalCartDiscountAmount()
	).toFixed(2)

	const navigate = useNavigate()

	const [shippingAddresses, setShippingAddresses] = useState([])
	const [loading, setLoading] = useState(false)
	const [selectedAddress, setSelectedAddress] = useState(null)
	const [cartItem, setCartItem] = useState([])
	const [cartPoductList, setCartProductList] = useState([])
	const [AllProductLoader, setAllProductLoader] = useState(false)
	const [productLoaders, setProductLoaders] = useState({})
	const [IscartEmpty, setIsCartEmpty] = useState(false)

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

	const handleAddressSelect = (address) => {
		setSelectedAddress(address)
	}

	useEffect(() => {
		fetchShippingAddresses()
	}, [])

	const fetchCartItem = async () => {
		await cartItemFetchCart(
			setCartItem,
			setCartProductList,
			setAllProductLoader,
			setIsCartEmpty
		)
	}

	const removeFromCart = async (productId) => {
		await cartItemRemoveFromCart(productId, setProductLoaders, fetchCartItem)
	}

	const addToCart = async (productId) => {
		await cartItemAddToCart(productId, setProductLoaders, fetchCartItem)
	}

	const handleAddToCart = (productId, quantity, availableQuantity) => {
		if (quantity < availableQuantity) {
			addToCart(productId)
		} else {
			toast.error("Cannot add more than available quantity.")
		}
	}

	useEffect(() => {
		fetchCartItem()
	}, [])
	return (
		<div>
			<div className="cart-bottomm">
				<div className="cart-address">
					<div className="cart-shipping-address"></div>
				</div>

				<div className="cart-billing">
					<CartCalculation
						tax={cartItem.taxPrice}
						shipping={cartItem.shippingPrice}
						Final={cartItem.TotalProductPrice}
						CoupanApplied={appliedCoupon ? couponDiscount : totalDiscount}
						total={
							cartItem.totalPrice
						}
						ButtonName="PROCEED TO CHECKOUT"
					/>
				</div>
			</div>
		</div>
	)
}

export default CouponFunctions
