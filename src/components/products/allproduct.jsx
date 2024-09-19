

// import React, { useEffect, useState } from "react"
// import "../../pages/CSS/product/allproduct.css"
// import { IoIosHeart } from "react-icons/io"
// import AddIcon from "../../assets/add_icon_green.png"
// import RemoveIcon from "../../assets/remove_icon_red.png"
// import Primaryloader from "../loaders/primaryloader.jsx"
// import Heartloader from "../loaders/hearloader.jsx"
// import HorizotalLoader from "../loaders/horizotalLoader.jsx"
// import { Link } from "react-router-dom"
// import LoginPopup from "../LoginPopup/LoginPopup.jsx"
// import { makeApi } from "../../api/callApi"
// import {
// 	addToCart,
// 	removeFromCart,
// 	fetchCart,
// 	fetchWishlist,
// } from "../../utils/productFunction.js"
// import { LazyLoadImage } from "react-lazy-load-image-component"
// import { toast } from "react-toastify"

// function Allproduct({ search, category, minPrice, maxPrice }) {
// 	const [products, setProducts] = useState([])
// 	const [loading, setLoading] = useState(false)
// 	const [wishlistItems, setWishlistItems] = useState([])
// 	const [cartItems, setCartItems] = useState([])
// 	const [ResultPerPage, setResultPerPage] = useState(12)
// 	const [currentPage, setCurrentPage] = useState(1)
// 	const [totalPages, setTotalPages] = useState(0)
// 	const [toalProduct, setToalProduct] = useState(0)
// 	const [AllProductLoader, setAllProductLoader] = useState(false)
// 	const [AddTocartLoader, setAddTocartLoader] = useState({})
// 	const [AddToWishlistLoader, setAddToWishlistLoader] = useState({})
// 	const [IsLogin, setIsLogin] = useState(false)
// 	const [showPopup, setShowPopup] = useState(false)
// 	const [productLoaders, setProductLoaders] = useState({})

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")
// 		setIsLogin(!!token)
// 	}, [localStorage.getItem("token")])

// 	const fetchProduct = async (page = currentPage) => {
// 		try {
// 			setAllProductLoader(true)
// 			const response = await makeApi(
// 				`/api/get-all-products?name=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
// 				"GET"
// 			)
// 			setProducts(response.data.products)
// 			setToalProduct(response.data.totalProducts)
// 			const a = Math.ceil(response.data.totalProducts / ResultPerPage)
// 			setTotalPages(a)
// 		} catch (error) {
// 			console.log(error)
// 		} finally {
// 			setAllProductLoader(false)
// 		}
// 	}

// 	useEffect(() => {
// 		fetchProduct(1) // Reset to the first page when filters change
// 		setCurrentPage(1) // Reset the current page to 1
// 		fetchCart(setCartItems)
// 	}, [search, category, minPrice, maxPrice, ResultPerPage])

// 	useEffect(() => {
// 		fetchProduct() // Fetch products whenever the current page changes
// 	}, [currentPage])

// 	useEffect(() => {
// 		const fetchWishlist = async () => {
// 			try {
// 				setAddToWishlistLoader(true)
// 				const response = await makeApi("/api/get-my-wishlist", "GET")
// 				const wishlistIds = response.data.wishlist
// 					.filter((item) => item.products !== null)
// 					.map((item) => item.products._id)
// 				setWishlistItems(wishlistIds)
// 			} catch (error) {
// 				console.log(error)
// 			} finally {
// 				setAddToWishlistLoader(false)
// 			}
// 		}

// 		fetchWishlist()
// 	}, [])

// 	const isInCart = (productId) => {
// 		return cartItems.some((item) => item.productId === productId)
// 	}

// 	const closePopup = () => {
// 		setShowPopup(false)
// 	}

// 	const toggleWishlist = async (id) => {
// 		if (!IsLogin) {
// 			setShowPopup(true)
// 		} else {
// 			try {
// 				setAddToWishlistLoader((prevState) => ({
// 					...prevState,
// 					[id]: true,
// 				}))
// 				const method = "POST"
// 				const endpoint = `/api/create-wishlist/${id}`
// 				const data = await makeApi(endpoint, method)
// 				setWishlistItems((prevState) => {
// 					if (prevState.includes(id)) {
// 						return prevState.filter((itemId) => itemId !== id)
// 					} else {
// 						return [...prevState, id]
// 					}
// 				})
// 			} catch (error) {
// 				console.log(error)
// 			} finally {
// 				setAddToWishlistLoader((prevState) => ({
// 					...prevState,
// 					[id]: false,
// 				}))
// 			}
// 		}
// 	}

// 	const handlePageClick = (pageNumber) => {
// 		setCurrentPage(pageNumber)
// 		window.scrollTo(0, 0) // Scrolls to the top of the page
// 	}

// 	const getProductQuantity = (productId) => {
// 		const cartItem = cartItems.find((item) => item.productId === productId)
// 		return cartItem ? cartItem.quantity : 0
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

