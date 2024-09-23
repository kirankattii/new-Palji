

// import React, { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import "../../pages/CSS/product/productDetails.css"
// import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx"
// import AddIcon from "../../assets/add_icon_green.png"
// import RemoveIcon from "../../assets/remove_icon_red.png"
// import Primaryloader from "../loaders/primaryloader.jsx"
// import BackButton from "./backButton.jsx"
// import HorizotalLoader from "../loaders/horizotalLoader.jsx"
// import { makeApi } from "../../api/callApi"
// import { ToastContainer, toast } from "react-toastify"
// import { LazyLoadImage } from "react-lazy-load-image-component"
// import {
// 	addToCart,
// 	removeFromCart,
// 	fetchCart,
// } from "../../utils/productFunction.js"

// function ProductDetails() {
// 	const navigate = useNavigate()
// 	const { productId } = useParams()
// 	const [product, setProduct] = useState()
// 	const [showPopup, setShowPopup] = useState(false)

// 	const [selectedImage, setSelectedImage] = useState("")
// 	const [loading, setLoading] = useState(false)
// 	const [AddTocartLoader, setAddTocartLoader] = useState(false)
// 	const [AddToWishlistLoader, setAddToWishlistLoader] = useState(false)
// 	const [wishlistItems, setWishlistItems] = useState([])
// 	const [cartItems, setCartItems] = useState([])
// 	const [isInCart, setIsInCart] = useState(false)
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")

// 		if (token) {
// 			setIsLogin(true)
// 		} else {
// 			setIsLogin(false)
// 		}
// 	}, [])

