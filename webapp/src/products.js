import axios from 'axios';
import React, {useEffect, useState} from 'react'; 
import { useParams } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom'; 

const UserList = ({users}) => {
    console.log(users)
    return (
        <div>
            {users.map(user => {
                return (<div key="">
                    {user.email}
                </div>)
            })}
        </div>
    )
}
const Product = () => {
    const[users, setUsers] = useState([]);

    useEffect( ()=>{
        axios.get('http://jsonplaceholder.typicode.com/users')
        .then(response => {
            console.log(response)
            setUsers(response.data);
        });
    }, []);

     const productId = useParams().productId; 
     const location = useLocation(); 
     return ( 
     <> 
     <h3>{productId}번 상품 페이지 입니다.</h3> 
     <ul> 
         <li>hash : {location.hash}</li> 
         <li>pathname : {location.pathname}</li> 
         <li>search : {location.search}</li> 
         <li>state : {location.state}</li> 
         <li>key : {location.key}</li> 
    </ul> 
    <UserList users={users}/>
    </> ); 
} 
export default Product;

