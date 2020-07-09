<template>
  <div class="swiper">
    <ul :style="{width: `${list.length * 100}%`}" ref="ul">
      <li v-for="(el, i) in list" :key="i">
        <div class="item-wrapper" @click="routerGo(el)">
          <p v-if="el.copywriter" class="item-title">{{el.copywriter | copywriterFilter(true)}}</p>
          <p v-if="el.name" class="item-name">{{el.name}}</p>
          <p
            v-if="el.copywriter && $route.name !== 'personal'"
            class="item-detail"
          >{{el.copywriter | copywriterFilter}}</p>
          <img :src="el.picUrl || el.pic" alt />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getStyle } from "../assets/js/util.js";
import { mapActions } from "vuex";

export default {
  name: "swiper",
  data() {
    return {
      pageWidth: 0,
      index: 0
    };
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  created() {
    this.drag = {};
  },
  mounted() {
    let el = this.$el.children[0];
    el.addEventListener("touchstart", e => {
      this.handleTouchStart(e);
    });
    el.addEventListener("touchmove", e => {
      this.handleTouchMove(e);
    });
    el.addEventListener("touchend", e => {
      this.handleTouchEnd(e);
    });
  },
  beforeUpdate() {
    // this.loading = false;
  },
  updated() {
    // 此时axios请求已经得到数据并更新到页面上
    // 更新划动页面的宽度
    let el = this.$refs.ul.children[0];
    this.pageWidth = el.offsetWidth + getStyle(el, "marginLeft") * 2; // 宽度 = li 宽度 + 两侧margin
  },
  filters: {
    // boolean 为 true 返回 前面部分，false 返回 后面部分
    copywriterFilter(val, boolean) {
      let i = val.indexOf("：");
      if (i !== -1) return boolean ? val.slice(0, i) : val.slice(i + 1);
      return boolean ? val : " ";
    }
  },
  methods: {
    handleTouchStart(e) {
      this.drag.el = this.$el.children[0];
      let drag = this.drag;
      let touch = e.touches[0];
      drag.pageWidth = this.pageWidth;
      drag.startTime = new Date();
      drag.startLeft = touch.pageX; // ? clientX
      drag.startTop = touch.pageY; // ? clientY
      drag.startTopAbsolute = touch.clientY;
      //每次滑动ul的起始点
      drag.start =
        parseFloat(this.$refs.ul.style.transform.replace(/[^-?0-9\.]/g, "")) ||
        0;
    },
    handleTouchMove(e) {
      let drag = this.drag;
      let touch = e.touches[0];
      drag.curLeft = touch.pageX;
      drag.curTop = touch.pageY;
      drag.curTopAboslute = touch.clientY;
      // 计算划动距离
      let disLeft = drag.curLeft - drag.startLeft;
      let disTop = drag.curTopAboslute - drag.startTop;
      let disX = Math.abs(disLeft);
      let disY = Math.abs(disTop);
      // 判断横向划动还是纵向划动
      if (disX < 5 || disY >= disX * 1.5) {
        this.scrolling = false; // 非横向滑动
        return;
      } else {
        this.scrolling = true; // 横向滑动
        e.preventDefault(); // 阻止默认点击事件发生
      }
      // 修正最大划动距离
      drag.disX = Math.min(Math.max(disLeft, -drag.pageWidth), drag.pageWidth);
      // console.log(drag);
      // 判断横向划动方向
      drag.direction = disLeft < 0 ? -1 : 1; // -1向左，1向右
      // 移动
      let dis = drag.disX + drag.start; // 起点 + 划动距离
      drag.el.style.transition = "all 0s linear";
      drag.el.style.transform = `translateX(${dis}px)`;
    },
    handleTouchEnd() {
      let drag = this.drag;
      // 判断划动持续时间， 过短则取消
      let dragDuration = new Date() - drag.startTime;
      if (dragDuration < 300 && !drag.curLeft) return;
      // 如果划动就超过1/3总距离，自动移动到下一个页面
      let absDisX = Math.abs(drag.disX);
      // 判断index
      let index = this.index;
      if (absDisX > drag.pageWidth / 3) {
        if (drag.direction < 0) index++; // 向左
        if (drag.direction > 0) index--; // 向右
        if (index < 0 || index >= this.list.length) index = null;
      }
      this.index = index !== null ? index : this.index;
      // 自动转入下一页
      this.autoMove();
      // 清空drag数据
      this.drag = {};
    },
    autoMove(index, pageWidth) {
      index = index || this.index;
      pageWidth = pageWidth || this.pageWidth;
      let dis = pageWidth * index * -1;
      this.$refs.ul.style.transition = "all 0.25s linear";
      this.$refs.ul.style.transform = `translateX(${dis}px)`;
    },
    routerGo(el) {
      console.log(this.$route);
      // 跳转 乐单
      if (this.$route.name !== "podcast") {
        this.$router.push({ path: "/playlist", query: { id: el.id } });
        return;
      }
      // 跳转 podcast 广告
      if (el.url) {
        window.location.href = el.url;
        return;
      }
      // podcast => 直接播放节目
      this.handleMusic(el);
    },
    ...mapActions("player", ["handleMusic"])
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/public.scss";

.swiper {
  width: 100%;
  overflow: hidden;
  ul {
    display: flex;
    overflow-x: scroll;
    padding: 0 0.18rem;
    // justify-content: space-between;
    // padding: 0 0.2rem;
    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
    }
    li {
      transition: all 0.5s ease;
      width: calc(100vw - 0.48rem);
      margin: 0 0.06rem;
      .item-wrapper {
        margin: 0.1rem 0 0 0;
        .item-title {
          font-size: $xs;
          color: $red;
        }
        .item-name {
          font-size: $small-title;
          margin: 0.1rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .item-detail {
          font-size: $detail;
          color: $grey;
          margin: 0.1rem 0;
          height: 0.18rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        img {
          width: 100%;
          border-radius: 10px;
          box-shadow: 0 0 7px #666;
        }
      }
    }
  }
}
</style>