// 	const fetchProduct = async () => {
// 		try {
// 			setLoading(true)
// 			const response = await makeApi(
// 				`/api/get-single-product/${productId}`,
// 				"GET"
// 			)
// 			setProduct(response.data.product)
// 			setSelectedImage(response.data.product.thumbnail) // Set default selected image
// 		} catch (error) {
// 			console.error("Error fetching product details:", error)
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	const fetchWishlist = async () => {
// 		try {
// 			setAddToWishlistLoader(true)
// 			const response = await makeApi("/api/get-my-wishlist", "GET")
// 			const wishlistIds = response.data.wishlist
// 				.filter((item) => item.products !== null)
// 				.map((item) => item.products._id)
// 			setWishlistItems(wishlistIds)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setAddToWishlistLoader(false)
// 		}
// 	}

// 	useEffect(() => {
// 		const checkCart = async () => {
// 			const isInCart = cartItems.some((item) => item.productId === productId)
// 			setIsInCart(isInCart)
// 		}
// 		checkCart()
// 	}, [cartItems, productId])

// 	const handleImageClick = (imageUrl) => {
// 		setSelectedImage(imageUrl)
// 	}

// 	const closePopup = () => {
// 		setShowPopup(false)
// 	}

// 	const handleBuyNow = async () => {
// 		if (!IsLogin) {
// 			setShowPopup(true)
// 		} else {
// 			try {
// 				if (!isInCart) {
// 					await addToCart(
// 						productId,
// 						setIsLogin,
// 						setShowPopup,
// 						fetchCart,
// 						setCartItems,
// 						setProductLoaders
// 					)
// 					navigate("/cart")
// 				} else {
// 					navigate("/cart")
// 				}
// 			} catch (error) {
// 				console.log(error)
// 			} finally {
// 				// Remove loader state after adding to cart or navigating
// 				setAddTocartLoader(false)
// 				setProductLoaders((prevLoaders) => ({
// 					...prevLoaders,
// 					[productId]: false,
// 				}))
// 			}
// 		}
// 	}

// 	const handleAddToCart = (productId, quantity, availableQuantity) => {
// 		if (quantity < availableQuantity) {
// 			addToCart(
// 				productId,
// 				setIsLogin,
// 				setShowPopup,
// 				fetchCart,
// 				setCartItems,
// 				setProductLoaders
// 			)
// 		} else {
// 			toast("Cannot add more than available quantity.", { type: "error" })
// 		}
// 	}

// 	const handleRemoveFromCart = (productId) => {
// 		removeFromCart(productId, setProductLoaders, setCartItems, fetchCart)
// 	}

// 	const getProductQuantity = (productId) => {
// 		const cartItem = cartItems.find((item) => item.productId === productId)
// 		return cartItem ? cartItem.quantity : 0
// 	}

// 	useEffect(() => {
// 		fetchProduct()
// 		fetchCart(setCartItems)
// 		fetchWishlist()
// 	}, [productId])

// 	return (
// 		<>
// 			{showPopup && <LoginPopup onClose={closePopup} />}
// 			<ToastContainer />
// 			{loading ? (
// 				<div className="All_Product_loader">
// 					<div
// 						className="d-flex justify-content-center align-items-center"
// 						style={{ height: "100vh" }}
// 					>
// 						<Primaryloader />
// 					</div>
// 				</div>
// 			) : (
// 				<div>
// 					{product && (
// 						<div>
// 							<div className="product_display_back_btn">
// 								<BackButton pageLocation="/product/all-products" />
// 							</div>

// 							<div className="productDisplay">
// 								<div className="product-display-left">
// 									<div className="productdisplay-img-list">
// 										{[product.thumbnail, ...product.image].map((item, i) => (
// 											<div
// 												key={i}
// 												className="d-flex justify-content-center align-items-center"
// 											>
// 												<img
// 													src={item}
// 													alt=""
// 													onClick={() => handleImageClick(item)}
// 													style={{ cursor: "pointer" }}
// 												/>
// 											</div>
// 										))}
// 									</div>
// 									<div className="productdisplay-img">
// 										<img
// 											src={selectedImage}
// 											alt=""
// 											className="productdisplay-main-img"
// 										/>
// 									</div>
// 								</div>
// 								<div className="product-display-right">
// 									<h1>{product.name}</h1>
// 									<h2>{product.subTitle}</h2>
// 									<p>{product.description}</p>
// 									<div className="productdisplay-addtocart">
// 										<div className="productdisplay-item-cart"></div>
// 									</div>
// 									<div className="product_details_price_off">
// 										<p className="aproduct_display_price">
// 											₹ {product.PriceAfterDiscount}{" "}
// 											{product.discountPercentage > 0 && (
// 												<span>{product?.price} Rs</span>
// 											)}
// 											{product.discountPercentage > 0 && (
// 												<span className="discountPercentspan2">
// 													{product?.discountPercentage}% Off
// 												</span>
// 											)}
// 										</p>
// 									</div>
// 									<div className="productdisplay-item-cart productdisplay-item-car1">
// 										{!isInCart ? (
// 											<>
// 												{productLoaders[productId] ? (
// 													<div
// 														className="d-flex justify-content-center"
// 														style={{ padding: "15px 0" }}
// 													>
// 														<HorizotalLoader />
// 													</div>
// 												) : (
// 													<div
// 														className="productdisplay-item-addto-cart "
// 														onClick={() =>
// 															handleAddToCart(
// 																product._id,
// 																getProductQuantity(product._id),
// 																product.quantity
// 															)
// 														}
// 													>
// 														ADD TO CART
// 													</div>
// 												)}
// 											</>
// 										) : (
// 											<div className="productdisplay-food-item-counter">
// 												<LazyLoadImage
// 													src={RemoveIcon}
// 													effect="blur"
// 													loading="lazy"
// 													onClick={() => handleRemoveFromCart(product._id)}
// 													alt=""
// 												/>
// 												<p className="productdisplay-cart-item-no">
// 													<span style={{ color: "#fff" }}>
// 														{getProductQuantity(product._id)}
// 													</span>
// 												</p>
// 												<LazyLoadImage
// 													effect="blur"
// 													loading="lazy"
// 													onClick={() =>
// 														handleAddToCart(
// 															product._id,
// 															getProductQuantity(product._id),
// 															product.quantity
// 														)
// 													}
// 													src={AddIcon}
// 													alt=""
// 												/>
// 											</div>
// 										)}
// 									</div>
// 									<button
// 										className="buy-now-btn"
// 										onClick={handleBuyNow}
// 									>
// 										BUY NOW
// 									</button>
// 								</div>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</>
// 	)
// }

// export default ProductDetails












// import React, { useEffect, useState } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import "../../pages/CSS/product/productDetails.css"
// import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx"
// import AddIcon from "../../assets/add_icon_green.png"
// import RemoveIcon from "../../assets/remove_icon_red.png"
// import Primaryloader from "../loaders/primaryloader.jsx"
// import BackButton from "./backButton.jsx"
// import HorizotalLoader from "../loaders/horizotalLoader.jsx"
// import { makeApi } from "../../api/callApi"
// import { ToastContainer, toast } from "react-toastify"
// import { LazyLoadImage } from "react-lazy-load-image-component"
// import styles from '../../pages/CSS/product/productDetails.module.css'
// import {
// 	addToCart,
// 	removeFromCart,
// 	fetchCart,
// } from "../../utils/productFunction.js"

// function ProductDetails() {
// 	const navigate = useNavigate()
// 	const { productId } = useParams()
// 	const [product, setProduct] = useState()
// 	const [showPopup, setShowPopup] = useState(false)

// 	const [selectedImage, setSelectedImage] = useState("")
// 	const [loading, setLoading] = useState(false)
// 	const [AddTocartLoader, setAddTocartLoader] = useState(false)
// 	const [AddToWishlistLoader, setAddToWishlistLoader] = useState(false)
// 	const [wishlistItems, setWishlistItems] = useState([])
// 	const [cartItems, setCartItems] = useState([])
// 	const [isInCart, setIsInCart] = useState(false)
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})
// 	const [countLoader, setCountLoader] = useState({})

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")

