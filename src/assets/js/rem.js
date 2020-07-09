// 基准大小
const baseSize = 100
// 设置 rem 函数
function setRem() {
	// 当前页面宽度相对于 设计稿 宽的缩放比例
  const scale = document.documentElement.clientWidth / 375
	// 设置页面根节点字体大小
	document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
	setRem()
}