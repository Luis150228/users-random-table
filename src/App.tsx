import './App.css';
import { useUsersData } from './hook/useUsersData';

function App() {
	const { dataUsers } = useUsersData();
	return (
		<>
			<p>Table</p>
			{dataUsers.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Country</th>
						</tr>
					</thead>
					<tbody>
						{dataUsers.map((user) => (
							<tr key={user.login.uuid}>
								<td>{`${user.name.first} ${user.name.last}`}</td>
								<td>{user.email}</td>
								<td>{user.location.country}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
}

export default App;
