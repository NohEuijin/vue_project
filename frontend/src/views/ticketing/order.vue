<template>
  <div class=" mt_contents_full">
    <div class="wrap_reserve ty2">
      <h2 class="d-none">인원/좌석</h2>

      <div class="section_step_tit">
    <ul>
      <li class="step01 prev">
        <a href="">
          <string class="tit">
            <span>
              01
              <br>
              상영시간
            </span>
          </string>
          <div class="bx_con">
            <dl>
              <dt>선택한 영화 제목 </dt>
              <dd>영화 제목</dd>
              <dt>상영관</dt>
              <dd>00지점</dd>
              <dt>선택한 상영 날짜</dt>
              <dd>2024-05-24(금)</dd>
              <dt>선택한 시간</dt>
              <dt>13:30~16:18</dt>
            </dl>
          </div>
        </a>
      </li>
      <li class="step02 prev">
        <a href="">
          <string class="tit">
            <span>
              02
              <br>
              인원/좌석
            </span>
          </string>
          <div class="bx_con">
            <dl>
              <dt>선택한 인원</dt>
              <dd>뿅</dd>
              <dt>선택한 좌석</dt>
              <dt>뿅</dt>
            </dl>
          </div>
        </a>
      </li>
      <li class="step03 active">
        <a href="">
          <string class="tit">
            <span>
              03
              <br>
              결제
            </span>
          </string>
          <div class="bx_con">
            <dl>
              <dt>티켓금액</dt>
              <dd>뿅</dd>
              <dt>할인금액</dt>
              <dt>뿅</dt>
              <dt>총합계</dt>
              <dt>뿅</dt>
            </dl>
          </div>
        </a>
      </li>
      <li class="step04">
        <a href="">
          <string class="tit">
            <span>
              04
              <br>
              결제완료
            </span>
          </string>
          <div class="bx_con">
            <dl>
              <dt>선택한 영화 제목 </dt>
              <dd>영화 제목</dd>
              <dt>상영관</dt>
              <dd>00지점</dd>
              <dt>선택한 상영 날짜</dt>
              <dd>2024-05-24(금)</dd>
              <dt>선택한 시간</dt>
              <dt>13:30~16:18</dt>
            </dl>
          </div>
        </a>
      </li>
    </ul>
  </div>


  <div class="od_section_step_con step02 active">
    <h3 class="hidden">결제</h3>
    <div class="article article_sum_infor">
        <div class="group_top">
          <h4 class="tit">예매정보</h4>
        </div>
        <v-col class="pa-0 od_od_inner">
          <v-col class="movie_infor new2020">
            <span class="thm">
              <img src="https://cf.lottecinema.co.kr//Media/MovieFile/MovieImg/202405/21106_101_1.jpg" alt="">
            </span>
            <strong class="tit">
    <span
      v-if="poster_viewage === 'all'">
      <img
      src="@/assets/posters/age/all.png" alt="">
    </span>
    <span
      v-if="poster_viewage === 'r12'">
      <img src="@/assets/posters/age/r12.png" alt="">
    </span>
    <span
      v-if="poster_viewage === 'r15'">
      <img src="@/assets/posters/age/r15.png" alt="">
    </span>
    <span
      v-if="poster_viewage === 'r19'">
      <img src="@/assets/posters/age/r19.png" alt="">
    </span>
                  {{poster_name}}
            </strong>
            <dl class="od_dlist_infor">
                <dt>일시</dt>
                <dd>{{choice_date}}
                  <em>({{dayFormat(choice_date)}})

                  {{convertToShortTime(choice_time)}}
                    ~
                    {{endtime}}
                  </em>
                </dd>
                <dt>영화관</dt>
                <dd>{{theater_city}} {{theater_title}} {{theater_name}}</dd>
                <dt>인원</dt>
                <dd>성인{{personnel}}</dd>
                <span class="after"></span>
            </dl>
          </v-col>
          <v-col class="seat_infor">
            <div class="od_dlist_infor">
              <dt>좌석</dt>
              <dd>{{seat}}</dd>
              <span class="after"></span>
            </div>
          </v-col>
          <v-col class="addprodlistwrap">
            <v-col class="pay_movie_infor type1">
              <div class="img_product">
                <span class="thm">
                  <img src="https://www.lottecinema.co.kr/NLCHS/Content/images/payment/photocard1.png" alt="" class="mCS_img_loaded">
                </span>
              </div>
              <div class="bx_infor">
                <div class="badge_wrap"></div>
                <div class="between_txt type1">
                  포토카드는
                  <br>
                  <strong>스토어 > 포토카드</strong>
                  <br>
                  메뉴에서 구매 가능합니다.
                </div>
              </div>
            </v-col>
          </v-col>
        </v-col>
      </div>
      <div class="article article_pay_method">
        <div class="group_top">
          <h4 class="tit">결제수단</h4>
          <button type="button" class="btn_txt_reset">
            초기화
          </button>
        </div>
        <v-col class="pa-0 od_od_inner">
          <div class="mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar">
            <div class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside">
              <div class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y">
                <div class="group_discount">
                  <h3 class="tit_payment">할인/포인트</h3>
                  <div class="tab_wrap3 reset selected">
                    <div class="tab_tit case2">
                      <ul>
                        <li>
                          <button>L.POINT
                            <span class="point">조회</span></button>
                        </li>
                        <li>
                          <button>L.POINT 카드번호</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="wrap_coupon">
                    <div class="bx_cate">
                      <ul class="list_pay_item cate4">
                        <li>
                          <button>VIP
                            <span class="txt_cnt">0</span>
                          </button>
                        </li>
                        <li>
                          <button>관람권
                            <span class="txt_cnt">0</span>
                          </button>
                        </li>
                        <li>
                          <button>
                            할인권
                            <span class="txt_cnt">0</span>
                          </button>
                        </li>
                        <li>
                          <button>
                            <em class="ic_txt_event type2 active">EVENT</em>
                            제휴포인트/할인
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="toggle_wrap no couplechk"></div>
                </div>
                <div class="group_payment">
                  <h5 class="tit_payment">최종 결제수단</h5>
                  <div class="bx_cate">
                    <ul class="list_pay_item cate6">
                      <li>
                        <button type="button" class="cate1">신용카드</button>
                      </li>
                      <li>
                        <button type="button" class="cate1">신용카드</button>
                      </li>
                      <li>
                        <button type="button" class="cate1">신용카드</button>
                      </li>
                      <li>
                        <button type="button" class="cate1">신용카드</button>
                      </li>
                      <li>
                        <button type="button" class="cate1">신용카드</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </div>





      <div class="article article_payment">
        <div class="group_top">
          <h4 class="tit">결제하기</h4>
        </div>
        <div class="od_inner">
          <div class="select_item_wrap">
            <div class="group_item active">
              <!-- <div class="bx_item">
                <input type="checkbox" checked>
                <label for="chkSavingPoint" class="ty2">
                  <span class="before"></span>
                  L.POINT 적립
                </label>
              </div> -->
            </div>
          </div>
          <div class="payment_sum_wrap">
            <dl>
              <dt>상품금액</dt>
              <dd>
                <strong>{{total_place}}</strong>원
              </dd>
              <span class="after"></span>
            </dl>
            <dl>
              <dt>할인금액</dt>
              <dd>
                <strong>- 0</strong>원
              </dd>
              <span class="after"></span>
            </dl>
            <dl>
              <dt>결제금액</dt>
              <dd>
                총<strong>{{total_place}}</strong>원
              </dd>
              <span class="after"></span>
            </dl>
            <a href="" class="btn_col1 btn_confirm">결제하기</a>
          </div>
        </div>
      </div>

      <div class="layer_wrap"></div>

  </div>


    </div>

  </div>
