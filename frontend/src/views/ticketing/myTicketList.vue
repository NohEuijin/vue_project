<template>
  <div class=" mt_contents_full">
    <div class="wrap_reserve ty2">

  <div class="mt_section_step_con step04 active">
    <h3 class="hidden">결제내역</h3>
    <div class="article mt_article_payment_fin ">
      <div class="group_top">
        <h4 class="tit">결제내역</h4>
      </div>
      <div class="pm_inner">

    <div class="payment_fin_wrap">
<!-- 티켓 리스트 시작 -->
        <div class="reserve_result_wrap">
          <div class="infor_wrap">
            <div class="bx_thm">
              <img :src="paymentInfo?.buyer_poster_url ? backUrl + paymentInfo.buyer_poster_url : ''" alt="">
            </div>
          <div class="group_infor">
            <dl>
              <dt>예매번호</dt>
              <dd>
                <storng class="txt_num">{{paymentInfo.hashcode}}</storng>
              </dd>
              <span class="after"></span>
            </dl>
            <dl>
              <dt>상영일시</dt>
              <dd>
                {{paymentInfo.buyer_choice_date}}
                ({{ dayFormat(paymentInfo.buyer_choice_date) }})
                <span>
                  {{ convertToShortTime(start_time) }}
                  ~
                  {{ end_time }}
                </span>
              </dd>
              <dt>상영관</dt>
              <dd>
                {{ paymentInfo.buyer_theater_city }}
                {{ paymentInfo.buyer_theater_title }}
                ({{ paymentInfo.buyer_theater_name }})

              </dd>
              <dt>관람인원</dt>
              <dd>성인</dd>
              <dt>좌석</dt>
              <dd>
                {{ paymentInfo.buyer_seat }}
              </dd>
              <span class="after"></span>
            </dl>
            <button class="mt-4 btn_col3 ty5">결제취소</button>
          </div>
          <span class="after"></span>
        </div>

        <div class="payment_wrap new2020">
          <div class="group_price case1">
            <dl class="minus">
              <dt>주문금액</dt>
              <dd>
                {{ paymentInfo.amount }}
                <strong></strong>원
              </dd>
              <!-- <span class="after"></span> -->
            </dl>
          </div>

          <div class="group_price case2">
            <dl class="minus">
              <span class="before"></span>
            <dt>할인금액</dt>
            <dd>
              <strong>0</strong>원
            </dd>
            <span class="after"></span>
            </dl>
            <span class="after"></span>
          </div>

          <div class="group_price case3">
            <dl>
              <span class="before"></span>
            <dt>총 결제 금액</dt>
            <dd>
              <strong>
                {{ paymentInfo.amount }}
              </strong>원
            </dd>
            </dl>

            <div class="pay_method">
              <dl class="sml">
              <dt>결제방법</dt>
              <dd class="kakako">
                <span class="txt_card1 ty1">카카오페이</span>
              </dd>
              <dt>카드번호</dt>
              <!-- <dd class="sml last">
                신한 422155******8471
              </dd> -->
              </dl>
            </div>
          </div>
        </div>
      </div>
