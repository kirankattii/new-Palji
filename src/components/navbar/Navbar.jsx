
import React, { useContext, useEffect, useRef, useState } from "react"
import user_icon from "../../assets/Male User.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { assets } from "../../assets/assets"
import { IoSearch } from "react-icons/io5"
import { HiMiniShoppingBag } from "react-icons/hi2"
import { GiHamburgerMenu } from "react-icons/gi"
import { ShopContext } from "../../context/ShopContext"
import { FaRegHeart } from "react-icons/fa"
import { makeApi } from "../../api/callApi"
import NavSearchList from "../navSearchList/NavSearchList"
import ProfileDropdown from "../profileDropdown/ProfileDropdown"
import {
	subscribeToCartCount,
	unsubscribeFromCartCount,
} from "../../utils/productFunction"

import "./navbar.css"
import { homeImg } from "../../assets/home/home"

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

	const [moblieMenu, setMobileMenu] = useState(false)
	const [openProfile, setOpenProfile] = useState(false)
	const [products, setProducts] = useState([])
	const [input, setInput] = useState("")
	const [allProduct, setAllProduct] = useState([])
	const [categories, setCategories] = useState([])

	const fetchData = async (value) => {
		try {
			const response = await makeApi(
				`/api/get-all-products?perPage=1550&page=1`,
				"GET"
			)
			const getProduct = response.data.products
			const result = getProduct.filter((product) => {
				return (
					value &&
					product &&
					product.name &&
					product.name.toLowerCase().includes(value.toLowerCase())
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
		setInput(value)
		fetchData(value)
	}

	const toggleMenu = () => {
		setMobileMenu(!moblieMenu)
	}

	const closeMenu = () => {
		setMobileMenu(false)
	}

	const toggleCategoryDropdown = () => {
		setCategoryDropdownVisible(!categoryDropdownVisible)
	}

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
		setIsloggedIn(!!token)

		const timeoutId = setTimeout(() => {
			setShowNavbar(true)
		}, 1000)

		return () => clearTimeout(timeoutId)
	}, [localStorage.getItem("token")])

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
				{/* {isloggedIn ? ( */}
				<div>
					<img
						onClick={() => navigate(isloggedIn ? "/userprofile" : "/login")}
						src={homeImg.profile}
						alt=""
					/>
				</div>
				{/* ) : (
					<p className="btn-btn-primary">
						<Link
							to="/Signup"
							className="user_icon_login"
						>
							<img
								// onClick={() => navigate("/userprofile")}
								src={user_icon}
								alt=""
							/>
							<p>LOGIN</p>
						</Link>
					</p> */}
				{/* )} */}

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
						className={`${shouldApplySpecialStyles() ? "special-navbar" : ""} ${location.pathname === "/contact" ? "active" : ""
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
							placeholder="Search"
							value={input}
							onChange={(e) => handleChange(e.target.value)}
						/>
						<IoSearch className="search_icon" />
					</div>
					<NavSearchList
						product={products}
						clearSearchInput={clearSearchInput}
						input={input}
					/>
				</div>
				{/* {isloggedIn && (
					<div
						className="navbar_wishlist"
						onClick={() => navigate("/userprofile/mywatchlist")}
					>
						<FaRegHeart />
					</div>
				)} */}
				{isloggedIn ? (
					<div className="media-profile-icon">
						<img
							onClick={() => navigate("/userprofile")}
							src={user_icon}
							style={{ cursor: "pointer" }}
							alt=""
						/>
					</div>
				) : (
					<div
						className="responcive_profile_login"
						style={{ cursor: "pointer" }}
						onClick={() => navigate(isloggedIn ? "/userprofile" : "/login")}
					>
						<img
							// onClick={() => navigate("/userprofile")}
							src={homeImg.profile}
							alt=""
						/>
						{/* <p>LOGIN</p> */}
					</div>
				)}
				{/* {isloggedIn && ( */}
				<Link to={isloggedIn ? "/cart" : "/login"}>
					<div className="nav-cart">
						<span className="cart-no">{cartCount}</span>
						{/* <HiMiniShoppingBag className="cart-icon" /> */}
						<img src={homeImg.cart} alt="" className="cart-icon" />
					</div>
				</Link>
				{/* )} */}
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
								<Link
									to="/product/all-products"
									onClick={closeMenu}
								>
									SHOP
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
			{openProfile &&
			{
				/* <ProfileDropdown
				openProfile={setOpenProfile}
				setOpenProfile={setOpenProfile}
				className="nav-profile-dropdown"
			/> */
			}}
		</div>
	) : null
}

export default Navbar