// 		if (token) {
// 			setIsLogin(true)
// 		} else {
// 			setIsLogin(false)
// 		}
// 	}, [])

// 	const fetchProduct = async () => {
// 		try {
// 			setLoading(true)
// 			const response = await makeApi(
// 				`/api/get-single-product/${productId}`,
// 				"GET"
// 			)
// 			setProduct(response.data.product)
// 			setSelectedImage(response.data.product.thumbnail) // Set default selected image
// 		} catch (error) {
// 			console.error("Error fetching product details:", error)
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	const fetchWishlist = async () => {
// 		try {
// 			setAddToWishlistLoader(true)
// 			const response = await makeApi("/api/get-my-wishlist", "GET")
// 			const wishlistIds = response.data.wishlist
// 				.filter((item) => item.products !== null)
// 				.map((item) => item.products._id)
// 			setWishlistItems(wishlistIds)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setAddToWishlistLoader(false)
// 		}
// 	}

// 	useEffect(() => {
// 		const checkCart = async () => {
// 			const isInCart = cartItems.some((item) => item.productId === productId)
// 			setIsInCart(isInCart)
// 		}
// 		checkCart()
// 	}, [cartItems, productId])

// 	const handleImageClick = (imageUrl) => {
// 		setSelectedImage(imageUrl)
// 	}

// 	const closePopup = () => {
// 		setShowPopup(false)
// 	}

// 	const handleBuyNow = async () => {
// 		if (!IsLogin) {
// 			setShowPopup(true)
// 		} else {
// 			try {
// 				if (!isInCart) {
// 					await addToCart(
// 						productId,
// 						setIsLogin,
// 						setShowPopup,
// 						fetchCart,
// 						setCartItems,
// 						setProductLoaders
// 					)
// 					navigate("/cart")
// 				} else {
// 					navigate("/cart")
// 				}
// 			} catch (error) {
// 				console.log(error)
// 			} finally {
// 				// Remove loader state after adding to cart or navigating
// 				setAddTocartLoader(false)
// 				setProductLoaders((prevLoaders) => ({
// 					...prevLoaders,
// 					[productId]: false,
// 				}))
// 			}
// 		}
// 	}

// 	const handleAddToCart = (productId, quantity, availableQuantity) => {
// 		if (quantity < availableQuantity) {
// 			addToCart(
// 				productId,
// 				setIsLogin,
// 				setShowPopup,
// 				fetchCart,
// 				setCartItems,
// 				setProductLoaders
// 			)
// 		} else {
// 			toast("Cannot add more than available quantity.", { type: "error" })
// 		}
// 	}

// 	const handleRemoveFromCart = (productId) => {
// 		removeFromCart(productId, setProductLoaders, setCartItems, fetchCart)
// 	}

// 	const getProductQuantity = (productId) => {
// 		const cartItem = cartItems.find((item) => item.productId === productId)
// 		return cartItem ? cartItem.quantity : 0
// 	}

// 	useEffect(() => {
// 		fetchProduct()
// 		fetchCart(setCartItems)
// 		fetchWishlist()
// 	}, [productId])

// 	return (
// 		<>
// 			{showPopup && <LoginPopup onClose={closePopup} />}
// 			<ToastContainer />
// 			{loading ? (
// 				<div className={styles.productLoader}>
// 					<div
// 						className="d-flex justify-content-center align-items-center"
// 						style={{ height: "100vh" }}
// 					>
// 						<Primaryloader />
// 					</div>
// 				</div>
// 			) : (
// 				<div>
// 					{product && (
// 						<div>
// 							<div className="product_display_back_btn">
// 								<BackButton pageLocation="/product/all-products" />
// 							</div>

// 							<div className={styles.productContainer}>
// 								<div className={styles.imgContainer}>
// 									<div className={styles.innerImgContainer}>
// 										<div className={styles.mainImg}>
// 											<img src={product.thumbnail} alt="" />
// 										</div>
// 										<div className={styles.subImg}>
// 											<div className={styles.subImg1}>
// 												<img src={product.image[0]} alt="" />
// 											</div>
// 											<div className={styles.subImg1}>
// 												<img src={product.image[1]} alt="" />
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 								<div className={styles.title}>
// 									<h1>{product.name}</h1>
// 									<div className={styles.addToCartContainer}>
// 										<div className={styles.counts}>
// 											<span onClick={() => handleRemoveFromCart(product._id)}>-</span>
// 											<p>{getProductQuantity(productId)}</p>
// 											<span onClick={() =>
// 												handleAddToCart(
// 													product._id,
// 													getProductQuantity(product._id),
// 													product.quantity
// 												)
// 											}>+</span>
// 										</div>
// 										<button onClick={() =>
// 											handleAddToCart(
// 												product._id,
// 												getProductQuantity(product._id),
// 												product.quantity
// 											)
// 										}>Add To Cart</button>
// 									</div>
// 								</div>
// 								<div className={styles.description}>
// 									<h2>DESCRIPTION</h2>
// 									<p>{product.description}</p>
// 								</div>
// 								<div className={styles.includes}>
// 									<h2>INCLUDES</h2>
// 									<ul>
// 										<li>Roasted Khatta Mitha Diet Poha</li>
// 										<li>Butter Short Bread Biscuit</li>
// 										<li>Oat Cookies</li>
// 										<li>Achari Mathi</li>
// 										<li>Salt Pepper Makhana</li>
// 										<li>Butter Coin</li>
// 										<li>Jaggery and Till Cookies</li>
// 										<li>Caramel Popcorn</li>
// 										<li>Paper Namkeen Biscuit</li>
// 										<li>Gudh Till Biscuit</li>
// 										<li>Choconut Cookies Premium</li>
// 										<li>Corn Chips</li>
// 										<li>Roasted Namkeen Packet</li>
// 									</ul>

// 								</div>
// 							</div>

// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</>
// 	)
// }

// export default ProductDetails




import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../../pages/CSS/product/productDetails.css"
import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx"
import AddIcon from "../../assets/add_icon_green.png"
import RemoveIcon from "../../assets/remove_icon_red.png"
import Primaryloader from "../loaders/primaryloader.jsx"
import BackButton from "./backButton.jsx"
import HorizotalLoader from "../loaders/horizotalLoader.jsx"
import { makeApi } from "../../api/callApi"
import { ToastContainer, toast } from "react-toastify"
import { LazyLoadImage } from "react-lazy-load-image-component"
import styles from '../../pages/CSS/product/productDetails.module.css'
import {
	addToCart,
	removeFromCart,
	fetchCart,
} from "../../utils/productFunction.js"

function ProductDetails() {
	const navigate = useNavigate()
	const { productId } = useParams()
	const [product, setProduct] = useState()
	const [showPopup, setShowPopup] = useState(false)
	const [includes, setIncludes] = useState()
	const [selectedImage, setSelectedImage] = useState("")
	const [loading, setLoading] = useState(false)
	const [AddTocartLoader, setAddTocartLoader] = useState(false)
	const [checkIncludes, setCheckIncludes] = useState()
	const [AddToWishlistLoader, setAddToWishlistLoader] = useState(false)
	const [wishlistItems, setWishlistItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [isInCart, setIsInCart] = useState(false)
	const [IsLogin, setIsLogin] = useState(false)
	const [productLoaders, setProductLoaders] = useState({})
	const [countLoader, setCountLoader] = useState({}) // State to track count loader

	useEffect(() => {
		const token = localStorage.getItem("token")

		if (token) {
			setIsLogin(true)
		} else {
			setIsLogin(false)
		}
	}, [])

	const fetchProduct = async () => {
		try {
			setLoading(true)
			const response = await makeApi(
				`/api/get-single-product/${productId}`,
				"GET"
			)
			setProduct(response.data.product)
			setIncludes(response.data.include)
			setSelectedImage(response.data.product.thumbnail)
			setCheckIncludes(response.data)
		} catch (error) {
			console.error("Error fetching product details:", error)
		} finally {
			setLoading(false)
		}
	}

	const fetchWishlist = async () => {
		try {
			setAddToWishlistLoader(true)
			const response = await makeApi("/api/get-my-wishlist", "GET")
			const wishlistIds = response.data.wishlist
				.filter((item) => item.products !== null)
				.map((item) => item.products._id)
			setWishlistItems(wishlistIds)
		} catch (error) {
			console.log(error)
		} finally {
			setAddToWishlistLoader(false)
		}
	}

	useEffect(() => {
		const checkCart = async () => {
			const isInCart = cartItems.some((item) => item.productId === productId)
			setIsInCart(isInCart)
		}
		checkCart()
	}, [cartItems, productId])

	const handleImageClick = (imageUrl) => {
		setSelectedImage(imageUrl)
	}

	const closePopup = () => {
		setShowPopup(false)
	}

	const handleBuyNow = async () => {
		if (!IsLogin) {
			setShowPopup(true)
		} else {
			try {
				if (!isInCart) {
					await addToCart(
						productId,
						setIsLogin,
						setShowPopup,
						fetchCart,
						setCartItems,
						setProductLoaders
					)
					navigate("/cart")
				} else {
					navigate("/cart")
				}
			} catch (error) {
				console.log(error)
			} finally {
				// Remove loader state after adding to cart or navigating
				setAddTocartLoader(false)
				setProductLoaders((prevLoaders) => ({
					...prevLoaders,
					[productId]: false,
				}))
			}
		}
	}

	const handleAddToCart = (productId, quantity, availableQuantity) => {
		if (quantity < availableQuantity) {
			setCountLoader((prevState) => ({ ...prevState, [productId]: true })) // Start loader
			addToCart(
				productId,
				setIsLogin,
				setShowPopup,
				fetchCart,
				setCartItems,
				setProductLoaders
			).finally(() => {
				setCountLoader((prevState) => ({ ...prevState, [productId]: false })) // Stop loader
			})
		} else {
			toast("Cannot add more than available quantity.", { type: "error" })
		}
	}

	const handleRemoveFromCart = (productId) => {
		setCountLoader((prevState) => ({ ...prevState, [productId]: true })) // Start loader
		removeFromCart(productId, setProductLoaders, setCartItems, fetchCart).finally(() => {
			setCountLoader((prevState) => ({ ...prevState, [productId]: false })) // Stop loader
		})
	}

	const getProductQuantity = (productId) => {
		const cartItem = cartItems.find((item) => item.productId === productId)
		return cartItem ? cartItem.quantity : 0
	}

	useEffect(() => {
		fetchProduct()
		fetchCart(setCartItems)
		fetchWishlist()
	}, [productId])
	console.log("Product include", checkIncludes)


	return (
		<>
			{showPopup && <LoginPopup onClose={closePopup} />}
			<ToastContainer />
			{loading ? (
				<div className={styles.productLoader}>
					<div
						className="d-flex justify-content-center align-items-center"
						style={{ height: "100vh" }}
					>
						<Primaryloader />
					</div>
				</div>
			) : (
				<div>
					{product && (
						<div>
							<div className="product_display_back_btn">
								<BackButton pageLocation="/product/all-products" />
							</div>

							<div className={styles.productContainer}>
								<div className={styles.imgContainer}>
									<div className={styles.innerImgContainer}>
										<div className={styles.mainImg}>
											<img src={product.thumbnail} alt="" />
										</div>
										<div className={styles.subImg}>
											<div className={styles.subImg1}>
												<img src={product.image[0]} alt="" />
											</div>
											<div className={styles.subImg1}>
												<img src={product.image[1]} alt="" />
											</div>
										</div>
									</div>
								</div>
								<div className={styles.title}>
									<h1>{product.name}</h1>
									<div className={styles.addToCartContainer}>
										<div className={styles.counts}>

											<>
												<span onClick={() => handleRemoveFromCart(product._id)}>-</span>
												{countLoader[product._id] ? (<div className={styles.countLoader}>
													<Primaryloader />
												</div>
												) : (
													<p>{getProductQuantity(productId)}</p>
												)}
												<span onClick={() =>
													handleAddToCart(
														product._id,
														getProductQuantity(product._id),
														product.quantity
													)
												}>+</span>
											</>

										</div>
										<button onClick={() =>
											handleAddToCart(
												product._id,
												getProductQuantity(product._id),
												product.quantity
											)
										}>Add To Cart</button>
									</div>
								</div>
								<div className={styles.description}>
									<h2>DESCRIPTION</h2>
									<p>{product.description}</p>
								</div>
								{includes && includes.length > 0 && (
									<div className={styles.includes}>
										<h2>INCLUDES</h2>
										<ul>
											{includes.map((item, id) => (
												<li key={id}>{item?.include}</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default ProductDetails
