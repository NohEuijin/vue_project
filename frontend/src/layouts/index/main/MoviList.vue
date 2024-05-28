<template>
<div class="movi_list">
<div class="movi_box"></div>
<div class="movi_info">
  <a href="">
    <em class="mr-1">03 . 12 13 : 30</em>기준
  </a>
</div>
<ul class="ml-tab_wrap">
  <li class="active">
    <div class="tab_con">
      <h3 class="hidden"></h3>
      <div class="movie_list">
        <div class="slide_wrap">
          <div class="ml-owl-carousel owl-loaded owl-drag">
            <div
            class="owl-stage-outer"

            >
<!-- 포스트 리스트 -->
<div class="owl-stage"
:style="{ transform: `translate3d(${translateValue}px, 0, 0)`, transition: 'transform 0.25s ease' }">
<div class="owl-item"
v-for="(poster, index) of mainPosterList" :key="index">
  <div class="item"
  @mouseover="activateBox(index)"
  @mouseleave="deactivateBox(index)"
  :class="{ 'active': activeIndex === index }">
    <!-- 포스트 정보 -->
    <div class="top_info">
      <div class="post_info">
        <img :src="poster?.mainposter ? backUrl + poster.mainposter.url : ''" alt="Image does not exist!">
        <em class="num_info">{{ index + 1 }}</em>
      </div>
      <!-- 포스트 마우스 올렸을 때 이벤트 -->
      <div class="over_box" >
        <div class="inner">
            <a class="btn_inner" @click="$router.push({name : 'mainticketing'})">예매하기</a>
          <a class="btn_inner" href="#">상세정보</a>
        </div>
      </div>
    </div>
    <!-- 영화 정보 -->
    <div class="mv_info">
      <strong class="tit_info">
        <span class="mr-1 icon_grade">
      <span
        v-if="poster.viewage === 'all'">
        <img
        src="@/assets/posters/age/all.png" alt="">
      </span>
      <span
        v-if="poster.viewage === 'r12'">
        <img src="@/assets/posters/age/r12.png" alt="">
      </span>
      <span
        v-if="poster.viewage === 'r15'">
        <img src="@/assets/posters/age/r15.png" alt="">
      </span>
      <span
        v-if="poster.viewage === 'r19'">
        <img src="@/assets/posters/age/r19.png" alt="">
      </span>
    </span>
    {{ poster.name }}
  </strong>

  <div class="sub_info">
    <em class="rate_info">예매율&nbsp;
      <em class="mr-2">46.7 %</em>
      <em class="mr-2 etc_1">Ι</em>
    </em>
    <img src="@/assets/posters/etc/ic_star.png" alt="">
    <em class="star_info">
      9.4
    </em>
  </div>
</div>
</div>
</div>
</div>
<!-- 포스트 리스트 끝 -->

            </div>
            <!-- 포스트 리스트 박스 끝 -->

            <!-- 이전 다음 네비게이션바 -->
            <div class="ml-owl-nav">
              <button type="button" role="presentation" class="ml-owl-prev" @click="moveSlide('prev')">
              </button>
              <button type="button" role="presentation" class="ml-owl-next" @click="moveSlide('next')">
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </li>
</ul>
</div>
</template>

<!--
  백 들어가면
  1. list 번호 만큼 이동으로 수정하기
  2. list 0이번 < 표시 삭제 1이상이면 표기
-->
<script>
  export default {
  data(){
    return {
      backUrl: import.meta.env.VUE_APP_BACKEND_URL,
      activeIndex: null,
      translateValue: 0,
      mainPosterList:[],
    };
  },
  methods: {
    activateBox(index){
      this.activeIndex = index;
    },
    deactivateBox(index){
      if (this.activeIndex === index) {
        this.activeIndex = null;
      }
    },
    moveSlide(direction) {
      const slideWidth = 199; //이동될 넓이 길이
        if (direction === 'prev') {
          this.translateValue += slideWidth;
          if (this.translateValue > 0){
            this.translateValue = 0;
          }

        } else {
          this.translateValue -= slideWidth;
          const minValue = -((this.numSlides - 3) * slideWidth);
          // 이전 또는 다음 클릭시, 슬라이드가 몇 개씩 이동하는지를 조정
          if (this.translateValue < minValue){
            this.translateValue = minValue;
          }
          // console.log(this.translateValue)
          // console.log(minValue)
        }
      },
      async getPosterList(){
        await this.$store.dispatch('mainPosterList')
        .then((res) => {
          // console.log(res)
          this.mainPosterList = res.posters
          // console.log(this.mainPosterList)
        })
        .catch((err) => {
          console.log(err)
        })
      }
      },
    computed: {
      numSlides() {
        // return document.querySelectorAll('.owl-item').length;
        return this.mainPosterList.length;
        //클래스의 길이 만큼 이동
      }
  },
  async mounted(){
    await this.getPosterList();
  }
}
</script>

