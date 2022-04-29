import { Navigate } from 'react-router-dom';

import MainLayout from 'components/Layout/Main/MainLayout';
import Login from 'components/Login/Login';

import RoomBoardLayout from 'components/RoomBoard/RoomBoardLayout';
import CreateRoomBoard from 'components/RoomBoard/createRoomBoard/createRoomBoard';
import ReadRoomBoardDetail from 'components/RoomBoard/readRoomBoardDetail/readRoomBoardDetail';
import ReadRoomBoardList from 'components/RoomBoard/readRoomBoardList/ReadRoomBoardList';

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
			{ path: "RoomBoardRead", element: <ReadRoomBoardList /> },
			{ path: "RoomBoardRead/:id", element: <ReadRoomBoardDetail /> },
		]
	},
	{
		path: "login",
		element: <Login />,
		children: [
		  { path: "login", element: <Login /> },
		],
	},
];

export default routes;