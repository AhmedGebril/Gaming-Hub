import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserLogged } from '../Store/UserContextStore';
import axios from 'axios';
import LoadingScreen from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function Account() {
  const navigate = useNavigate();
  let user = useContext(UserLogged)
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);
  const [newUserData, setNewUserData] = useState({});
  const [loaded,setLoading]=useState(false)
  const [oldData,setOldData]=useState(null)

    async function GetInfo(){
    await axios.get(`http://localhost:3001/AccountInfo?user=${user.name}`).then(res=>{
        setUserData(res.data)
        setOldData(res.data.name)
    }).catch(err=>{
        console.log(err)
    })
  }

  useEffect(()=>{
    setLoading(true);
    GetInfo()
    setTimeout(() => {
    setLoading(false);
    },500)
    },[])

  const handleEdit = () => {
    setEditing(true);
    setNewUserData(userData);
    setOldData(userData.name)
    console.log(oldData)
    console.log(user.name)
  };
  const handleCancel = () => {
    setEditing(false);
    setNewUserData({});
    setOldData(null)
  };

  async function handleSave() {

    // Check if any field in newUserData is empty
    const updatedUserData = {};
    Object.keys(newUserData).forEach((key) => {
      if (!newUserData[key]) {
        updatedUserData[key] = userData[key];
      } else {
        updatedUserData[key] = newUserData[key];
      }
    });
    // send updated user data to API endpoint
    await axios.post('http://localhost:3001/updateInfo',{ newData:updatedUserData,oldData:oldData})
      .then(response => {
        setUserData(response.data);
        setEditing(false);
        setNewUserData({});
        setOldData(response.data.username)
        user.setPassword(response.data.password)
        user.setName(response.data.username)
        navigate('/updatingMiddleware')
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    setNewUserData({
      ...newUserData,
      [event.target.name]: event.target.value
    });
  };



  return (
    <>
    {loaded?<LoadingScreen/>:<div>
      <h1>Account Information</h1>
      {editing ?
        <form>
          <label>
            Name:
            <input type="text" name="name" value={newUserData.name || ''} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={newUserData.email || ''} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={newUserData.password || ''} onChange={handleChange} />
          </label>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
        :
        <div>
          <p id='username'><strong>Name:</strong> {userData.name}</p>
          <p id="userpassword"><strong>Email:</strong> {userData.email}</p>
          <p id="useremail"><strong>Password:</strong> {userData.password}</p>
          <button type="button" onClick={handleEdit}>Edit</button>
        </div>
      }
    </div>}    
    </>
  );
}