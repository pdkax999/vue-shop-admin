
import myAxios from "./myAxios";

export const  reqPwdLogin =(username,password)=> myAxios.post('/login',{username,password});

export const  reqMenuList =()=> myAxios.get('menus');

export const  reqUserStatus =(uId,type)=> myAxios.put(`users/${uId}/state/${type}`);

export const  reqAddUser =(info)=> myAxios.post(`users`,info);

export const  reqUpdateUserRole =(id,rid)=> myAxios.put(`users/${id}/role`,{rid
});

export const  reqRoleList =()=> myAxios.get('roles');

export const  reqChatedata =()=> myAxios.get('reports/type/1');

export const  reqRightsList =(type)=> myAxios.get('rights/'+type);

export const  reqDeleteUser =(id)=> myAxios.delete(`users/${id}`);

export const  reqDeleteRoleAuth =(roleId,rightId)=> myAxios.delete(`roles/${roleId}/rights/${rightId}`);

export const  reqRolesList =()=> myAxios.get(`/roles`);

export const  reqAUpdateUserInfo =(id,mobile,email)=> {
  console.log(id);

  return myAxios.put(`users/${id}`,{mobile,email})
};

export const reqUserList =(pagenum,pagesize,query)=> myAxios.get('/users',{
  params:{
    query,pagenum,pagesize
  }
})
export const reqParamsList =(id,sel)=> myAxios.get(`/categories/${id}/attributes`,{
  params:{
   sel
  }
})
export const  reqSetUserRigths =(roleId,rids)=> myAxios.post('roles/'+roleId+'/rights',{rids});

export const  reqAddUserRigths =(cat_pid,cat_name,cat_level)=> myAxios.post('/categories',{cat_pid,cat_name,cat_level});

export const  reqGoodsCategorys =(pagenum,pagesize)=> myAxios.get('/categories',{

  params:{
    type:[1,2,3],
    pagenum,
    pagesize
  }

});
export const  reqOrderList =(pagenum,pagesize,query)=> myAxios.get('/orders',{

  params:{
    query,
    pagenum,
    pagesize
  }

});

// export const  reqDeleteCate =(id,attrid)=> myAxios.get(`/categories/${id}/attributes/${attrid}`);

export const  reqAddParams =(id,attr_name, attr_sel)=> myAxios.post(`/categories/${id}/attributes`,{attr_name, attr_sel});

export const  reqUpdateParams =(id,attrId,attr_name, attr_sel,attr_vals)=> myAxios.put(`/categories/${id}/attributes/${attrId}`,{attr_name, attr_sel,attr_vals});


export const reqGoodsList =(pagenum,pagesize,query)=> myAxios.get('/goods',{
  params:{
    query,pagenum,pagesize
  }
})
export const reqAddressInfo =(id)=> myAxios.get(`/kuaidi/${id}`)
export const reqAddGoods =(dataobj)=> myAxios.post('/goods',dataobj)

