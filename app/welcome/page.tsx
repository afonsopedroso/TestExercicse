"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Person from "../components/person";
import ThemeToggle from "../components/ThemeToggle";
import { redirect } from "next/navigation";

interface User {
  first_name: string;
  last_name: string;
  avatar: string;
  email: string
  id:number
}

interface ListUsers {
  data: Array<User>; // Correctly define the structure of each user in the array
  page: number;
  per_page: number;
  support: any;
  total: number;
  total_pages: number;
}

export default function WelcomePage() {
  if(!sessionStorage.getItem('isAuth')){
        redirect("/login")
  }
  const [username, setUsername] = useState("");
  const [editMode, setEditMode] = useState(false)
  const [createMode, setCreateMode] = useState(false)
    const [editData, setEditData] = useState({
    first_name: "",
    last_name: "",
    avatar: "",
    email: "",
  });

  const [createData, setCreateData] = useState({
    first_name: "",
    last_name: "",
    avatar: "",
    email: "",
  })

  const [editUserId, setEditUserId] = useState(0)
  const [page, setPage] = useState(1)
  const router = useRouter();
  const [listUsers, setListUsers] = useState<ListUsers | null>(null);


  useEffect(() => {
    
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername || "");
    fetchUsers(page)
  }, []);
  const fetchUsers = async(pageNumber:number) => {
    try{
        const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
       
      })

      const result = await response.json();
      setListUsers(result)
    }
    catch(err){
      console.error(err)
    }
    
}

const nextPage = async() => {
  if (listUsers && page < listUsers.total_pages) {
    const nextPage = page + 1
    setPage(nextPage)
    await fetchUsers(nextPage)
}
}

const prevPage = async() => {
 if (listUsers && page > 1) {
    const prevPage = page - 1
    setPage(prevPage)
    await fetchUsers(prevPage)
}
}

const editUser = async(id:number) => {
  setEditUserId(id)
  setEditMode(true)
}

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(editMode == true)
      setEditData((prev) => ({ ...prev, [name]: value }));
    else if(createMode == true)
      setCreateData((prev) =>({...prev, [name]: value}));
  };

const saveUser = async(userId: number) => {

  const updatedUsers = listUsers?.data?.map((user) =>
    user.id === userId
      ? { ...user, ...editData, avatar: editData.avatar || user.avatar }
      : user
  ) || [];

  if (listUsers) {
    setListUsers({ ...listUsers, data: updatedUsers });
  }

   try {
    // Perform the PUT request
    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUsers),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    const updatedResponseData = await response.json();

   
  } catch (error) {
    console.error("Error updating user:", error);
  }
  setEditUserId(0)
  setEditMode(false)

 
};

const openCreateModal = () => {
  setCreateMode(true)
}
const createUser = async() => {
  const createdUser =  { ...createData, avatar: "https://reqres.in/img/faces/2-image.jpg" }


  try{
    const response = await fetch('https://reqres.in/api/users/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(createdUser)
    })

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`);
    }

    const newUser = await response.json();
    console.log('User created successfully:', newUser);

    if (listUsers) {
      setListUsers({ ...listUsers, data: [...listUsers.data, newUser] });
    }
    setCreateMode(false)
  } catch (error) {
    console.error('Error creating user:', error);
    setCreateMode(false)

  }
 
}

const cancel = () => {
  setEditMode(false)
}
const removeUser = async(id:number) => {
   try {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }


    const updatedUsers = listUsers?.data.filter((user) => user.id !== id) || [];
    if (listUsers) {
      setListUsers({ ...listUsers, data: updatedUsers });
    }
  } catch (error) {
    console.error(error)
  }
}
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
    event.preventDefault(); 
    router.replace(path);
    sessionStorage.clear();
  };

  return (
    <div>
    <div className="mx-5 mt-5" >
      <div className="flex"> 
        <h1>Welcome {username}</h1>
        <div className="ml-auto flex items-center"><div><ThemeToggle/></div><a className='pl-3 underline text-blue-400' href="/register" onClick={(e) => handleLogout(e, "/register")}>Logout</a></div></div>
     
     <div className="flex w-full">
      <div className="pt-2">List Users</div><div className="pl-2 pt-2 flex justify-center items-center">Page {page}</div><div className="pt-2 pl-3"><button onClick={() => openCreateModal()}>Create User</button></div>
      <div className="ml-auto">
        <button onClick={prevPage}>-</button>
        <button onClick={nextPage} className="pl-3">+</button>
      </div>
     </div>
      
      <div className="grid grid-cols-3 ">{
        listUsers?.data.length!= 0 && listUsers?.data.map((user) => {
          return(
            <div className="pb-3" key={user.id}>
              
            <Person  first_name={user.first_name} last_name={user.last_name} avatar={user.avatar} email={user.email} />
            <div className='flex'>
              <button onClick={() => editUser(user.id)}>Edit</button>
              <button onClick={() => removeUser(user.id)} className='pl-2'>Delete</button>
            </div>
          </div>
          )
        })
      }</div>

    </div>
    <div >{editMode == true ? (<div className="flex justify-center bg-slate-600">
      <div className="max-w-[500px] max-h-[700px] bg-white">
          <div>
                <input
                  type="text"
                  name="first_name"
                  value={editData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="last_name"
                  value={editData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
           
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <button onClick={() => saveUser(editUserId)}>Save</button>
                <button className="pl-2" onClick={() => cancel()}>Cancel</button>
              </div>
      </div>

    </div>) : null}</div>
    <div >{createMode == true ? (<div className="flex justify-center bg-slate-600">
      <div className="max-w-[500px] max-h-[700px] bg-white">
          <div>
                <input
                  type="text"
                  name="first_name"
                  value={createData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="last_name"
                  value={createData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
           
                <input
                  type="email"
                  name="email"
                  value={createData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <button onClick={() => createUser()}>Save</button>
                <button className="pl-2" onClick={() => cancel()}>Cancel</button>
              </div>
      </div>

    </div>) : null}</div>
    
</div>
  );
}
