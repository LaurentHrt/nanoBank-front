import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrUpdateUserInfos } from '../../features/user/user.reducer'
import { userInputAction } from '../../features/user/user.actions'
import {
	selectUserInfos,
	selectUserInput,
} from '../../features/user/user.selector'

export default function UserHeader() {
	const dispatch = useDispatch()
	const userInfos = useSelector(selectUserInfos)
	const userInput = useSelector(selectUserInput)

	const [editMode, setEditMode] = useState(false)

	const toogleEdit = (e) => {
		setEditMode(!editMode)
	}

	const handleSave = async (e) => {
		dispatch(fetchOrUpdateUserInfos)
		// TODO
	}

	useEffect(() => {
		dispatch(fetchOrUpdateUserInfos)
	}, [dispatch])

	const textInputs = (
		<div>
			<input
				name="firstName"
				value={userInput.firstName}
				onChange={(e) =>
					dispatch(
						userInputAction({
							firstName: e.target.value,
							lastName: userInput.lastName,
						})
					)
				}
			/>
			<input
				name="lastName"
				value={userInput.lastName}
				onChange={(e) =>
					dispatch(
						userInputAction({
							firstName: userInput.firsNameName,
							lastName: e.target.value,
						})
					)
				}
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
