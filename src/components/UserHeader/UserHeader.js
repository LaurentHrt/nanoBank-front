import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserService } from '../../service/user.service'

export default function UserHeader() {
	const token = useSelector((state) => state.token)
	const [firstName, setFirstName] = useState({})
	const [lastName, setLastName] = useState({})
	const [editedFirstName, setEditedFirstName] = useState({})
	const [editedLastName, setEditedLastName] = useState({})
	const [editMode, setEditMode] = useState(false)
	const userService = new UserService()

	const handleEdit = (e) => {
		setEditMode(true)
	}

	const handleSave = async (e) => {
		const response = await userService.renameUser(
			editedFirstName,
			editedLastName,
			token
		)
		if (response.status === 200 && response.body) {
			setFirstName(response.body.firstName)
			setLastName(response.body.lastName)
			setEditMode(false)
		} else window.alert(response.message)
	}

	const handleCancel = (e) => {
		setEditMode(false)
	}

	useEffect(() => {
		userService.getUserInfos(token).then((userInfos) => {
			if (userInfos.body) {
				setFirstName(userInfos.body.firstName)
				setLastName(userInfos.body.lastName)
				setEditedFirstName(userInfos.body.firstName)
				setEditedLastName(userInfos.body.lastName)
			}
		})
	}, [token])

	const textInputs = (
		<div>
			<input
				type="text"
				id="firstName"
				name="firstName"
				required
				minLength="2"
				maxLength="20"
				size="15"
				value={editedFirstName}
				onChange={(e) => setEditedFirstName(e.target.value)}
			/>
			<input
				type="text"
				id="lastName"
				name="lastName"
				required
				minLength="2"
				maxLength="20"
				size="15"
				value={editedLastName}
				onChange={(e) => setEditedLastName(e.target.value)}
			/>
		</div>
	)

	const SaveCancelButtons = (
		<div className="button-container">
			<button className="save-button" onClick={handleSave}>
				Save
			</button>
			<button className="cancel-button" onClick={handleCancel}>
				Cancel
			</button>
		</div>
	)

	const editButton = (
		<button className="edit-button" onClick={handleEdit}>
			Edit Name
		</button>
	)

	return (
		<div className="header">
			<h1>
				Welcome back
				<br />
				{editMode ? textInputs : `${firstName} ${lastName}!`}
			</h1>
			{editMode ? SaveCancelButtons : editButton}
		</div>
	)
}
