
import myAxios from "./myAxios";

export const  reqPwdLogin =(username,password)=> myAxios.post('/login',{username,password});

export const  reqMenuList =(type)=> myAxios.get('menus');