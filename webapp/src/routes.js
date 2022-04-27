import RoomBoardLayout from 'components/RoomBoard/RoomBoardLayout/RoomBoardLayout';
import { Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/Main/MainLayout';
import CreateRoomBoard from './components/RoomBoard/createRoomBoard/createRoomBoard';
import Login from 'components/Login/Login';
import Map from 'components/NaverMap/Map';

const routes = [
	{
		path: "/",
		element: <MainLayout />,
		children: [{ path: "/", element: <Navigate to="/app" /> }],

	},
	{
		path: 'app',
		element: <RoomBoardLayout />,
		children: [
			{ path: "RoomBoardRegister", element: <CreateRoomBoard /> },
			{ path: "map", element: <Map /> },
		]
	},
	{
		path: "login",
		element: <Login />,
		children: [
		  { path: "login", element: <Login /> },
		],
	},
	{
		path: "map",
		element: <Map />,
		children: [
		  { path: "map", element: <Map /> },
		],
	},
];

export default routes;