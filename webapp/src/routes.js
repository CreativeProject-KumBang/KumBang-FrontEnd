import { Navigate } from 'react-router-dom';
import isLogin from 'access/isLogin';
import MainLayout from 'components/Layout/Main/MainLayout';
import Main from 'components/Layout/Main/main';

import Login from 'components/SignIn/Login';
import Logout from 'components/SignIn/Logout';
import SignUpLayout from 'components/SignUp/signUpLayout';
import Authentication from 'components/SignUp/authentication';
import SignUp from 'components/SignUp/signup';

import MypageLayout from 'components/Mypage/MypageLayout';
import MypageLayout2 from 'components/Mypage/MypageLayout2';
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
import ReadRoomBoardLayout from 'components/RoomBoard/readRoomBoardDetail/readRoomBoardLayout';
import PrivateRoutes from 'access/PrivateRoutes';

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
		element: <PrivateRoutes user={isLogin()}><RoomBoardLayout /></PrivateRoutes>,
		children: [
			{ path: "register", element: <CreateRoomBoard /> },
			{ path: "update", element: <UpdateRoomBoard /> },
		]
	},
	{
		path: 'rooms',
		element: <PrivateRoutes user={isLogin()}><ReadRoomBoardLayout /></PrivateRoutes>,
		children: [
			{ path: ":id", element: <ReadRoomBoardDetail setX={()=>{}} setY={()=>{}} /> },
		]
	},
	{
		path: 'map',
		element: <ReadRoomBoardList />,
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
		],
	},
	{
		path: "logout",
		element: <Logout />
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
		element: <PrivateRoutes user={isLogin()}><MypageLayout2/></PrivateRoutes>,
	},
	{
		path: "mypage",
		element:  <PrivateRoutes user={isLogin()}><MypageLayout /></PrivateRoutes>,
		children: [
			{ path: "info", element: <Info /> },
		  	{ path: "post", element: <MyPost /> },
			{ path: "transaction", element: <Transaction /> },
		  	{ path: "chatlist", element: <ReadChatList /> },
			{ path: "wishlist", element: <Wishlists /> },
		  	{ path: "report", element: <ReportHistory /> },
			{ path: "withdrawal", element: <Withdrawal /> },
			{ path: "chatlist", element: <ReadChatList /> },
			{ path: "detail/:id", element: <ReadRoomBoardDetail setX={()=>{}} setY={()=>{}} /> },
		],
	},
	{
		path: "chat",
		element: <PrivateRoutes user={isLogin()}><ChatLayout /></PrivateRoutes>,
		children: [
			{ path: "detail", element: <ReadChatDetail /> },
			{ path: "room/:id", element: <ReadRoomBoardDetail setX={()=>{}} setY={()=>{}} /> },
		],
	},
];

export default routes;