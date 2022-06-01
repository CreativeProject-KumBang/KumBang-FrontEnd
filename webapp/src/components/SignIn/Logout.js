const Logout = () => {
    sessionStorage.removeItem('user')
    window.location.href = '/';
    alert('로그아웃되었습니다.');
}

export default Logout;