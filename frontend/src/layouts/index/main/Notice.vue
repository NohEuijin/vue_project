<template>
  <div class="main_cont_wrap notice">
  <div class="tit_name">공지사항
    <p></p>
  </div>
  <div class="rolling_menu_wrap">
    <div class="rolling_menu">
      <li>
        <a href="" title="회사 사칭 피싱 사기 주의">회사 사칭 피싱 사기 주의</a>
      </li>
      <li>
        <a href="" title="롯데시네마 개인정보처리방침 개정 안내">롯데시네마 개인정보처리방침 개정 안내</a>
      </li>
      <li>
        <a href="" title="롯데시네마 영상정보처리기기 운영 및 관리방침 개정 안내">롯데시네마 영상정보처리기기 운영 및 관리방침 개정 안내</a>
      </li>
      <li>
        <a href="" title="회사 사칭 피싱 사기 주의">회사 사칭 피싱 사기 주의</a>
      </li>
    </div>
  </div>
  <button type="button" class="btn_tit_list">더보기</button>
</div>
</template>

<script>
export default {

}
</script>

<style>
 /* 공지사항 */
.notice{
  padding-bottom: 10px;
  border-bottom: 1px solid #AAA;
}
.notice .tit_name{
  font-size: 13px;
  display: inline-block;
  margin: 0;
  vertical-align: middle;
}
.tit_name p{
  content: '';
  display: inline-block;
  width: 1px;
  height: 13px;
  background: #707070;
  margin: 0 20px;
  vertical-align: middle;
}
.rolling_menu_wrap{
  position: relative;
    display: inline-block;
    width: 840px;
    height: 15px;
    overflow: hidden;
    vertical-align: middle;
}
.rolling_menu{
  position: absolute;
  left: 0;
}
.rolling_menu a{
  font-size: 13px;
  line-height: 15px;
}
</style>
