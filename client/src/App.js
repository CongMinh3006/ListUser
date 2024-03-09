import { apiGetAllUser } from "./apis/user/user";
import { useState, useEffect } from 'react'

function App() {

  const [allUser, setAllUser] = useState(null)

  const fetchUser = async() => {
    const response = await apiGetAllUser()
    console.log(response)
    if(response.success){
      setAllUser(response.mes)
      console.log(allUser)
    }
  }

  useEffect(() => {
    fetchUser()
  },[]);

  return (
    <div className="flex items-center justify-center flex-col gap-5">
      <h1 className="text-3xl text-black">Danh sách sinh viên</h1>
      <div>
        <div className="flex w-[450px]">
          <h1 className="w-[100px]">STT</h1>
          <h1 className="w-[200px]">Tên</h1>
          <h1 className="w-[150px]">Mã số sinh viên</h1>
        </div>
        {allUser?.map((el, index) => (
          <div className="flex justify-around w-[450px]">
            <h1 className="w-[100px]">{index+1}</h1>
            <h1 className="w-[200px]">{el.name}</h1>
            <h1 className="w-[150px]">{el.mssv}</h1>
          </div>
        ))}
      </div>
      <div>

      </div>
    </div>
  );
}

export default App;
