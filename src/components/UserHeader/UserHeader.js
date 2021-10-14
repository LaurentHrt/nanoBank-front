import { useEffect, useState } from 'react'
import { useSelector, useStore } from 'react-redux'
import { fetchOrUpdateUserInfos } from '../../features/user/user.reducer'
import { selectUserInfos } from '../../features/user/user.selector'

export default function UserHeader() {
	const userInfos = useSelector(selectUserInfos)
	const store = useStore()

	const [editedFirstName, setEditedFirstName] = useState({})
	const [editedLastName, setEditedLastName] = useState({})
	const [editMode, setEditMode] = useState(false)

	const toogleEdit = (e) => {
		setEditMode(!editMode)
	}

	const handleSave = async (e) => {
		// TODO
	}

	useEffect(() => {
		fetchOrUpdateUserInfos(store)
	}, [store])

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
