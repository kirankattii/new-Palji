// import React, { useContext, useEffect, useState } from "react"
// import user_icon from "../../assets/Male User.png"
// import { Link, useLocation } from "react-router-dom"
// import { assets } from "../../assets/assets"
// import { IoSearch } from "react-icons/io5"
// import { HiMiniShoppingBag } from "react-icons/hi2"
// import { GiHamburgerMenu } from "react-icons/gi"
// import { MdArrowDropDown } from "react-icons/md"
// import { ShopContext } from "../../context/ShopContext"
// import { IoMdLogIn } from "react-icons/io"

// import "./navbar.css"

// import ProductDropdown from "../productDropdown/ProductDropdown"
// import ProfileDropdown from "../profileDropdown/ProfileDropdown"
// import { makeApi } from "../../api/callApi"
// import NavSearchList from "../navSearchList/NavSearchList"

// const Navbar = () => {
// 	const [showNavbar, setShowNavbar] = useState(false)
// 	const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false)
// 	const [cartItem, setCartItem] = useState([])
// 	const [myCartData, setMyCartData] = useState([])

// 	const [isloggedIn, setIsloggedIn] = useState(false)

// 	const [totalQuantities, setTotalQuantities] = useState(0)
// 	const [cartUpdated, setCartUpdated] = useState(false)
// 	const { getTotalCartItems } = useContext(ShopContext)

// 	// const fetchCartItem = async () => {
// 	// 	try {
// 	// 		const response = await makeApi("/api/my-cart", "GET")
// 	// 		const orderItems = response.data.orderItems
// 	// 		let total = 0
// 	// 		orderItems.forEach((item) => {
// 	// 			total += item.quantity
// 	// 		})
// 	// 		setTotalQuantities(total)
// 	// 		setMyCartData(orderItems) // Update myCartData state with fetched data
// 	// 	} catch (error) {
// 	// 		console.log(error)
// 	// 	}
// 	// }

// 	// useEffect(() => {
// 	// 	fetchCartItem()
// 	// }, [])

// 	// useEffect(() => {

// 	// 	fetchCartItem()
// 	// }, [cartUpdated])

// 	const location = useLocation()

// 	const shouldApplySpecialStyles = () => {
// 		return (
// 			location.pathname === "/contact" ||
// 			location.pathname === "/login" ||
// 			location.pathname === "/Signup" ||
// 			location.pathname === "/products" ||
// 			location.pathname === "/products/savory" ||
// 			location.pathname === "/products/biscuits" ||
// 			location.pathname === "/cart"
// 		)
// 	}

// 	const [moblieMenu, setMobileMenu] = useState(false)

// 	const toggleMenu = () => {
// 		setMobileMenu(!moblieMenu)
// 	}

// 	const closeMenu = () => {
// 		setMobileMenu(false)
// 	}

// 	const toggleCategoryDropdown = () => {
// 		setCategoryDropdownVisible(!categoryDropdownVisible)
// 	}

// 	const [openProfile, setOpenProfile] = useState(false)
// 	const [products, setProducts] = useState([])
// 	const [input, setInput] = useState("")
// 	const [allProduct, setAllProduct] = useState([])

// 	const fetchData = async (value) => {
// 		try {
// 			const response = await makeApi(`/api/get-all-products`, "GET")

// 			const getProduct = response.data.products
// 			const result = getProduct.filter((product) => {
// 				return (
// 					value &&
// 					product &&
// 					product.name &&
// 					product.name.toLowerCase().includes(value)
// 				)
// 			})
// 			setAllProduct(getProduct)
// 			setProducts(result)
// 		} catch (error) {
// 			console.error("Error fetching products:", error)
// 		}
// 	}

// 	const handleChange = (value) => {
// 		setInput(value), fetchData(value)
// 	}

// 	const [categories, setCategories] = useState([])

// 	useEffect(() => {
// 		async function fetchCategories() {
// 			try {
// 				const response = await makeApi("/api/get-all-categories", "GET")
// 				if (response.status === 200) {
// 					setCategories(response.data.categories)
// 				}
// 			} catch (error) {
// 				console.log("Error fetching categories:", error)
// 			}
// 		}
// 		fetchCategories()
// 	}, [])

