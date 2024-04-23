<template>
            <div class="main_cont_wrap event">
            <div class="tit_name">이벤트</div>
            <div class="event_wrap">
              <ul class="event_list_wrap">
                <li class="event_img">
                  <a href="">
                    <img src="https://cf.lottecinema.co.kr//Media/Event/a65ba1ede87145c3ab1eb5ab2bd82f75.jpg" alt="">
                  </a>
                </li>
                <li class="event_img">
                  <a href="">
                    <img src="https://cf.lottecinema.co.kr//Media/Event/e61fe628e7c04dffb67f4ba6c05456a4.jpg" alt="">
                  </a>
                </li>
                <li class="event_img3">
                  <a href="">
                    <img src="https://cf.lottecinema.co.kr//Media/Event/7469d0269b1e449ea8b46de5f88e1202.jpg" alt="">
                    <em class="bd_txt fin">
                      D-7
                    </em>
                  </a>
                </li>
                <li class="event_img4">
                  <a href="">
                    <img src="https://cf2.lottecinema.co.kr/lotte_image/2022/Hyundaicard/Hyundaicard_296511.jpg" alt="">
                  </a>
                </li>
                <li class="event_img5">
                  <a href="">
                    <img src="https://cf.lottecinema.co.kr//Media/Event/e22da8a4188348929df938c2ccdc5a55.jpg" alt="">
                  </a>
                </li>
                <li class="event_img1">
                  <a href="">
                    <img src="https://cf.lottecinema.co.kr//Media/Event/407a2108993e4b899610ada684cb3596.jpg" alt="">
                  </a>
                </li>
              </ul>
              </div>
            <button type="button" class="btn_tit_list">더보기</button>
          </div>
</template>

<script>
export default {

}
</script>

<style>
/* 이벤트 리스트 */
.tit_name{
  position: relative;
  font-size: 17px;
  margin-bottom: 10px;
}
.event_wrap{
  position: relative;
  height: 512px;
  margin-bottom: 0;
}
.event_list_wrap{
  margin-left: -11px;
}
.event_list_wrap li{
  margin-left: 11px;
  margin-bottom: 11px;

  float: left;
  position: relative;
  /* margin: 0 0 55px 19px; */
}
.event_list_wrap img{
  border-radius: 4px;
}
.event_list_wrap a{
  display: block;
  width: 100%;
  height: 100%;
}
.event_img{
  width: 183px;
  height: 250px;
}
.event_img2{
  width: 183px;
  height: 250px;
}
.event_img3{
  width: 286px;
  height: 250px;
}
.bd_txt.fin{
  opacity: 1;
  font-weight: bold;
  letter-spacing: 0;
}
.bd_txt{
  position: absolute;
  right: 0;
  top: 18px;
  background-color: #000;
  border-radius: 5px 0 0 5px;
  min-width: 46px;
  padding: 4px 8px;
  color: #ffffff;
  text-align: center;
  font-size: 10px;
  font-weight: bold;
  font-family: 'Roboto', 'Noto Sans KR';
  box-sizing: border-box;
}
.event_img4{
  width: 295px;
  height: 511px;

  float: right !important;
}
</style>
