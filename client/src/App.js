import { apiAddUser, apiDeleteUser, apiGetAllUser } from "./apis/user/user";
import { useState, useEffect } from 'react'

function App() {

  const [allUser, setAllUser] = useState(null)
  const [user, setuser] = useState({
    name: '',
    mssv: ''
  });
  const [update, setUpdate] = useState(false);

  const fetchUser = async() => {
    const response = await apiGetAllUser()
    if(response.success){
      setAllUser(response.mes)
      console.log(allUser)
    }
  }

  const handleDelete = async(uid) => {
    await apiDeleteUser(uid)
    setUpdate(!update)
  }

  const handleAdd = async() => {
    
  }

  useEffect(() => {
    fetchUser()
  },[update]);

  return (
    <div className="flex items-center justify-center flex-col gap-5">
      <h1 className="text-3xl text-black">Danh sách sinh viên</h1>
      <div className="flex gap-5">
        <div className="flex flex-col">
          <label>Tên</label>
          <input className="border p-2"></input>
        </div>
        <div className="flex flex-col">
          <label>Mssv</label>
          <input className="border p-2"></input>
        </div>
      <button onClick={() => handleAdd()} className="border bg-green-600 px-3">Thêm</button>
      </div>
      <div>
        <div className="flex w-[650px] bg-blue-500 border">
          <h1 className="w-[100px] flex justify-center">STT</h1>
          <h1 className="w-[200px] flex justify-center border-x">Tên</h1>
          <h1 className="w-[150px] flex justify-center border-r">Mã số sinh viên</h1>
          <h1 className="w-[200px] flex justify-center">Hành động</h1>
        </div>
        {allUser?.map((el, index) => (
          <div key={el._id} className="flex justify-around w-[650px] border">
            <h1 className="w-[100px] flex justify-center">{index+1}</h1>
            <h1 className="w-[200px] flex justify-center border-x">{el.name}</h1>
            <h1 className="w-[150px] flex justify-center border-r">{el.mssv}</h1>
            <button className="w-[100px] flex justify-center border-r hover:bg-yellow-600">Sửa</button>
            <button onClick={() => handleDelete(el._id)} className="w-[100px] flex justify-center hover:bg-red-600">Xóa</button>
          </div>
        ))}
      </div>
      <div>

      </div>
    </div>
  );
}

export default App;
