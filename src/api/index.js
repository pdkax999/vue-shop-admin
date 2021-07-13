
import myAxios from "./myAxios";

export const  reqPwdLogin =(username,password)=> myAxios.post('/login',{username,password});

export const  reqMenuList =()=> myAxios.get('menus');

export const reqUserList =(pagenum,pagesize,query)=> myAxios.get('/users',{
  params:{
    query,pagenum,pagesize
  }
})
