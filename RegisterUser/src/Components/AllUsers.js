import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

function AllUsers() {
    const navigate= useNavigate();
    const[user, setUser]= useState([]);
   // const first_host = process.env.REACT_APP_HOST||"localhost"; 
    let hostName = window.location.hostname;
    const host = 'https://'+hostName.replace('9092','8082');
//const second_host= document.baseURI;


    //const third_host = window.__RUNTIME_CONFIG__.REACT_APP_HOST||"localhost"; 
    const setUserData =()=>{
        console.log('first_host-->'+host);
      //  console.log('second_host-->'+second_host);
        //console.log('third_host-->'+third_host);
       // axios.get("https://6629c5a967df268010a18ed6.mockapi.io/api/v1/user")
       //axios.get(`https://app:8080/test/users`)       
       //axios.get(`/test/users`)
       axios.get(`${host}/test/users`)
       .then(response => {       
          console.log(response)
          setUser(response.data)
        })
        .catch(error =>{
            alert("Error occured!"+ error);
//  console.log("host="+`${host}`)
        })
    }
    useEffect(()=>{
        setUserData();
       // console.log(" ip: "+`${host}`);
    },[])

    const removeUser=(userId)=>{
        //axios.delete("https://6629c5a967df268010a18ed6.mockapi.io/api/v1/user/"+userId)
        //axios.delete(`http://${host}:8080/test/user/`+userId)
        //axios.delete(`/test/user/`+userId)
       // axios.delete(`http://localhost:8082/test/user/`+userId)
        axios.delete(`${host}/test/user/`+userId)
        .then(response =>{
            setUserData();
        })
        .catch(error =>{
            alert("Error occured while deleting a record: "+error)
        })
    }
    return (
        <div>            
            <>
            <h3>List of Users:</h3>
            <table align='center'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Password</th>
                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody>

                  {
                    user &&
                    user.map((user, index) => (

                      <tr key={user.id}>
                        <th scope="row" >{user.id}</th>
                        <td>{user.name}</td>
                        <td>{user.password}</td>


                        <td >

                          <Link to={"/edit/" + user.id}>Edit</Link>


                          <button
                            onClick={() => removeUser(user.id)} className="button"
                          > Delete
                          </button>

                        </td>
                      </tr>

                    ))
                  }

                </tbody>
              </table>
            </>
        </div>
    )
}

export default AllUsers
