import axios from 'axios';
import { menus } from './nav'

const CONSTANT = {
  PHONE: /^[1]([3-9])[0-9]{9}$/,
}

/*
** 如果当前path不是底部menu中，则不改变现有menu
*/
const GET_MENU = function (pathName) {
  for (let menu of menus) {
    if (menu.name === pathName || menu.routes.some(el => el == pathName)) return menu.name;
  }
  return;
}

const getStyle = function (el, styleName) {
  return parseFloat(window.getComputedStyle(el)[styleName]);
}

const convertMin = function (totalTime) {
  let time = totalTime / 60;
  let min = Math.floor(time);
  let second = Math.round((time - min) * 60);
  min = min < 10 ? '0' + min : min;
  second = second < 10 ? '0' + second : second;
  return min + ":" + second;
}

const getList = function (url) {
  axios.get(url).then(res => {
    this.list = res.data;
  })
}

function random(min, max, now, arr) {
  let i = Math.floor(Math.random() * (max - min + 1) + min);
  return arr[i] === now ? random(min, max, now, arr) : i;
}


export {
  axios,
  GET_MENU,
  getStyle,
  convertMin,
  getList,
  random,
  CONSTANT
}