// 	return (
// 		<>
// 			{showPopup && <LoginPopup onClose={closePopup} />}

// 			<div className="top_parent_div_all_product">
// 				{AllProductLoader ? (
// 					<div className="All_Product_loader">
// 						<div className="">
// 							<Primaryloader />
// 						</div>
// 					</div>
// 				) : (
// 					<div className="">
// 						{products.length === 0 ? (
// 							<div className="no-products-found">No Products Found</div>
// 						) : (
// 							<div className="main_all_product_div">
// 								{products.map((product, index) => (
// 									<div
// 										className="product_div_all_product_parent"
// 										key={index}
// 									>
// 										<div className="product_div_all_product">
// 											<Link to={`/product/product-details/${product._id}`}>
// 												<div className="ab_product_div_all_product">
// 													<img
// 														src={product.thumbnail}
// 														alt="product"
// 														className="all_product_product_thumbnail"
// 														loading="lazy"
// 													/>
// 												</div>
// 											</Link>
// 											<div className="product_name_and_price">
// 												<div>
// 													<Link to={`/product/product-details/${product._id}`}>
// 														{product.name}
// 													</Link>
// 												</div>
// 												<div className="all_product_price">
// 													₹{product.PriceAfterDiscount}{" "}
// 													{product.discountPercentage > 0 && (
// 														<span>{product?.price} Rs</span>
// 													)}
// 												</div>
// 											</div>
// 											<div className="Add_to_cart_and_watchlist_button">
// 												<>
// 													{isInCart(product._id) ? (
// 														<div className="Add_to_cart_and_watchlist_child Add_to_cart_and_watchlist_child1">
// 															{productLoaders[product._id] ? (
// 																<div className="hori_loading">
// 																	<HorizotalLoader />
// 																</div>
// 															) : (
// 																<div className="cart-quantity">
// 																	<LazyLoadImage
// 																		effect="blur"
// 																		loading="lazy"
// 																		src={RemoveIcon}
// 																		alt="RemoveIcon"
// 																		className="Icon_add_to_cart"
// 																		onClick={() =>
// 																			removeFromCart(
// 																				product?._id,
// 																				setProductLoaders,
// 																				setCartItems,
// 																				fetchCart
// 																			)
// 																		}
// 																	/>
// 																	<span>
// 																		{getProductQuantity(product?._id)}
// 																	</span>
// 																	<LazyLoadImage
// 																		effect="blur"
// 																		loading="lazy"
// 																		src={AddIcon}
// 																		alt="AddIcon"
// 																		className="Icon_add_to_cart"
// 																		onClick={() =>
// 																			handleAddToCart(
// 																				product?._id,
// 																				getProductQuantity(product?._id),
// 																				product?.quantity
// 																			)
// 																		}
// 																	/>
// 																</div>
// 															)}
// 														</div>
// 													) : (
// 														<div>
// 															{productLoaders[product._id] ? (
// 																<div className="hori_loading">
// 																	<HorizotalLoader />
// 																</div>
// 															) : (
// 																<div
// 																	className="Add_to_cart_button"
// 																	onClick={() =>
// 																		handleAddToCart(
// 																			product?._id,
// 																			getProductQuantity(product?._id),
// 																			product?.quantity
// 																		)
// 																	}
// 																>
// 																	Add to Cart
// 																</div>
// 															)}
// 														</div>
// 													)}
// 												</>

// 												<div className="Add_to_cart_and_watchlist_child a_Add_to_cart_and_watchlist_child">
// 													{AddToWishlistLoader[product._id] ? (
// 														<div className="heart_loader_all_product">
// 															<Heartloader />
// 														</div>
// 													) : (
// 														<IoIosHeart
// 															className={`watchlist-icon pointer-event ${wishlistItems.includes(product._id)
// 																? "wishlist-active"
// 																: ""
// 																}`}
// 															onClick={() => toggleWishlist(product._id)}
// 														/>
// 													)}
// 												</div>
// 											</div>
// 										</div>
// 									</div>
// 								))}
// 							</div>
// 						)}
// 						<div className="pagination">
// 							{Array.from({ length: totalPages }, (_, index) => index + 1).map(
// 								(pageNumber) => (
// 									<button
// 										key={pageNumber}
// 										className={`pagination-button ${pageNumber === currentPage ? "active" : ""
// 											}`}
// 										onClick={() => handlePageClick(pageNumber)}
// 									>
// 										{pageNumber}
// 									</button>
// 								)
// 							)}
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</>
// 	)
// }

// export default Allproduct







import React, { useEffect, useState } from "react"
import styles from "../../pages/CSS/product/allProduct.module.css"
import { IoIosHeart } from "react-icons/io"
import AddIcon from "../../assets/add_icon_green.png"
import RemoveIcon from "../../assets/remove_icon_red.png"
import Primaryloader from "../loaders/primaryloader.jsx"
import Heartloader from "../loaders/hearloader.jsx"
import HorizotalLoader from "../loaders/horizotalLoader.jsx"
import { Link } from "react-router-dom"
import LoginPopup from "../LoginPopup/LoginPopup.jsx"
import { makeApi } from "../../api/callApi"
import {
	addToCart,
	removeFromCart,
	fetchCart,
	fetchWishlist,
} from "../../utils/productFunction.js"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { toast } from "react-toastify"

