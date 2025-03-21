import { useMemo, useState } from 'react';
import './App.css';
import { useUsersData } from './hook/useUsersData';
import { UserList } from './components/UserList';

function App() {
	const { dataUsers, renewUsers, originalUsers } = useUsersData();
	const usersData = useMemo(() => {
		console.log('Recalculando usersData'); // Esto se imprime solo si dataUsers cambia
		return dataUsers;
	}, [dataUsers]);

	const [withColor, setWithColor] = useState(false);
	const [sortUsers, setSortUsers] = useState<string>('none');
	const [filterInput, setFilterInput] = useState<string | null>(null);

	const handleColor = () => {
		setWithColor(!withColor);
	};

	const handleSortBy = (e: React.MouseEvent<HTMLElement>) => {
		const { sort } = e.currentTarget.dataset;
		// console.log(sort);
		if (sort !== undefined) setSortUsers((prevSortType) => (prevSortType === sort ? 'none' : sort));
	};

	const filteredUsers =
		filterInput !== null
			? usersData.filter((user) => user.location.country.toLowerCase().includes(filterInput.toLowerCase()))
			: usersData;

	const sortedUsers = useMemo(() => {
		if (sortUsers === 'country') {
			return filteredUsers.slice().sort((a, b) => a.location.country.localeCompare(b.location.country));
		} else if (sortUsers === 'lastname') {
			return filteredUsers.slice().sort((a, b) => a.name.last.localeCompare(b.name.last));
		} else if (sortUsers === 'name') {
			return filteredUsers.slice().sort((a, b) => a.name.first.localeCompare(b.name.first));
		} else {
			return filteredUsers; // Sin ordenamiento
		}
	}, [filteredUsers, sortUsers]);

	const handleDeleteRow = (_uuid: string) => {
		console.log('Delete row with uuid:', _uuid);
		const sortedUsers = usersData.filter((user) => user.login.uuid !== _uuid);
		renewUsers(sortedUsers);
	};

	const handleRestoreState = () => {
		renewUsers(originalUsers.current);
	};

	console.log('Renderizando App'); // Esto se imprime cada vez que el componente se renderiza

	return (
		<>
			<section className='container'>
				<header>
					<div>
						<h1>Users</h1>
					</div>
					<div className='actions'>
						<button onClick={handleColor}>Row Colors</button>
						<button
							onClick={handleSortBy}
							data-sort={'country'}>
							{sortUsers === 'country' ? 'Not Sort by country' : 'Sort by country'}
						</button>
						<button onClick={handleRestoreState}>Restore State</button>
						<input
							onChange={(e) => setFilterInput(e.target.value)}
							type='text'
							placeholder='Filter by country'
						/>
					</div>
				</header>
				<main>
					{usersData.length > 0 ? (
						<UserList
							sortListUsers={handleSortBy}
							deleteRow={handleDeleteRow}
							usersData={sortedUsers}
							withColor={withColor}
						/>
					) : (
						<p>Loading...</p>
					)}
				</main>
			</section>
		</>
	);
}

export default App;
