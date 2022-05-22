import { Navigate } from 'react-router-dom';

import MainLayout from 'components/Layout/Main/MainLayout';
import Main from 'components/Layout/Main/main';

import Login from 'components/SignIn/Login';
import SignUpLayout from 'components/SignUp/signUpLayout';
import Authentication from 'components/SignUp/authentication';
import SignUp from 'components/SignUp/signup';

import MypageLayout from 'components/Mypage/MypageLayout';
import Info from 'components/Mypage/info';
import MyPost from 'components/Mypage/mypost';
import Transaction from 'components/Mypage/transaction';
import ChatBox from 'components/Mypage/chatbox';
import Wishlists from 'components/Mypage/wishlists';
import ReportHistory from 'components/Mypage/reportHistory';
import Withdrawal from 'components/Mypage/withdrawal';

import RoomBoardLayout from 'components/RoomBoard/RoomBoardLayout';
import CreateRoomBoard from 'components/RoomBoard/createRoomBoard/createRoomBoard';
import UpdateRoomBoard from 'components/RoomBoard/updateRoomBoard/updateRoomBoard';

import ChatLayout from 'components/Chat/ChatLayout';
import ReadChatList from 'components/Chat/readChatList/ReadChatList';
import ReadChatDetail from 'components/Chat/readChatDetail/ReadChatDetail';

import BoardMapLayout from 'components/RoomBoard/BoardMapLayout';
import ReadRoomBoardDetail from 'components/RoomBoard/readRoomBoardDetail/readRoomBoardDetail';
import ReadRoomBoardList from 'components/RoomBoard/readRoomBoardList/ReadRoomBoardList';
import Product from 'products';
import Dashboard from 'components/Mypage/board';

const routes = [
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "/", element: <Main />}
		 ],
   
	},
	{
		path: 'room',
		element: <RoomBoardLayout />,
		children: [
			{ path: "register", element: <CreateRoomBoard /> },
			{ path: "update", element: <UpdateRoomBoard /> },
		]
	},
	{
		path: 'map',
		element: <BoardMapLayout />,
		children: [
			{ path: "list", element: <ReadRoomBoardList /> },
			{ path: "detail/:id", element: <ReadRoomBoardDetail /> },
		]
	},
	{
		path: "login",
		element: <Login />,
		children: [
		  { path: "login", element: <Login /> },
		  { path: "boards", element: <Dashboard /> },
		],
	},
	{
		path: "boards",
		element: <Dashboard />,
		children: [
		  { path: "boards", element: <Dashboard /> },
		],
	},
	{
		path: "signup",
		element: <SignUpLayout />,
		children: [
		  { path: "", element: <Authentication /> },
		  { path: "detail", element: <SignUp /> }
		],
	},
	{
		path: "mypage",
		element: <MypageLayout />,
		children: [
			{ path: "info/:id", element: <Info /> },
		  	{ path: "post", element: <MyPost /> },
			{ path: "transaction", element: <Transaction /> },
		  	{ path: "chatbox", element: <ChatBox /> },
			{ path: "wishlist", element: <Wishlists /> },
		  	{ path: "report", element: <ReportHistory /> },
			{ path: "withdrawal", element: <Withdrawal /> },
			{ path: "chatlist", element: <ReadChatList /> }
		],
	},
	{
		path: "chat",
		element: <ChatLayout />,
		children: [
			{ path: "list", element: <ReadChatList /> },
			{ path: "detail", element: <ReadChatDetail /> },
		],
	},
];

export default routes;