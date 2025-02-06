import FormAuth from "../../components/FormAuth"
import { toast } from "react-toastify"
import customAPI from "../../api"
import { registerUser } from "../../feature/userSlice"
import { redirect } from "react-router-dom"


export const action = (store) => async ({request}) =>{
  const formInputData = await request.formData()
  const data = Object.fromEntries(formInputData)
  console.log(data)
  console.log(request)
  try {
    const response = await customAPI.post('/auth/register', data)
    store.dispatch(registerUser(response.data))
    toast.success("Register Berhasil")
    return redirect("/")
   } catch (error) {
    const errorMessage = error?.response?.data?.message;
    console.log(errorMessage);
    toast.error(errorMessage)
    return null
  
   }
  

}

const RegisterView = () => {
  return <main>
    <FormAuth isRegister={true}/>
  </main>
  
}

export default RegisterView