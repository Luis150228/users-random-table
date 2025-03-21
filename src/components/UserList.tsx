import { Result } from '../usersType.d';
interface UserListProps {
	withColor?: boolean;
	deleteRow: (_uuid: string) => void;
	usersData: Result[];
}

export const UserList = ({ withColor, deleteRow, usersData }: UserListProps) => {
	return (
		<table className='users-table'>
			<thead>
				<tr>
					<th>Picture</th>
					<th>Name</th>
					<th>LastName</th>
					<th>Country</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{usersData.map((user) => (
					<tr
						key={user.login.uuid}
						className={withColor ? 'color-row' : ''}>
						<td>
							<img
								className='user-image'
								src={user.picture.thumbnail}
								alt={`imagen de ${user.name.first} ${user.name.last}`}
							/>
						</td>
						<td>{`${user.name.first}`}</td>
						<td>{user.name.last}</td>
						<td>{user.location.country}</td>
						<td>
							<button onClick={() => deleteRow(user.login.uuid)}>Delete</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
