import req from './packrequest'
export const goodsType=req('api/goodType','POST')
export const goodsList=req('api/goodList','POST')
export const $fetch_commList=data=>req('api/commentList','POST',data)