<template>
  <div class="silde_box">
    <div class="silde_inner">
      <div class="silde_wrap">
        <div class="owl-carousel owl-loaded owl-drag">
          <div class="owl-carousel-outer">
            <div class="owl-stage" :style="{ transform: 'translate3d(' + (-currentIdx * slideWidth) + 'px, 0, 0)' }">
              <div v-for="(item, index) in slideItems" :key="index" class="owl-item">
                <div class="item">
                  <a :href="item.link">
                    <img class="imgbox" :src="item.imageUrl" :alt="item.altText">
                    <img class="imgview" :src="playButtonImageUrl" alt="">
                  </a>
                  <div class="item_box"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 이전, 다음 -->
        <div class="owl_nav">
      <button type="button" role="presentation"
      class="owl_prev" @click="prevSlide"
      >
        <span aria-label="Previous">←</span>
      </button>
      <button type="button" role="presentation"
       class="owl_next" @click="nextSlide"
       >
        <span aria-label="Next">→</span>
      </button>
        </div>
            <!-- 슬라이드 버튼 -->
            <!-- <div class="owl_dots">
              <button role="button" class="owl-dot">
                <span></span>
              </button>
              <button role="button" class="owl-dot">
                <span></span>
              </button>
              <button role="button" class="owl-dot">
                <span></span>
              </button>
            </div> -->

            </div>
          </div>
        </div>
        <!-- 슬라이드 재생버튼 -->
        <!-- <div class="bx_ctrl" style="left: 53.9453px">
          <div class="play_active">슬라이드 자동재생</div>
          <div class="stop">슬라이드 일시정지</div>
        </div> -->

      <!-- </div> -->
    <!-- </div> -->
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      slideItems: [
        {
          imageUrl: 'https://cf2.lottecinema.co.kr/lotte_image/2024/BobMarley_OneLove/0311/BobMarley_OneLove_1920774.jpg',
          videoUrl: 'https://cf2.lottecinema.co.kr/lotte_image/2024/BobMarley_OneLove/0311/BobMarley_OneLove_1280720.mp4',
          altText: 'Bob Marley One Love'
        },
        {
          imageUrl: 'https://cf2.lottecinema.co.kr/lotte_image/2024/TheBraveBeluga/TheBraveBeluga_1920774.png',
          videoUrl: 'https://cf2.lottecinema.co.kr/lotte_image/2024/TheBraveBeluga/TheBraveBeluga_1280720.mp4',
          altText: 'The Brave Beluga'
        },
        {
          imageUrl: 'https://cf2.lottecinema.co.kr/lotte_image/2024/BreadBarbershop/BreadBarbershop_19207747.jpg',
          videoUrl: 'https://cf2.lottecinema.co.kr/lotte_image/2024/BreadBarbershop/BreadBarbershop_12807205.mp4',
          altText: 'Bread Barbershop'
        }
      ],
      currentIdx: 0,
      slideWidth: 1920,
      playButtonImageUrl: 'https://www.lottecinema.co.kr/NLCHS/Content/images/main/btn_main_visual_play.png'
    };
  },
  methods: {
    prevSlide() {
      if (this.currentIdx !== 0) {
        this.currentIdx--;
      }
    },
    nextSlide() {
      if (this.currentIdx !== this.slideItems.length - 1) {
        this.currentIdx++;
      }
    }
  }
};

</script>

<style>
/* 서브 세션 */
.silde_box{
  height: 774px;
  z-index: 0;

  overflow: hidden;
  position: relative;
  width: 100%;
  background-color: #000;
}
.silde_inner{
  position: absolute;
  left: 50%;
  top: 0;
  width: 1920px;
  margin-left: -960px;
}
.silde_wrap{
  position:relative;
}
.owl-carousel{
  position: relative;
  display: block;
  width: auto;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  z-index: 1;
  -webkit-tap-highlight-color: transparent;
}
.owl-carousel-outer{
  overflow: hidden;
}
.owl-stage{
  /* transform: translate3d(0px, 0px, 0px); */
  transition: all 0.25s ease 0s;
  width: 13440px;

  position: relative;
  touch-action: manipulation;
}
.owl-stage .owl-item{
  width: 1920px;
}
.owl-item{
  position: relative;
  float: left;
  display: block;
  min-height: 1px;
}
.item_box{
  content: "";
    position: absolute;
    z-index: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 140px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 1) 100%);
}
img{
  border: none;
  vertical-align: top;
}
.imgbox{
  width: 100%;
  height: 774px;
  display: block;
}
.imgview{
  content: "";
  position: absolute;
    left: 50%;
    top: 50%;
    display: block;
    width: 49px;
    height: 54px;
    margin: -27px 0 0 -24px;
    padding: 0;
    font: 0 / 0 a;
    border: 0;
    background-image: url(../images/main/btn_main_visual_play.png);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: rgba(255, 255, 255, 0);
    cursor: pointer;
}
.owl-nav{
  height: 0;
  background-color: transparent;

  position: absolute;
  left: 50%;
  right: auto;
}
.owl-prev{
  left: 30px;
  width: 31px;
  height: 60px;
  margin-top: -15px;
  background-size: auto;
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/arr_lf_31_wht.png);
}
.owl-next{
  right: 30px;
  width: 31px;
  height: 60px;
  margin-top: -15px;
  background-size: auto;
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/arr_rg_31_wht.png);
}
.owl-nav span{
  font-size: 0;
  text-indent: -9999em;
}
.owl-nav, .owl-prev{
  background-color: transparent;
  color: inherit;
  border: none;
  padding: 0 !important;
  /* font: inherit; */
  opacity: .6;
  position: absolute;
}
span{
  font-size: 0;
  text-indent: -9999em;
}
/* 슬라이드 버튼 */
.owl_dots{
  position: absolute;
    right: 50%;
    left: auto;
    top: auto;
    bottom: 95px;
    margin: 0 -455px 0 0;

    zoom: 1;
    display: inline-block;
    background-color: transparent;
    color: inherit;
    border: none;
    padding: 0 !important;
    /* font: inherit; */
}
.owl_dots span{
  width: 6px;
  height: 6px;
  margin: 0 3px;
  background-color: #000;
}
/* 슬라이드 재생버튼 */
.bx_ctrl{
  position: absolute;
  left: auto !important;
  right: 50%;
  left: auto;
  top: auto;
  bottom: 95px;
  margin: 0 -480px 0 0;
  text-align: right;
  position: absolute;
}
.play_active{
  border-width: 4px 0 4px 7px;

  width: 0;
  height: 0;
  padding: 0;
  border-style: solid;
  border-color: transparent transparent transparent #fff;
  text-indent: -9999em;
  background: transparent;
  opacity: 1;
}
.stop{
  width: 6px;
  height: 6px;
  border-radius: 1px;

  margin-left: 4px;
  padding: 0;
  border-radius: 2px;
  text-indent: -9999em;
  background: #FFF;

  opacity: .5;
}

.nav .before{
    opacity: 1;
    position: absolute;
    top: 48%;
    height: 9px;
    margin-top: -5px;
    border-left: 1px solid #707070;
}
.owl_nav{
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  text-align: center;
  text-align: center;

  width: 1818px;
  margin-left: -909px;
  height: 0;
}
.owl_nav .owl_prev{
  left: 30px;
  width: 31px;
  height: 60px;
  margin-top: -15px;
  background-size: auto;
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/arr_lf_31_wht.png);
}
.owl_nav .owl_prev{
  right: 30px;
  width: 31px;
  height: 60px;
  margin-top: -15px;
  background-size: auto;
  background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/arr_rg_31_wht.png);
}
</style>
