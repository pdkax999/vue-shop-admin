
import myAxios from "./myAxios";

export const  reqPwdLogin =(username,password)=> myAxios.post('/login',{username,password});

export const  reqMenuList =()=> myAxios.get('menus');

export const  reqUserStatus =(uId,type)=> myAxios.put(`users/${uId}/state/${type}`);

export const  reqAddUser =(info)=> myAxios.post(`users`,info);

export const  reqUpdateUserRole =(id,rid)=> myAxios.put(`users/${id}/role`,{rid
});

export const  reqRoleList =()=> myAxios.get('roles');

export const  reqDeleteUser =(id)=> myAxios.delete(`users/${id}`);

export const  reqAUpdateUserInfo =(id,mobile,email)=> {
  console.log(id);
  
  return myAxios.put(`users/${id}`,{mobile,email})
};

export const reqUserList =(pagenum,pagesize,query)=> myAxios.get('/users',{
  params:{
    query,pagenum,pagesize
  }
})
