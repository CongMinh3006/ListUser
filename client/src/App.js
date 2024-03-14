import { apiAddUser, apiDeleteUser, apiGetAllUser, apiUpdateUser } from "./apis/user/user";
import { useState, useEffect } from 'react'

function App() {

  const [allUser, setAllUser] = useState(null)
  const [user, setUser] = useState({
    name: '',
    mssv: ''
  });
  const [editUser, setEditUser] = useState({
    mid: '',
    name: '',
    mssv: ''
  });
  const [update, setUpdate] = useState(false);
  const [edit, setEdit] = useState(false)
  const [search, setSearch] = useState('')

  const fetchUser = async(search) => {
    if(search === ''){
      const response = await apiGetAllUser()
      if(response.success){
        setAllUser(response.mes)
      }
    }else{
      const check = isNaN(parseFloat(search.charAt(0)+3))
      if(check){
        const response = await apiGetAllUser({name: search})
        if(response.success){
          setAllUser(response.mes)
        }
      }else{
        const response = await apiGetAllUser({mssv: search})
        if(response.success){
          setAllUser(response.mes)
        }
      }
    }
  }

  const handleDelete = async(uid) => {
    if(uid === editUser.uid){
      setEdit(false)
    }
    await apiDeleteUser(uid)
    setUpdate(!update)
  }

  const handleUpdate = async() => {
    await apiUpdateUser(editUser)
    setUpdate(!update)
  }

  const handleEdit = (uid, name, mssv) => {
    setEdit(true)
    setEditUser({uid: uid, name: name, mssv: mssv})
  }

  const handleCancel = () => {
    setEdit(false)
    setEditUser({uid: '', name: '', mssv: ''})
  }

  const handleAdd = async() => {
    if(user.name.length < 1 || user.mssv.length < 1){
      window.alert('Thiếu trường')
    }else{
      await apiAddUser(user)
      setUser({name: '', mssv: ''})
      setUpdate(!update)
    }
  }

  useEffect(() => {
    fetchUser(search)
  },[update, search]);

  return (
    <div className="flex items-center justify-center flex-col gap-5 relative">
      <h1 className="text-3xl text-black">Danh sách sinh viên</h1>
      {edit && 
        <div className="flex gap-5">
          <div className="flex flex-col">
            <label>Tên</label>
            <input 
            type="text"
            name="name"
            value={editUser.name}
            onChange={el => setEditUser(prev => ({...prev, name: el.target.value}))} 
            className="border p-2"/>
          </div>
          <div className="flex flex-col">
            <label>Mssv</label>
            <input 
            type="text"
            name="mssv"
            value={editUser.mssv}
            onChange={el => setEditUser(prev => ({...prev, mssv: el.target.value}))} 
            className="border p-2"/>
          </div>
          <button onClick={() => handleUpdate()} className="border bg-green-400 px-3 ">Cập nhật</button>
          <button onClick={() => handleCancel()} className="border bg-red-600 px-3 ">Hủy</button>
        </div>}
      {!edit && <div className="flex gap-5">
        <div className="flex flex-col">
          <label>Tên</label>
          <input 
          type="text"
          name="name"
          value={user.name}
          onChange={el => setUser(prev => ({...prev, name: el.target.value}))} 
          className="border p-2"/>
        </div>
        <div className="flex flex-col">
          <label>Mssv</label>
          <input 
          type="text"
          name="mssv"
          value={user.mssv}
          onChange={el => setUser(prev => ({...prev, mssv: el.target.value}))} 
          className="border p-2"/>
        </div>
        <button onClick={() => handleAdd()} className="border bg-green-400 px-3 ">Thêm</button>
      </div>}
      <div className="flex flex-col">
        <label>Tìm kiếm</label>
        <input
        className="border p-2"
        type="text"
        value={search}
        onChange={(el) => setSearch(el.target.value)}
        />
      </div>
      <div>
        <div className="flex w-[650px] bg-blue-500 border">
          <h1 className="w-[100px] flex justify-center">STT</h1>
          <h1 className="w-[200px] flex justify-center border-x">Tên</h1>
          <h1 className="w-[150px] flex justify-center border-r">Mã số sinh viên</h1>
          <h1 className="w-[200px] flex justify-center">Hành động</h1>
        </div>
        {allUser?.map((el, index) => (
          <div key={el._id} className={el._id === editUser.uid ? "flex justify-around w-[650px] border bg-gray-300" : "flex justify-around w-[650px] border"}>
            <h1 className="w-[100px] flex justify-center">{index+1}</h1>
            <h1 className="w-[200px] flex justify-center border-x">{el.name}</h1>
            <h1 className="w-[150px] flex justify-center border-r">{el.mssv}</h1>
            <button onClick={() => handleEdit(el._id, el.name, el.mssv)} className="w-[100px] flex justify-center border-r hover:bg-yellow-600">Sửa</button>
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