function Allproduct({ search, category, minPrice, maxPrice, categoryName }) {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)
	const [wishlistItems, setWishlistItems] = useState([])
	const [cartItems, setCartItems] = useState([])
	const [ResultPerPage, setResultPerPage] = useState(12)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [toalProduct, setToalProduct] = useState(0)
	const [AllProductLoader, setAllProductLoader] = useState(false)
	const [AddTocartLoader, setAddTocartLoader] = useState({})
	const [AddToWishlistLoader, setAddToWishlistLoader] = useState({})
	const [IsLogin, setIsLogin] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	const [productLoaders, setProductLoaders] = useState({})

	useEffect(() => {
		const token = localStorage.getItem("token")
		setIsLogin(!!token)
	}, [localStorage.getItem("token")])

	const fetchProduct = async (page = currentPage) => {
		try {
			setAllProductLoader(true)
			const response = await makeApi(
				`/api/get-all-products?name=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&perPage=${ResultPerPage}&IsOutOfStock=false`,
				"GET"
			)
			setProducts(response.data.products)
			setToalProduct(response.data.totalProducts)
			const a = Math.ceil(response.data.totalProducts / ResultPerPage)
			setTotalPages(a)
		} catch (error) {
			console.log(error)
		} finally {
			setAllProductLoader(false)
		}
	}

	useEffect(() => {
		fetchProduct(1) // Reset to the first page when filters change
		setCurrentPage(1) // Reset the current page to 1
		fetchCart(setCartItems)
	}, [search, category, minPrice, maxPrice, ResultPerPage])

	useEffect(() => {
		fetchProduct() // Fetch products whenever the current page changes
	}, [currentPage])

	useEffect(() => {
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

		fetchWishlist()
	}, [])

	const isInCart = (productId) => {
		return cartItems.some((item) => item.productId === productId)
	}

	const closePopup = () => {
		setShowPopup(false)
	}

	const toggleWishlist = async (id) => {
		if (!IsLogin) {
			setShowPopup(true)
		} else {
			try {
				setAddToWishlistLoader((prevState) => ({
					...prevState,
					[id]: true,
				}))
				const method = "POST"
				const endpoint = `/api/create-wishlist/${id}`
				const data = await makeApi(endpoint, method)
				setWishlistItems((prevState) => {
					if (prevState.includes(id)) {
						return prevState.filter((itemId) => itemId !== id)
					} else {
						return [...prevState, id]
					}
				})
			} catch (error) {
				console.log(error)
			} finally {
				setAddToWishlistLoader((prevState) => ({
					...prevState,
					[id]: false,
				}))
			}
		}
	}

	const handlePageClick = (pageNumber) => {
		setCurrentPage(pageNumber)
		window.scrollTo(0, 0) // Scrolls to the top of the page
	}

	const getProductQuantity = (productId) => {
		const cartItem = cartItems.find((item) => item.productId === productId)
		return cartItem ? cartItem.quantity : 0
	}

	const handleAddToCart = (productId, quantity, availableQuantity) => {
		if (quantity < availableQuantity) {
			addToCart(
				productId,
				setIsLogin,
				setShowPopup,
				fetchCart,
				setCartItems,
				setProductLoaders
			)
		} else {
			toast("Cannot add more than available quantity.", { type: "error" })
		}
	}

	return (
		<div className={styles.mainContainer}>
			{showPopup && <LoginPopup onClose={closePopup} />}
			{AllProductLoader ? (

				<div className="All_Product_loader">
					<div>
						<Primaryloader />
					</div>
				</div>

			) : (
				<div className={styles.container}>
					<div className={styles.productsContainer}>
						<h2>{categoryName}</h2>
						<div className={styles.allProductsList}>
							{products.map(item => (
								<div key={item._id} className={styles.products}>
									<Link to={`/product/product-details/${item._id}`}>
										<div className={styles.productImg}>
											<img src={item.thumbnail} alt={item.name} />
										</div>
									</Link>
									<div className={styles.productContent}>
										<p className={styles.name}>{item.name}</p>
										<p className={styles.productPrice}>₹{item.PriceAfterDiscount}
											{item.discountPercentage > 0 && (
												<span>{item?.price} </span>
											)}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className={styles.pagination}>
						{Array.from({ length: totalPages }, (_, index) => index + 1).map(
							(pageNumber) => (
								<button
									key={pageNumber}
									className={`${styles.paginationButton} ${pageNumber === currentPage ? styles.active : ""}`}
									onClick={() => handlePageClick(pageNumber)}
								>
									{pageNumber}
								</button>
							)
						)}
					</div>
				</div>
			)}

		</div>
	)
}

export default Allproduct























