const REG =  new RegExp('uId=([^;]*)');

/*
** 判断cookie
*/
const HAS_COOKIE = () => document.cookie ? true : false;

// 有cookie，获取cookie中的uId
const GET_UID = function () {
  let result = REG.exec(document.cookie);
  return result !== null ? window.atob(result[1]) : '';
}

export {
  HAS_COOKIE,
  GET_UID
}