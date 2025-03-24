import { useMemo, useState } from 'react';
import './App.css';
import { useUsersData } from './hook/useUsersData';
import { UserList } from './components/UserList';

function App() {
	const { dataUsers, renewUsers, originalUsers, loading, addPage, error } = useUsersData();
	const usersData = useMemo(() => {
		// console.log('Recalculando usersData'); // Esto se imprime solo si dataUsers cambia
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

	const handlePage = () => {
		addPage();
	};

	const filteredUsers =
		filterInput !== null
			? usersData.filter((user) => user.location.country.toLowerCase().includes(filterInput.toLowerCase()))
			: usersData;

	const handleDeleteRow = (_uuid: string) => {
		// console.log('Delete row with uuid:', _uuid);
		const sortedUsers = usersData.filter((user) => user.login.uuid !== _uuid);
		renewUsers(sortedUsers);
	};

	const sortedUsers = useMemo(() => {
		// console.log('sortedUsers');
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

	const handleRestoreState = () => {
		renewUsers(originalUsers.current);
	};

	// console.log('Renderizando App'); // Esto se imprime cada vez que el componente se renderiza

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
							{sortUsers !== 'none' ? `Not Sort by ${sortUsers}` : `Sort by Country`}
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
					{sortedUsers.length > 0 ? (
						<div className='content-table'>
							<UserList
								sortListUsers={handleSortBy}
								deleteRow={handleDeleteRow}
								usersData={sortedUsers}
								withColor={withColor}
							/>
						</div>
					) : (
						<h3>Sin Usuarios</h3>
					)}
					{loading === false ? (
						<button
							className='btn-plus-users'
							onClick={handlePage}>
							Show more users
						</button>
					) : loading === true && error !== true ? (
						<h1>...Loading</h1>
					) : error === true ? (
						<h1>Error</h1>
					) : null}
				</main>
			</section>
		</>
	);
}

export default App;