// 	useEffect(() => {
// 		const token = localStorage.getItem("token")

// 		if (token) {
// 			setIsloggedIn(true)
// 		} else {
// 			setIsloggedIn(false)
// 		}

// 		const timeoutId = setTimeout(() => {
// 			setShowNavbar(true)
// 		}, 1000)

// 		return () => clearTimeout(timeoutId)
// 	}, [localStorage.getItem("token")])

// 	return showNavbar ? (
// 		<div className="navbar">
// 			<div className="left-navbar">
// 				{isloggedIn ? (
// 					<div>
// 						<img
// 							onClick={() => setOpenProfile((prev) => !prev)}
// 							src={user_icon}
// 							alt=""
// 						/>
// 					</div>
// 				) : (
// 					<p className="btn-btn-primary">
// 						<Link to="/Signup">
// 							<IoMdLogIn />
// 						</Link>
// 					</p>
// 				)}

// 				<ul>
// 					<li>
// 						<Link to="/">HOME</Link>
// 					</li>
// 					<li className="product-navbar">
// 						<Link to="/product/all-products">Shop</Link>
// 					</li>
// 					<li>
// 						<Link to="/aboutus">ABOUT US</Link>
// 					</li>
// 				</ul>
// 			</div>
// 			<Link to="/">
// 				<img
// 					className="center-logo"
// 					src={assets.logo2}
// 					alt=""
// 				/>
// 			</Link>
// 			<div className="right-navbar">
// 				<ul>
// 					<li className={shouldApplySpecialStyles() ? "special-navbar" : null}>
// 						<Link to="/contact">CONTACT US</Link>
// 					</li>
// 				</ul>
// 				<div className="nav-search-bar">
// 					<div
// 						className={shouldApplySpecialStyles() ? "special-search" : "search"}
// 					>
// 						<input
// 							type="text"
// 							placeholder="SEARCH"
// 							value={input}
// 							onChange={(e) => handleChange(e.target.value)}
// 						/>
// 						<IoSearch className="search_icon" />
// 					</div>
// 					<NavSearchList
// 						product={products}
// 						allProduct={allProduct}
// 					/>
// 				</div>
// 				{isloggedIn ? (
// 					<div className="media-profile-icon">
// 						<img
// 							onClick={() => setOpenProfile((prev) => !prev)}
// 							src={user_icon}
// 							style={{ cursor: "pointer" }}
// 							alt=""
// 						/>
// 					</div>
// 				) : (
// 					<button className="btn btn-primary media-login">
// 						<Link to="/login">LOGIN</Link>
// 					</button>
// 				)}
// 				{isloggedIn && (
// 					<Link to="/cart">
// 						<div className="nav-cart">
// 							<span className="cart-no">{getTotalCartItems()}</span>
// 							<HiMiniShoppingBag className="cart-icon" />
// 						</div>
// 					</Link>
// 				)}
// 				<div className="media-navbar">
// 					<nav>
// 						<ul className={moblieMenu ? "" : "hide-mobile-menu"}>
// 							<li>
// 								<Link
// 									to="/"
// 									onClick={closeMenu}
// 								>
// 									HOME
// 								</Link>
// 							</li>
// 							<li className="click-dropdown">
// 								<Link to="/product/all-products">
// 									PRODUCTS <MdArrowDropDown />
// 								</Link>
// 							</li>
// 							<li>
// 								<Link
// 									to="/aboutus"
// 									onClick={closeMenu}
// 								>
// 									ABOUT US
// 								</Link>
// 							</li>
// 							<li>
// 								<Link
// 									to="/contact"
// 									onClick={closeMenu}
// 								>
// 									CONTACT US
// 								</Link>
// 							</li>
// 						</ul>
// 						<GiHamburgerMenu
// 							className={
// 								shouldApplySpecialStyles() ? "special-menu-icon" : "menu-icon"
// 							}
// 							onClick={toggleMenu}
// 						/>
// 					</nav>
// 				</div>
// 			</div>
// 			{openProfile && (
// 				<ProfileDropdown
// 					openProfile={setOpenProfile}
// 					setOpenProfile={setOpenProfile}
// 					className="nav-profile-dropdown"
// 				/>
// 			)}
// 		</div>
// 	) : null
// }

