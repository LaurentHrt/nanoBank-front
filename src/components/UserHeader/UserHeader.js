import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfos } from '../../features/action'
import { UserService } from '../../utils/service/user.service'

export default function UserHeader() {
	const token = useSelector((state) => state.token)
	const userInfos = useSelector((state) => state.userInfos)
	const dispatch = useDispatch()

	const [editedFirstName, setEditedFirstName] = useState({})
	const [editedLastName, setEditedLastName] = useState({})
	const [editMode, setEditMode] = useState(false)

	const toogleEdit = (e) => {
		setEditMode(!editMode)
	}

	const handleSave = async (e) => {
		const userService = new UserService()
		const response = await userService.renameUser(
			editedFirstName,
			editedLastName,
			token
		)
		if (response.status === 200 && response.body) {
			dispatch(setUserInfos(response.body))
			setEditMode(false)
		} else window.alert(response.message)
	}

	useEffect(() => {
		const userService = new UserService()
		userService.getUserInfos(token).then((userInfos) => {
			if (userInfos.body) {
				dispatch(setUserInfos(userInfos.body))
				setEditedFirstName(userInfos.body.firstName)
				setEditedLastName(userInfos.body.lastName)
			}
		})
	}, [token, dispatch])

	const textInputs = (
		<div>
			<input
				name="firstName"
				value={editedFirstName}
				onChange={(e) => setEditedFirstName(e.target.value)}
			/>
			<input
				name="lastName"
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
			<button className="cancel-button" onClick={toogleEdit}>
				Cancel
			</button>
		</div>
	)

	const editButton = (
		<button className="edit-button" onClick={toogleEdit}>
			Edit Name
		</button>
	)

	return (
		<div className="header">
			<h1>
				Welcome back
				<br />
				{editMode
					? textInputs
					: `${userInfos.firstName} ${userInfos.lastName}!`}
			</h1>
			{editMode ? SaveCancelButtons : editButton}
		</div>
	)
}
