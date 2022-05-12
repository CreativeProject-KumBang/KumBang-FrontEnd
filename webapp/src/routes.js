import { Navigate } from 'react-router-dom';

import MainLayout from 'components/Layout/Main/MainLayout';
import Main from 'components/Layout/Main/main';

import Login from 'components/Login/Login';

import MypageLayout from 'components/Mypage/MypageLayout';

import RoomBoardLayout from 'components/RoomBoard/RoomBoardLayout';
import CreateRoomBoard from 'components/RoomBoard/createRoomBoard/createRoomBoard';

import BoardMapLayout from 'components/RoomBoard/BoardMapLayout';
import ReadRoomBoardDetail from 'components/RoomBoard/readRoomBoardDetail/readRoomBoardDetail';
import ReadRoomBoardList from 'components/RoomBoard/readRoomBoardList/ReadRoomBoardList';

const routes = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "/", element: <Main />}
		 ],
   
	},
	{
		path: 'app',
		element: <RoomBoardLayout />,
		children: [
			{ path: "RoomBoardRegister", element: <CreateRoomBoard /> },
		]
	},
	{
		path: 'map',
		element: <BoardMapLayout />,
		children: [
			{ path: "RoomBoardRead", element: <ReadRoomBoardList /> },
			{ path: "RoomBoardDetail/:id", element: <ReadRoomBoardDetail /> },
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
		path: "mypage",
		element: <MypageLayout />,
		children: [
			{ path: "info", element: <Info /> },
		  	{ path: "post", element: <MyPost /> },
			{ path: "transaction", element: <Transaction /> },
		  	{ path: "chatbox", element: <ChatBox /> },
			{ path: "wishlist", element: <Wishlists /> },
		  	{ path: "report", element: <ReportHistory /> },
			{ path: "withdrawal", element: <Withdrawal /> }
		],
	},
];

export default routes;