<!-- 티켓 리스트 끝 -->
</div>


    </div>
    </div>
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
      user_name:'',
      backUrl:import.meta.env.VUE_APP_BACKEND_URL,
      paymentInfo:'',

      start_time:'',
      show_time:'',
      end_time:'',
    };
  },
  methods:{
  // 유저 정보
  async userData(){
    await this.$store.dispatch('myData').then((res) =>{
      console.log(res)
    }).catch(() => {
      // console.error("로그인 정보가 없습니다.")
    })
  },
    // 결제 정보
    async getPayment(){
      await this.$store.dispatch('getPayment',{userId:this.user_id})
      .then((res) => {
        // console.log(res)
        this.paymentInfo = res.payments[0]
        console.log(this.paymentInfo)

        this.user_name = this.paymentInfo.user.name
        this.start_time = this.paymentInfo.buyer_choice_time,
        this.show_time = this.paymentInfo.buyer_poster_showtime
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
  mergeTime(time) {
    // :를 제거한 문자열 반환
    return time.replace(":", "");
  },
    //날짜 폼
    todayFormat(){
    return this.today.format("YYYY-MM-DD");
  },
    //종료시간
    endtimeMethod(){
    this.starttimeMs = this.convertToTimeMilliseconds(this.start_time)
    this.showtimeMs = this.convertMinutesToMilliseconds(this.show_time)
    this.endtimeMs = this.starttimeMs+this.showtimeMs
    this.end_time = this.convertMillisecondsToHHMM(this.endtimeMs)
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
  //해쉬 코드 만들기
  generateHashCode(date, time){
    let numbers = [];
      while (numbers.length < 4) {
        let randomNum = Math.floor(Math.random() * 9) + 1; // 1부터 9까지의 랜덤 숫자
        if (!numbers.includes(randomNum)) {
          numbers.push(randomNum);
        }
      }
       // 콤마 없이 문자열로 저장
      return time + date + numbers.join('');
    },
},
  computed: {

  },
  async mounted(){
    await this.getPayment();
    this.endtimeMethod()
    // await this.userData();
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
.wrap_reserve .pm_section_step_con.active {
    display: block;
    overflow: inherit;
    position: relative;
    width: 1280px;
    height: 100%;
    // margin-left: 78px;
}
.wrap_reserve .mt_section_step_con .article.article_seat {
    width: 1202px;
}
.wrap_reserve .mt_section_step_con .article {
    position: relative;
    float: left;
    height: 100%;
    box-sizing: border-box;
    background-color: #FFF;
}
.wrap_reserve .mt_section_step_con .article .group_top {
    overflow: hidden;
    position: relative;
    height: 55px;
    line-height: 55px;
    border-right: 1px solid #222;
    text-align: center;
    background-color: #2f2f2f;
}
.wrap_reserve .mt_section_step_con .article .group_top .tit {
    font-size: 18px;
    color: #FFF;
}
.wrap_reserve .mt_section_step_con .article .group_top .txt {
    position: absolute;
    top: 5px;
    right: 30px;
    font-size: 13px;
    color: #fff;
}
//결제완료
.wrap_reserve .mt_section_step_con .article.mt_article_payment_fin{
  width: 1280px;
    background-color: #F8F8F8;
}
.pm_inner{
  overflow: hidden;
  height: 855px;
  overflow-y: auto;
}
.payment_fin_wrap {
    width: 685px;
    margin: 0 auto;
}
.top_notice_ic.ty1 {
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/top_notice_ic_01.png);
}
.top_notice_ic strong{

}
.top_notice_ic {
    margin: 50px 0 20px;
    padding-top: 52px;
    font-size: 15px;
    text-align: center;
    background-repeat: no-repeat;
    background-position: center top;
}
.reserve_result_wrap {
    position: relative;
    // width: 605px;
    height: 414px;
    margin: 18px 0;
    padding: 40px 40px 25px;
    border-radius: 4px;
    border: 1px solid #DDD;
    background-color: #FFF;
    border-bottom: none;
}
.reserve_result_wrap .infor_wrap .bx_thm {
    overflow: hidden;
    float: left;
    width: 150px;
    height: 215px;
    margin-right: 50px;
    border-radius: 4px;
}
.reserve_result_wrap .infor_wrap .bx_thm img {
    width: 100%;
}
.reserve_result_wrap .infor_wrap .group_infor {
    float: left;
    margin-top: -4px;
}
.reserve_result_wrap .infor_wrap .group_infor dl:first-child {
    padding-bottom: 34px;
    border-bottom: 1px solid #333;
}
.reserve_result_wrap .infor_wrap .group_infor dl {
    margin: 0 0 10px 0;
}
.reserve_result_wrap .infor_wrap .group_infor dl dt {
    clear: both;
    float: left;
    width: 86px;
    line-height: 1.4;
    margin: 4px 0;
    font-size: 15px;
}
.reserve_result_wrap .infor_wrap .group_infor dl dd {
    float: left;
    width: 315px;
    line-height: 1.4;
    margin: 4px 0;
    font-size: 15px;
    color: #666;
}
.reserve_result_wrap .infor_wrap .group_infor dl dd strong.txt_num {
    font-family: 'Roboto';
    color: #000;
}
.group_infor dl .after {
    content: "";
    display: block;
    clear: both;
}
.reserve_result_wrap .infor_wrap .group_infor dl {
    margin: 0 0 10px 0;
}
.group_infor dl .after {
    content: "";
    display: block;
    clear: both;
}
.reserve_result_wrap .infor_wrap .group_infor .btn_col1 {
    margin-top: 10px;
    // margin-left: 86px;
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
.infor_wrap .after {
    content: "";
    display: block;
    clear: both;
}
.reserve_result_wrap .payment_wrap {
    margin-top: 240px;
    padding-top: 20px;
    border-top: 1px solid #DDD;
}

.reserve_result_wrap .payment_wrap.new2020 .group_price {
    border-right: 0;
}
.reserve_result_wrap .payment_wrap .group_price.case1 {
    width: 160px;
    padding-left: 0;
}
.reserve_result_wrap .payment_wrap .group_price {
    position: relative;
    float: left;
    height: 80px;
    padding: 0 25px;
    border-right: 1px dashed #DDD;
}
.reserve_result_wrap .payment_wrap dl dt {
    clear: both;
    float: left;
    line-height: 1.4;
    margin: 2px 0 6px;
    font-size: 13px;
}
.reserve_result_wrap .payment_wrap dl dd {
    float: right;
    line-height: 1.4;
    margin: 2px 0 6px;
    font-size: 13px;
}
.reserve_result_wrap .payment_wrap dl .kakako{
  position: absolute;
  float: left;
  line-height: 6;
  margin: 2px 0 6px;
  font-size: 13px;
}
.reserve_result_wrap .payment_wrap dl dd strong {
    font-family: 'Roboto';
}
.payment_wrap dl .after {
    content: "";
    display: block;
    clear: both;
}
.reserve_result_wrap .payment_wrap.new2020 .group_price.case2 {
    border-right: 1px solid #DDD;
    border-left: 1px dashed #DDD;
}
.reserve_result_wrap .payment_wrap .group_price.case2 {
    width: 200px;
}
.group_price .plus {
    position: relative;
}
.reserve_result_wrap .payment_wrap.new2020 .group_price .minus .before {
    background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/ic_rnd_21_01.png) no-repeat;

    // content: "";
    position: absolute;
    left: -10px;
    top: 0;
    width: 21px;
    height: 21px;
}
.payment_wrap dl .after {
    content: "";
    display: block;
    clear: both;
}
.group_price.case2 .after {
  content: "";
  position: absolute;
  // right: -10px;
  left: 189px;
  top: 0;
  width: 21px;
  height: 21px;
  background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/icon/ic_rnd_21_02.png) no-repeat;
}
.reserve_result_wrap .payment_wrap.new2020 .group_price {
    border-right: 0;
}
.reserve_result_wrap .payment_wrap .group_price.case3 {
    width: 240px;
    padding-right: 0;
    border-right: 0;
}
.reserve_result_wrap .payment_wrap dl.sml {
    margin-top: 10px;
}
.reserve_result_wrap .payment_wrap .pay_method dl dt {
    overflow: hidden;
    position: absolute;
    float: left;
    width: 1px;
    height: 1px;
}
.reserve_result_wrap .payment_wrap dl.sml dt {
    font-size: 11px;
}
.txt_card1 {
    display: inline-block;
    min-width: 48px;
    height: 21px;
    line-height: 21px;
    padding: 0 3px;
    border-radius: 4px;
    font-size: 11px;
    color: #FFF;
    text-align: center;
}
.txt_card1.ty1 {
    background-color: #AFAFAF;
}
.reserve_result_wrap .payment_wrap dl.sml dd .txt_card1 {
    margin-top: -3px;
}

.reserve_result_wrap .payment_wrap dl.sml dd {
    font-size: 11px;
}
.reserve_result_wrap .payment_wrap .pay_method dl dd.last {
    float: right;
}
.reserve_result_wrap .after {
    content: "";
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: -1px;
    height: 6px;
    background: url(https://www.lottecinema.co.kr/NLCHS/Content/images/member/bg_ticket.gif) repeat-x 0 bottom;
}
.list_txt.sml {
    font-size: 11px;
}
.list_txt.sml li {
    margin-bottom: 3px;
}
.list_txt > li {
    line-height: 1.4;
    margin: 0 0 5px 8px;
    text-indent: -8px;
    color: #333;
}
.list_txt .before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 3px;
    margin: 8px 5px 0 0;
    border-radius: 50%;
    vertical-align: top;
    background-color: #666;
}
.list_txt strong {
    color: #FF243E;
}
.payment_fin_wrap .btn_btm_wrap {
    margin: 50px 0 0;
}
.btn_btm_wrap {
    margin: 60px 0;
    text-align: center;
}
.mb50 {
    margin-bottom: 50px !important;
}
.pb50 {
    padding-bottom: 50px !important;
}
.btn_col1.ty5, .btn_col2.ty5, .btn_col3.ty5, .btn_col4.ty5, .btn_col5.ty5, .btn_col6.ty5, .btn_col7.ty5, .btn_col8.ty5, .btn_col9.ty5, .btn_col10.ty5 {
    height: 40px;
    line-height: 38px;
    padding: 0 18px;
}
.btn_btm_wrap a, .btn_btm_wrap button {
    margin: 0 3px;
    min-width: 160px;
    /* padding: 0 !important; */
}
.btn_col3 {
    display: inline-block;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #000000;
    font-size: 14px;
    color: #000000 !important;
    text-align: center;
    vertical-align: middle;
    background-color: #ffffff;
}
.btn_col2 {
    display: inline-block;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #414141;
    font-size: 14px;
    color: #ffffff !important;
    text-align: center;
    vertical-align: middle;
    background-color: #414141;
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
</style>

