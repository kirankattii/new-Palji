import React, { useState, useEffect } from "react"
import "./editUserProfile.css"
import { useNavigate } from "react-router-dom"
import { makeApi } from "../../api/callApi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"

const EditUserProfile = () => {
	const navigate = useNavigate()
	const [userProfile, setUserProfile] = useState("")
	const [mobileNumberChanged, setMobileNumberChanged] = useState(false)
	const [editData, setEditData] = useState({
		firstName: "",
		lastName: "",
		gender: "",
		dateofbirth: "",
		// city: "",
		email: "",
		mobileNumber: "",
		userImage: "",
	})
	console.log("---------------------", editData)
	// Fetch existing user details on component mount
	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const response = await makeApi("/api/my-profile", "GET")
				const user = response.data.user
				setEditData({
					firstName: user.firstName,
					lastName: user.lastName,
					gender: user.gender,
					// dateofbirth: user?.dateofbirth(0, 10),
					email: user.email,
					mobileNumber: user.mobileNumber.toString(),
					userImage: user.userImage,
				})
			} catch (error) {
				console.log(error)
			}
		}
		fetchUserDetails()
	}, [])

	const onChangeHandler = (event) => {
		setEditData({
			...editData,
			[event.target.name]: event.target.value,
		})
		if (event.target.name === "mobileNumber") {
			setMobileNumberChanged(true)
		}
	}

	const onSubmitHandler = async (event) => {
		event.preventDefault()
		try {
			const userDataToUpdate = { ...editData }
			console.log("mobileNumberChanged", mobileNumberChanged)
			if (!mobileNumberChanged) {
				delete userDataToUpdate.mobileNumber
			}
			// show error if mobile number is less than 10 digits
			if (mobileNumberChanged) {
				if (editData.mobileNumber.length < 10) {
					toast.error("Please enter valid mobile number")
					return
				}
			}
			//  call api
			const response = await makeApi(
				"/api/update-user",
				"PUT",
				userDataToUpdate
			)
			toast.success(response.data.message, {
				onClose: () => {
					if (response.data.user.role === "admin") {
						navigate("/userprofile")
					}
				},
			})
		} catch (error) {
			console.log("Error updating user details:", error.response.data.message)
			toast.error(error.response.data.message)
		}
	}
	const handleProfileUpload = async (event, index) => {
		try {
			const file = event.target.files[0]

			// if (file.type.startsWith("image/")) {
			if (file) {
				console.log(file)

				const compressedFile = await file

				const data = new FormData()
				data.append("file", compressedFile)
				data.append("upload_preset", "ou1fk438")

				await axios
					.post(
						`https://api.cloudinary.com/v1_1/dyl3gzm7d/image/upload`,

						data
					)
					.then((response) => {
						if (response.status === 200) {
							const imageURL = response.data.url
							// setFormData({ ...formData, screenshot: imageURL });
							//  setUserProfile(imageURL);
							setEditData({
								...editData,
								userImage: imageURL,
							})
						}
					})
			}
		} catch (error) {
			console.log("image upload error", error)
		}
	}
	return (
		<>
			<ToastContainer autoClose={1300} />
			<div className="editUserProfile">
				<form
					action=""
					className="edit-form"
					onSubmit={onSubmitHandler}
				>
					<div className="edit-about-section">
						<div className="file-input">
							<div>
								<input
									id="file"
									type="file"
									onChange={(e) => handleProfileUpload(e)}
									className="p-5"
								/>
							</div>
							<div className="select-user-img">
								<img
									src={editData?.userImage}
									alt="profile"
								/>
							</div>
						</div>

						<div className="about-edit-btn">
							<h2>About</h2>
							<button type="button">Edit</button>
						</div>

						<div className="edit-username">
							<input
								type="text"
								placeholder="First Name"
								name="firstName"
								value={editData.firstName}
								onChange={onChangeHandler}
							/>
							<input
								type="text"
								placeholder="Last Name"
								name="lastName"
								value={editData.lastName}
								onChange={onChangeHandler}
							/>
						</div>
						<div className="edit-gender">
							<label htmlFor="">Gender</label>
							<div>
								<div className="male-female">
									<div>
										<input
											type="radio"
											name="gender"
											value="male"
											checked={editData.gender === "male"}
											onChange={onChangeHandler}
										/>
										<label htmlFor="male">Male</label>
									</div>
									<div>
										<input
											type="radio"
											name="gender"
											value="female"
											checked={editData.gender === "female"}
											onChange={onChangeHandler}
										/>
										<label htmlFor="female">Female</label>
									</div>
								</div>
							</div>
						</div>
						<div className="edit-dob">
							<label htmlFor="">D.O.B</label>
							<input
								type="date"
								name="dateofbirth"
								value={editData.dateofbirth}
								onChange={onChangeHandler}
							/>
						</div>
					</div>
					<div className="edit-contacts">
						<h2>Contacts</h2>
						<div className="edit-email">
							<label htmlFor="">Email</label>
							<input
								type="email"
								placeholder="Johndeo@gmail.com"
								name="email"
								value={editData.email}
								onChange={onChangeHandler}
								disabled
							/>
						</div>
						<div className="edit-pno">
							<label htmlFor="">Phone number</label>
							<input
								type="text"
								placeholder="Phone Number"
								name="mobileNumber"
								value={editData.mobileNumber}
								onChange={onChangeHandler}
							/>
						</div>
					</div>
					{/* <div className="edit-security">
          <h2>Security</h2>

          <div className="edit-password">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={editData.password}
              onChange={onChangeHandler}
            />
          </div>
        </div> */}
					<button
						type="submit"
						className="edit-save-btn"
					>
						Update
					</button>
				</form>
			</div>
		</>
	)
}

export default EditUserProfile