</template>

<script>
import dayjs from 'dayjs';
// 한글 로케일 파일 로드(요일 한글화 위함)
import 'dayjs/locale/ko';
export default {
  data(){
    return{
      today : dayjs(),
      //오늘 날짜 기본 값
      pickDay:dayjs().format('YYYY-MM-DD'),
      orderInfo:'',
      user_id:this.$store.state.meData.id,
      poster_name:'',
      poster_viewage:'',
      poster_showtime:'',

      theater_city:'',
      theater_title:'',
      theater_name:'',

      choice_date:'',
      choice_time:'',
      endtime:'',

      total_place:'',

      personnel:'',
      seat:'',
    };
  },
  methods:{
    async getOrderInfo(){
      await this.$store.dispatch('getOrderInfo',{id:this.$route.params.id})
      .then((res) => {
        // console.log(res)
        this.orderInfo = res.ticketings[0]
        this.personnel = this.orderInfo.personnel
        this.total_place = this.orderInfo.total
        this.choice_date = this.orderInfo.schedule.date
        this.choice_time = this.orderInfo.schedule.time
        this.poster_name = this.orderInfo.schedule.poster.name
        this.poster_viewage = this.orderInfo.schedule.poster.viewage
        this.poster_showtime = this.orderInfo.schedule.poster.showtime
        this.theater_city = this.orderInfo.schedule.theater.city
        this.theater_title = this.orderInfo.schedule.theater.title
        this.theater_name = this.orderInfo.schedule.theater.name
        this.seat = this.removeSymbols(this.orderInfo.seat);
      })
      .catch((err) => {
        console.log(err)
      })
    },
// ( " , [ , ] )기호를 정규식을 사용하여 제거
 removeSymbols(value) {
  const cleanedString = value.replace(/["\[\]]/g, '');
  return cleanedString;
},
  // 유저 정보
  async userData(){
    await this.$store.dispatch('myData').then((res) =>{
      console.log(res)
    }).catch(() => {
      // console.error("로그인 정보가 없습니다.")
    })
  },
    //09:00:00.000 => 09:00로 변환
    convertToShortTime(longTime) {
    const [hours, minutes] = longTime.split(":");
    const shortTime = `${hours}:${minutes}`;
    return shortTime;
  },
    //날짜 폼
    todayFormat(){
    return this.today.format("YYYY-MM-DD");
  },
    //종료시간
    endtimeMethod(){
    this.starttimeMs = this.convertToTimeMilliseconds(this.choice_time)
    this.showtimeMs = this.convertMinutesToMilliseconds(this.poster_showtime)
    this.endtimeMs = this.starttimeMs+this.showtimeMs
    this.endtime = this.convertMillisecondsToHHMM(this.endtimeMs)
  },
    //시간(00:00) => millisecond 변환
    convertToTimeMilliseconds(time) {
    const [hours, minutes] = time.split(':');
    return (parseInt(hours) * 60 * 60 * 1000) + (parseInt(minutes) * 60 * 1000);
  },
    //숫자(1) => 분으로 millisecond 변환
    convertMinutesToMilliseconds(minutes) {
    return minutes * 60 * 1000;
  },
    dayFormat(date) {
      return dayjs(date).locale('ko').format("ddd");
    },
  // 밀리초(ms)를 HH:mm 형식으로 변환
  convertMillisecondsToHHMM(milliseconds) {
  const totalMinutes = Math.floor(milliseconds / (60 * 1000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // 두 자릿수로 포맷팅
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
  },
},
  computed: {

  },
  async mounted(){
    await this.getOrderInfo()
    this.endtimeMethod()
  },
}
</script>

<style lang="scss">
.mt_contents_full{
  min-width: 100% !important;
  max-width: 100% !important;
  margin: 0 auto !important;
  padding: 50px 0 0 0 !important;
  padding-bottom: 70px !important;

  background-color: #444;
  background-repeat: repeat-x !important;

}

.wrap_reserve{
  overflow: hidden;
  position: relative;
  width: 1280px;
  height: 870px;
  margin: 0 auto;
  background-color: #FFF;
}
.wrap_reserve .section_step_tit {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 78px;
}
.wrap_reserve .section_step_tit ul {
    height: 100%;
}
.wrap_reserve .section_step_tit ul li.prev {
    border-color: #333;
    border-bottom-color: #666;
    background-color: #333;
}
.wrap_reserve .section_step_tit ul li {
    position: relative;
    height: 25%;
    box-sizing: border-box;
    border: 1px solid #666;
    border-top: none;
    background-color: #FFF;
    z-index: 10;

    justify-content: center;
    display: grid;
    align-items: center;
    text-align: center;

    font-size: 14px;
    font-weight: 600;
    line-height: 2;
}
.wrap_reserve .section_step_tit ul li.prev > a {
    color: #FFF;
}
.wrap_reserve .section_step_tit ul li.active > a {
    color: #FFF ;
}
.wrap_reserve .section_step_tit ul li.active{
    border-color: #FF243E;
    border-bottom-color: #666;
    background-color: #FF243E;
}
.wrap_reserve .section_step_tit ul li > a {
    // display: block;
    // height: 100%;
    color: #666;
}
.wrap_reserve .section_step_tit ul li > a .bx_con{
  display: none;
    position: absolute;
    z-index: 1;
    left: 77px;
    top: -1px;
    bottom: 0;
    width: 172px;
    padding-left: 20px;
    border-top: 1px solid #666;
    background-color: #333;
}
.wrap_reserve .od_section_step_con.active {
    display: block;
    overflow: inherit;
    position: relative;
    width: 1202px;
    height: 100%;
    margin-left: 78px;
}
.wrap_reserve .od_section_step_con .article.article_seat {
    width: 1202px;
}
.wrap_reserve .od_section_step_con .article {
    position: relative;
    float: left;
    height: 100%;
    box-sizing: border-box;
    background-color: #FFF;
}
.wrap_reserve .od_section_step_con .article .group_top {
    overflow: hidden;
    position: relative;
    height: 55px;
    line-height: 55px;
    border-right: 1px solid #222;
    text-align: center;
    background-color: #000;
}
.wrap_reserve .od_section_step_con .article .group_top .tit {
    font-size: 18px;
    color: #FFF;
}
.wrap_reserve .od_section_step_con .article .group_top .txt {
    position: absolute;
    top: 5px;
    right: 30px;
    font-size: 13px;
    color: #fff;
}
.article.article_seat > .ps_od_od_inner {
    overflow: hidden;
    height: 815px;
}
.select_num_people_wrap {
    overflow: hidden;
    height: 117px;
    padding: 0 20px;
    background-color: #FFF;
}
.select_num_people_wrap .movie_infor {
    position: relative;
    float: left;
    width: 270px;
    padding: 30px 0 0 54px;
}
.select_num_people_wrap .movie_infor .thm {
    display: block;
    overflow: hidden;
    position: absolute;
    top: 26px;
    left: 0;
    overflow: hidden;
    width: 46px;
    height: 65px;
    border-radius: 4px;
}
.select_num_people_wrap .movie_infor .thm img {
    width: 100%;
}
.select_num_people_wrap .movie_infor .group_infor .bx_tit {
    display: block;
    margin-bottom: 10px;
}
.select_num_people_wrap .movie_infor .group_infor dl dd.sub_info1 {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 5px;
    font-size: 11px;
}
.select_num_people_wrap .movie_infor .group_infor dl dd.sub_info1 .time {
    position: relative;
    padding-left: 9px;
    margin-left: 10px;
}
.select_num_people_wrap .count_people {
    float: right;
    width: 825px;
    margin-top: 36px;
}
.select_num_people_wrap .count_people > ul > li:first-child {
    margin-left: 0;
}
.select_num_people_wrap .count_people > ul > li {
    float: left;
    margin-left: 20px;
}
.select_num_people_wrap .count_people > ul > li .tit {
    margin-right: 8px;
    font-size: 13px;
}
.select_num_people_wrap .count_people > ul > li .bx_num {
    display: inline-block;
    width: 100px;
}
.bx_num{
  position: relative;
  width: 105px;
  border: 1px solid #DDD;
  border-radius: 4px;
  background-color: #fff;
  box-sizing: border-box;
}
.bx_num .btn_mins {
    left: 0;
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/minus_12.png);
}
.bx_num .btn_plus {
    right: 0;
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/plus_12.png)
}
.btn_plus, .btn_mins {
    position: absolute;
    top: 0;
    bottom: 0;
    background: no-repeat 50% 50%;
    border: 0 none;
    padding: 0 15px;
    text-indent: -9999em;
    font: 0 auto;
}
.bx_num .txt_num {
    padding: 11px 0;
    font-family: 'Roboto';
    font-size: 15px;
    font-weight: bold;
    color: #000;
    text-align: center;
    vertical-align: middle;
}
.select_num_people_wrap .movie_infor .group_infor .bx_tit strong {
    font-size: 17px;
}
.sub_info1{
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  font-size: 11px;
}
.time_before{
  content: "";
  display: block;
  position: absolute;
  top: 3px;
  left: 0;
  width: 1px;
  height: 10px;
  background: #ddd;
}

//오더 결제 --
.wrap_reserve .od_section_step_con .article.article_sum_infor {
    width: 301px;
}
.wrap_reserve .od_section_step_con .article .group_top {
    overflow: hidden;
    position: relative;
    height: 55px;
    line-height: 55px;
    border-right: 1px solid #222;
    text-align: center;
    background-color: #000;
}
.wrap_reserve .od_section_step_con .article.article_sum_infor > .od_od_inner {
    overflow: hidden;
    height: 815px;
    border-right: 1px solid #DDD;
}
.article_sum_infor .movie_infor {
    padding: 30px 30px 18px;
    border-bottom: 1px solid #DDD;
    height: 390px;
}
.article_sum_infor .movie_infor.new2020 .thm {
    margin-bottom: 20px;
    text-align: center;
}
.article_sum_infor .movie_infor .thm {
    display: block;
    overflow: hidden;
    margin-bottom: 30px;
    border-radius: 4px;
}
.article_sum_infor .movie_infor.new2020 .thm img {
    width: 120px;
}
.article_sum_infor .movie_infor .tit {
    display: block;
    margin-bottom: 10px;
    font-size: 17px;
}
.od_dlist_infor dt {
    clear: both;
    float: left;
    min-width: 40px;
    margin-bottom: 7px;
    font-size: 11px;
}
.od_dlist_infor dd {
    float: left;
    margin-bottom: 7px;
    font-size: 11px;
    width: 200px;
    word-break: keep-all;
}
.od_dlist_infor.after {
    content: "";
    display: block;
    clear: both;
}
.article_sum_infor .seat_infor {
    padding: 24px 30px 15px;
    border-bottom: 1px solid #DDD;
    height: 80px;
}
.article_sum_infor .addprodlistwrap {
    position: relative;
    padding-top: 30px;
}
.addprodlistwrap .pay_movie_infor.type1 {
    display: flex;
    position: relative;
    min-height: 80px;
    padding: 8px 12px;
    margin-bottom: 20px;
    border: 1px solid #eee;
    border-radius: 4px;
    background-color: #fff;
    box-sizing: border-box;
}
.addprodlistwrap .pay_movie_infor .img_product {
    min-height: 68px;
    margin-right: 10px;
    line-height: 68px;
}
.addprodlistwrap .pay_movie_infor .img_product + .bx_infor {
    display: flex;
    flex: 1;
    flex-flow: column;
    justify-content: center;
}
.addprodlistwrap .pay_movie_infor .img_product .thm {
    display: inline-block;
    overflow: hidden;
    width: 72px;
    height: 58px;
    vertical-align: middle;
}
.addprodlistwrap .pay_movie_infor .img_product .thm img {
    width: 100%;
    height: 100%;
}
.addprodlistwrap .pay_movie_infor .bx_infor .badge_wrap {
    display: inline-block;
    padding-bottom: 3px;
}
.addprodlistwrap .pay_movie_infor.type1 .between_txt.type1 {
    line-height: 1.5;
}
.addprodlistwrap .pay_movie_infor .bx_infor .between_txt.type1 {
    display: initial;
    font-size: 13px;
    text-align: left;
}

.wrap_reserve .section_step_con .article {
    position: relative;
    float: left;
    height: 100%;
    box-sizing: border-box;
    background-color: #FFF;
}
.wrap_reserve .section_step_con .article.article_pay_method > .od_inner {
    overflow: hidden;
    height: 815px;
    border-right: 1px solid #DDD;
}
.wrap_reserve .section_step_con .article.article_pay_method > .od_inner .mCustomScrollbar {
  position: relative;
  overflow: visible;

  height: 815px;
}
.mCustomScrollbar.mCS_no_scrollbar, .mCustomScrollbar.mCS_touch_action {
    touch-action: auto;
}
.mCustomScrollBox {
    position: relative;
    overflow: hidden;
    height: 100%;
    max-height: none;
    max-width: 100%;
    outline: none;
    direction: ltr;
}
.mCSB_container.mCS_no_scrollbar_y.mCS_y_hidden {
    margin-right: 0;

    position: relative;
    top: 0;
    left: 0;
}
.mCSB_container {
    overflow: hidden;
    width: auto;
    height: auto;
}
.group_discount {
    padding: 0 18px;
    border-top: 5px solid #f8f8f8;

    min-height: 365px;
    border-bottom: 1px solid #EEE;

    display: block;
}
.article_pay_method .tit_payment {
    display: block;
    margin: 18px 0 16px;
    font-size: 15px;
}
.tab_wrap3.reset.selected {
    border: 1px solid #272727;
}
.tab_wrap3.reset {
    overflow: hidden;
}
.tab_wrap3 {
    margin: 10px 0 10px;
    border-radius: 4px;
    border: 1px solid #DDD;
    background-color: #FFF;
}
.list_pay_item {
    margin: 0 -1%;
}
.list_pay_item.cate4 li {
    position: relative;
    width: 23%;
}
.list_pay_item li {
    float: left;
    margin: 0 1% 10px;
}
.group_discount .wrap_coupon .bx_cate .list_pay_item li button {
    overflow: visible;
    position: relative;
    height: 55px;
    line-height: 55px;
    font-size: 11px;
}
.list_pay_item li button {
    width: 100%;
    border-radius: 4px;
    background-color: #FFF;
}
.ic_txt_event.active {
    display: block;
}
.ic_txt_new.type2, .ic_txt_event.type2, .ic_txt_sale.type2 {
    right: 5px;
    top: -7px;
    border-radius: 5px;
    border-bottom-left-radius: 0;
    font-size: 8px;
}
.ic_txt_event {
    display: none;
    position: absolute;
    right: -5px;
    top: -8px;
    line-height: 1;
    padding: 3px 5px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    font-family: 'Roboto';
    font-size: 11px;
    color: #FFF;
    background-color: #FF243E;
}
.group_payment {
    padding: 15px 30px;
}
.article_sum_infor {
    width: 301px;
}
.article.article_pay_method {
    width: 487px;
    background-color: #F8F8F8 !important;
}
.list_pay_item li button {
    width: 100%;
    border-radius: 4px;
    background-color: #FFF;
    border: 1px solid #DDD;
    cursor: pointer;
    background-color: #fff;
}
.list_pay_item li button {
    overflow: visible;
    position: relative;
    height: 55px;
    line-height: 55px;
    font-size: 11px;
}
.group_payment .bx_cate .list_pay_item li button {
    overflow: visible;
    position: relative;
    height: 68px;
    line-height: 95px;
    background-repeat: no-repeat;
    width: 130px;
}
.group_payment .bx_cate .list_pay_item li button.cate1 {
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/payment/method_ic_card.png);
    background-position: center 17px;
}
.list_pay_item li button {
    width: 100%;
    border-radius: 4px;
    background-color: #FFF;
}
.toggle_wrap.couplechk{
  margin: 10px 0 20px 0;
    border: 0;
    border-top: 1px solid #ddd;
}
.toggle_wrap {
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #ddd;
}
.tab_wrap3 .tab_tit {
    margin-bottom: -1px;
}
.tab_wrap3 .tab_tit ul {
    display: flex;

}
.tab_wrap3 .tab_tit li {
    flex: 2;
    justify-content: center;
    align-items: center;
    text-align: center;

}
.tab_wrap3 .tab_tit li:nth-child(1){
  border-right: 1px solid #e7e7e7;
}
.tab_wrap3.reset.selected .tab_tit li button {
    color: #272727;
    background-color: #FFF;
    font-size: 13px;
    // height: 40px;

    height: 40px;
}
.tab_wrap3.reset .tab_tit li button {
    border-bottom-width: 0;
}
.tab_wrap3 .tab_tit li button .point {
    color: #2AA3FE;
}
.group_discount .wrap_coupon .bx_cate .list_pay_item .txt_cnt {
    position: absolute;
    right: 4px;
    top: 4px;
    width: 15px;
    height: 15px;
    line-height: 15px;
    border-radius: 15px;
    font-family: 'Roboto';
    font-size: 10px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    background-color: #000;
}
.btn_txt_reset {
    position: absolute;
    right: 32px;
    top: 14px;
}
.btn_txt_reset {
    height: 28px;
    line-height: 21px;
    box-sizing: border-box;
    padding: 0 10px 0 25px;
    border-radius: 28px;
    border: 1px solid #BEBEBE;
    font-size: 11px;
    color: #000;
    background: #FFF url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/reset.png) no-repeat 12px 51%;
}
.article.article_payment {
    width: 414px;
}
.payment_sum_wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #414141;
}
.payment_sum_wrap dl:first-child {
    border-top: none;
}
.payment_sum_wrap dl {
    padding: 10px 30px;
    border-top: 1px solid rgba(255, 255, 255, .2);
}
.payment_sum_wrap dl dt {
    clear: both;
    float: left;
    line-height: 25px;
    padding: 4px 0;
    font-size: 13px;
    color: #FFF;
}
.payment_sum_wrap dl dd {
    float: right;
    clear: right;
    line-height: 30px;
    padding: 4px 0;
    font-size: 11px;
    color: #FFF;
}
.payment_sum_wrap dl dd strong {
    display: inline-block;
    line-height: 25px;
    margin: 0 4px 0 8px;
    font-family: 'Roboto';
    font-size: 17px;
    font-weight: bold;
    vertical-align: bottom;
}
.payment_sum_wrap dl .after {
    content: "";
    display: block;
    clear: both;
}
.payment_sum_wrap .btn_confirm {
    display: block;
    border-radius: 0;
    height: 64px;
    line-height: 64px;
    font-size: 17px;
}
.btn_col1 {
    display: inline-block;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #FF243E;
    font-size: 14px;
    color: #ffffff !important;
    text-align: center;
    vertical-align: middle;
    background-color: #FF243E;
}
.payment_sum_wrap dl {
    padding: 10px 30px;
    border-top: 1px solid rgba(255, 255, 255, .2);
}
</style>