<style>
/* 포스터 박스 */
.item.active .over_box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
.over_box .inner{
  margin-top: -33px;
}
.item.active .btn_inner{
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  /* vertical-align: middle; */
  line-height: 26px;
  background: transparent;
  color: #fff !important;
  border-radius: 4px;
  border: 1px solid #fff;
  font-size: 14px;
  margin-bottom: 10px;
}
.movi_list{
  position: static;
  margin-top: -100px;
  margin-bottom: 70px;
}
.movi_box{
  content: "";
  position: absolute;
  display: block;
  background: #000;
  left: 0;
  right: 0;
  width: 100%;
  height: 405px;
  z-index: -1;
}
.movi_info{
  position: relative;
  right: 10px;
  top: 20px;
  float: right;
  color: #fff;
  font-size: 11px;
}
.movi_info a{
  display: block;
  position: relative;
  color: #FFF;
}
.movi_info em{
  font-family: 'ChosunSg';
  font-size: 12px;
  padding-left: 16px;
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/time2.png) no-repeat 0 1px;
}
.ml-tab_wrap{
  padding-top: 50px;
  position: relative;
}
.tab_con{
  overflow: inherit;
  position: relative;
  width: auto;
  height: auto;
}
.hidden{
  overflow: hidden;
  position: absolute !important;
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
}
.slide_wrap{
  position: relative;
}
.owl-loaded {
  display: block;
}
.ml-owl-carousel {
  position: relative;
  display: block;
  width: auto;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  z-index: 1;
}
.owl-stage{
  /* width: 4378px;
  transform: translate3d(0px, 0px, 0px);
  transition: all 0.25s ease 0s; */
}
.ml-owl-carousel .owl-stage-outer {
  position: relative;
  overflow: hidden;
}
.owl-stage-outer .owl-item{
  float: left;
  width: 184px;
  margin-right: 15px;

  /* flex: 0 0 auto; */
}
.item{
  color: #FFF;
  text-align: center;
}
.top_info{
  overflow: hidden;
  position: relative;
  height: 262px;
  border-radius: 4px;
}
.post_info{
  display: block;
  height: 262px;
}
.post_info img{
  width: 100%;
  display: block;
}
.num_info{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 23px;
  padding-left: 10px;
  font-weight: bold;
  font-size: 26px;
  font-style: italic;
  font-family: 'Roboto', "Noto Sans KR";
  text-align: left;
}
.over_box{
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 0;
}
.item.active .over_box{
  overflow: inherit;
  position: absolute;
  z-index: 1;
  top : 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.item.active .inner{
  position: absolute;
  z-index: 1;
  top : 50%;
  left: 0;
  width: 100%;
  padding: 0 18px;
}
 /* 영화정보 */
.mv_info{
  display: block;
  margin-top: 20px
}
.tit_info{
  font-family: 'ChosunSg';
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 6px;
  font-size: 13px;
}
.icon_grade{
  padding-right: 6px;

  display: inline-block;
  width: 22px;
  height: 22px;
  line-height: 22px;
  border-radius: 50%;
  font-size: 0;
  text-align: center;
  vertical-align: middle;
}
.sub_info{
  display: block;
  margin-bottom: 10px;
  font-size: 11px;
  color: #fff;

  font-weight: bold;
  position: relative;
  font-family: 'ChosunSg';
}
.sub_info img{
  width:11px;
  height:11px;
}
.star_info{
  font-weight: bold;
  color: #fff;
}
 /* 개봉전 */
.emain_info{
  color: #ED4C6B;
}
 /* 포스트 네비 바 */
.ml-owl-nav{
  position: static;
  height: 19px;
  margin-top: -10px;
}

.ml-owl-prev{
  background: url(@/assets/posters/arrow/prev.png) no-repeat 50% 50%;
  top: 38%;
  left: -30px;
  width: 19px;
  height: 35px;
  opacity: .5;

  position: absolute;
  margin-top: -20px;
}
.ml-owl-nav .ml-owl-next{
  top: 38%;
  right: -30px;
  background: url(@/assets/posters/arrow/next.png) no-repeat 50% 50%;
  width: 19px;
  height: 35px;
  opacity: .5;

  position: absolute;
  margin-top: -20px;
}
.ml-owl-prev:hover, .ml-owl-next:hover {
  opacity: 1;
}
</style>
