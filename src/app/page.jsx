"use client";

import {
  useDeleteUserMutation,
  useGetDataQuery,
  usePostUserMutation,
} from "@/reducers/todoSlice/todoSlice";
import { Suspense, useState } from "react";
import FileBase64 from "react-file-base64";

const Home = () => {
  // rtk query functions
  const { data } = useGetDataQuery("");
  const [deleteUser] = useDeleteUserMutation();
  const [postUser] = usePostUserMutation();
  console.log(data);

  // local modal states
  const [postModal, setPostModal] = useState();

  // local states
  const [base64, setBase64] = useState("");
  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [img ,setImg] = useState("")

  // sync functions
  function showImage(e)
  {
    const files = e.target.files[0]
    setImg(files)
    const reader = new FileReader()
    reader.readAsDataURL(files)
    reader.onload = () =>
    {
      setBase64(reader.result)
    }
  }





  return (
    <main className=" min-h-screen w-[100%] bg-[#10103a]">
      {/* <img
        className="w-[100%]"
        src="https://img.freepik.com/premium-photo/bearded-man-wearing-glasses-remote-working-overtime-late-night-working-dark-office-using-laptop-computer-workplace_78492-42408.jpg?uid=R156212405&ga=GA1.2.462860909.1721036061&semt=ais_user"
        alt=""
      /> */}

      <button
        className="p-[10px_30px] rounded-md bg-blue-500 text-[white] text-[20px] m-[50px_0_0_50px]"
        onClick={() => setPostModal(true)}
      >
        Post User
      </button>
      <div className="grid grid-cols-3 gap-[50px] p-[50px]">
        {data?.map((el) => {
          return (
            <Suspense fallback={<div>Loading</div>}>
              <section onClick={() => {navigator.clipboard.writeText(el.email) , alert("text copied")}} className="border-[2px] border-[white] text-white rounded-md p-[10px] flex items-center gap-2 hover:scale-110 transition-transform duration-300 backdrop-filter backdrop-blur-[10px] bg-[#13135db0]">
                <img
                  src={el.image}
                  alt="picture"
                  className="w-[100px] h-[100px] rounded-full object-cover cursor-pointer"
                />
                <div className="flex flex-col gap-2">
                  <p className=" font-bold tracking-[1px]">
                    Name: <span className="font-normal">{el.name}</span>
                  </p>
                  <p className=" font-bold tracking-[1px]">
                    Email: <span className="font-normal">{el.email}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-[red] text-white rounded-md p-[5px_30px]"
                      onClick={() => deleteUser(el.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white rounded-md p-[5px_30px]"
                      onClick={() => deleteUser(el.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </section>
            </Suspense>
          );
        })}
      </div>

      {postModal ? (
        <div className="fixed top-0 right-0 w-[100%] h-[100svh] flex justify-center items-center bg-[#00000090]">
          <div className="w-[40%] bg-white p-[20px] flex flex-col gap-2 rounded-md">
            <input
            value={name}
            onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-[100%] p-[5px_10px] text-[20px] outline-none border-gray-400 border-[2px] rounded-md"
              placeholder="userName"
              required
            />
            <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-[100%] p-[5px_10px] text-[20px] outline-none border-gray-400 border-[2px] rounded-md"
              placeholder="Email"
              required
            />

            <div className="flex items-start justify-between">
              {base64 ? (
                <img src={base64} alt="Your Picture" className="w-[100%]" />
              ) : (
                <label htmlFor="postImage" className=" flex justify-center">
                  <img
                    className="w-[50%] cursor-pointer mix-blend-multiply"
                    src="https://img.freepik.com/free-vector/outline-cloud-with-red-upload-download-arrows_78370-5500.jpg?uid=R156212405&ga=GA1.1.462860909.1721036061&semt=ais_user"
                    alt=""
                  />
                  <input type="file" id="postImage" className="hidden" onChange={(e) => showImage(e)} />
                </label>
              )}
            </div>
            <button
              className="p-[10px_30px] rounded-md bg-blue-500 text-[white] text-[20px]"
              onClick={() => {postUser({ image: img, name: name , email: email }) , setPostModal(false)}}
            >
              Save
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default Home;