// export default Navbar

import React, { useContext, useEffect, useRef, useState } from "react"
import user_icon from "../../assets/Male User.png"
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom"
import { assets } from "../../assets/assets"
import { IoSearch } from "react-icons/io5"
import { HiMiniShoppingBag } from "react-icons/hi2"
import { GiHamburgerMenu } from "react-icons/gi"
import { MdArrowDropDown } from "react-icons/md"
import { ShopContext } from "../../context/ShopContext"
import { IoMdLogIn } from "react-icons/io"

import "./navbar.css"

import ProductDropdown from "../productDropdown/ProductDropdown"
import ProfileDropdown from "../profileDropdown/ProfileDropdown"
import { makeApi } from "../../api/callApi"
import NavSearchList from "../navSearchList/NavSearchList"
import {
	subscribeToCartCount,
	unsubscribeFromCartCount,
} from "../../utils/productFunction"

const Navbar = () => {
	const [showNavbar, setShowNavbar] = useState(false)
	const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false)
	const [cartItem, setCartItem] = useState([])
	const [myCartData, setMyCartData] = useState([])

	const [isloggedIn, setIsloggedIn] = useState(false)

	const [totalQuantities, setTotalQuantities] = useState(0)
	const [cartUpdated, setCartUpdated] = useState(false)
	const { getTotalCartItems } = useContext(ShopContext)
	const [cartCount, setCartCount] = useState(0)

	const location = useLocation()
	const navigate = useNavigate()

	const shouldApplySpecialStyles = () => {
		return (
			location.pathname === "/contact" ||
			location.pathname === "/login" ||
			location.pathname === "/Signup" ||
			location.pathname === "/products" ||
			location.pathname === "/products/savory" ||
			location.pathname === "/products/biscuits" ||
			location.pathname === "/cart"
		)
	}

	const [moblieMenu, setMobileMenu] = useState(false)

	const toggleMenu = () => {
		setMobileMenu(!moblieMenu)
	}

	const closeMenu = () => {
		setMobileMenu(false)
	}

	const toggleCategoryDropdown = () => {
		setCategoryDropdownVisible(!categoryDropdownVisible)
	}

	const [openProfile, setOpenProfile] = useState(false)
	const [products, setProducts] = useState([])
	const [input, setInput] = useState("")
	const [allProduct, setAllProduct] = useState([])

	const fetchData = async (value) => {
		try {
			const response = await makeApi(`/api/get-all-products`, "GET")

			const getProduct = response.data.products
			const result = getProduct.filter((product) => {
				return (
					value &&
					product &&
					product.name &&
					product.name.toLowerCase().includes(value)
				)
			})
			setAllProduct(getProduct)
			setProducts(result)
		} catch (error) {
			console.error("Error fetching products:", error)
		}
	}

	const clearSearchInput = () => {
		setInput("")
		setProducts([])
	}

	const handleChange = (value) => {
		setInput(value), fetchData(value)
	}

	const [categories, setCategories] = useState([])

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await makeApi("/api/get-all-categories", "GET")
				if (response.status === 200) {
					setCategories(response.data.categories)
				}
			} catch (error) {
				console.log("Error fetching categories:", error)
			}
		}
		fetchCategories()
	}, [])

	useEffect(() => {
		const token = localStorage.getItem("token")

		if (token) {
			setIsloggedIn(true)
		} else {
			setIsloggedIn(false)
		}

		const timeoutId = setTimeout(() => {
			setShowNavbar(true)
		}, 1000)

		return () => clearTimeout(timeoutId)
	}, [localStorage.getItem("token")])

	// Scroll to top on navigation
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location.pathname])

	const searchRef = useRef(null)

	const handleClickOutside = (event) => {
		if (searchRef.current && !searchRef.current.contains(event.target)) {
			setInput("")
			setProducts([])
		}
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	useEffect(() => {
		const updateCartCount = (count) => {
			setCartCount(count)
		}

		subscribeToCartCount(updateCartCount)

		return () => {
			unsubscribeFromCartCount(updateCartCount)
		}
	}, [])

	return showNavbar ? (
		<div className="navbar">
			<div className="left-navbar">
				{isloggedIn ? (
					<div>
						<img
							// onClick={() => setOpenProfile((prev) => !prev)}
							onClick={() => navigate("/userprofile")}
							src={user_icon}
							alt=""
						/>
					</div>
				) : (
					<p className="btn-btn-primary">
						<Link to="/Signup">
							<IoMdLogIn />
						</Link>
					</p>
				)}

				<ul>
					<li className={location.pathname === "/" ? "active" : ""}>
						<Link to="/">HOME</Link>
					</li>
					<li
						className={
							location.pathname === "/product/all-products" ? "active" : ""
						}
					>
						<Link to="/product/all-products">Shop</Link>
					</li>
					<li className={location.pathname === "/aboutus" ? "active" : ""}>
						<Link to="/aboutus">ABOUT US</Link>
					</li>
				</ul>
			</div>
			<Link to="/">
				<img
					className="center-logo"
					src={assets.logo2}
					alt=""
				/>
			</Link>
			<div className="right-navbar">
				<ul>
					<li
						className={`${shouldApplySpecialStyles() ? "special-navbar" : ""} ${
							location.pathname === "/contact" ? "active" : ""
						}`}
					>
						<Link to="/contact">CONTACT US</Link>
					</li>
				</ul>
				<div className="nav-search-bar">
					<div
						className={shouldApplySpecialStyles() ? "special-search" : "search"}
					>
						<input
							type="text"
							placeholder="SEARCH"
							value={input}
							onChange={(e) => handleChange(e.target.value)}
						/>
						<IoSearch className="search_icon" />
					</div>
					<NavSearchList
						product={products}
						allProduct={allProduct}
						clearSearchInput={clearSearchInput}
					/>
				</div>
				{isloggedIn ? (
					<div className="media-profile-icon">
						<img
							// onClick={() => setOpenProfile((prev) => !prev)}
							onClick={() => navigate("/userprofile")}
							src={user_icon}
							style={{ cursor: "pointer" }}
							alt=""
						/>
					</div>
				) : (
					<button className="btn btn-primary media-login">
						<Link to="/Signup">LOGIN</Link>
					</button>
				)}
				{isloggedIn && (
					<Link to="/cart">
						<div className="nav-cart">
							<span className="cart-no">{cartCount}</span>
							<HiMiniShoppingBag className="cart-icon" />
						</div>
					</Link>
				)}
				<div className="media-navbar">
					<nav>
						<ul className={moblieMenu ? "" : "hide-mobile-menu"}>
							<li className={location.pathname === "/" ? "active" : ""}>
								<Link
									to="/"
									onClick={closeMenu}
								>
									HOME
								</Link>
							</li>
							<li
								className={
									location.pathname === "/product/all-products" ? "active" : ""
								}
							>
								<Link to="/product/all-products">
									PRODUCTS <MdArrowDropDown />
								</Link>
							</li>
							<li className={location.pathname === "/aboutus" ? "active" : ""}>
								<Link
									to="/aboutus"
									onClick={closeMenu}
								>
									ABOUT US
								</Link>
							</li>
							<li className={location.pathname === "/contact" ? "active" : ""}>
								<Link
									to="/contact"
									onClick={closeMenu}
								>
									CONTACT US
								</Link>
							</li>
						</ul>
						<GiHamburgerMenu
							className={
								shouldApplySpecialStyles() ? "special-menu-icon" : "menu-icon"
							}
							onClick={toggleMenu}
						/>
					</nav>
				</div>
			</div>
			{openProfile && (
				<ProfileDropdown
					openProfile={setOpenProfile}
					setOpenProfile={setOpenProfile}
					className="nav-profile-dropdown"
				/>
			)}
		</div>
	) : null
}

export default Navbar
