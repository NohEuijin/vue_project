<template>
  <div class="pt-12 n_contents">
    <div class="title_top">
      <h1 class="tit">커뮤니티</h1>
    </div>

    <ul class="tab_wrap outer actionmovingbar">
      <li class="active">
        <button type="button" class="tab_tit"
         style="  width: 20%; left: 0%;">
          <em>커뮤니티</em>
        </button>
        <div class="tab_con ty2">
          <!-- <h3 class="hidden">FAQ</h3> -->
          <div class="faq_icon_wrap bx_category_slct lotcipassfaq">
            <button class="active ico_01">커뮤니티</button>
            <button class="ico_02">스페셜관</button>
            <button class="ico_03">L.POINT</button>
            <button class="ico_04">회원</button>
            <button class="ico_05">멤버십</button>
            <button class="ico_06">온라인</button>
            <button class="ico_07">할인혜택</button>
            <button class="ico_08">관람권</button>
            <button class="ico_09">스토어</button>
            <button class="ico_10">롯시클럽</button>
          </div>
        </div>

        <div class="text_box">
          <label>
            <div class="test_raido">
            최신순
            <input type="radio"
            id="one"
            value="최신"
            v-model="dataDesc"
            @change="changeSortOrder" />
          </div>
          </label>
          <label>
            <div class="test_raido">
            조회순
            <input type="radio"
            id="one"
            value="조회"
            v-model="dataDesc"
            @change="changeSortOrder" />
          </div>
          </label>
          <label>
            <div class="test_raido">
            번호순
            <input type="radio"
            id="one"
            value="번호"
            v-model="dataDesc"
            @change="changeSortOrder"/>
          </div>
          </label>
        </div>

        <fieldset class="search_wrap ty2">
          <!-- <p class="hidden">검색하기</p> -->
          <input type="text"
          v-model="searchText"
          placeholder="검색어를 입력해 주세요."
          id="searchKeyword">
          <button type="button"
          @click="deBounceSearch"
          class="btn_col2">검색</button>
          <button
          type="button"
          class="btn_col2"
          @click="confirmWite()"
          >글쓰기</button>
          <div class="txt_help_wrap">
            <p>더 궁금한 점이 있거나, 이미 문의한 내용과 답변을 확인하려면?</p>
            <a href="">1:1 문의 바로가기</a>
          </div>
        </fieldset>

        <table class="tb_acc_wrap">
          <!-- <caption class="hidden">FAQ</caption> -->
          <colgroup>
            <col style="width: 10%;">
            <col style="width: 50%;">
            <col style="width: 15%;">
            <col style="width: 10%;">
            <col style="width: 15%;">
          </colgroup>
          <thead>
            <tr>
              <th scope="col">글번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">조회수</th>
              <th scope="col">작성날짜</th>
            </tr>
          </thead>

          <tbody class="tab">
            <tr
            v-for="(freeBoard, index) of freeBoardList"
            :key="index"
            >
              <td>{{ freeBoard.id }}</td>
              <td>
                <router-link
                :to="{ name:'detail', params:{id:freeBoard.id}}">
                {{ truncateText(freeBoard.title, 50) }}
              </router-link>
              </td>
              <td>{{ freeBoard.user ? freeBoard.user.username : "Null"}}</td>
              <td>
                {{ freeBoard.viewcount }}
              </td>
              <td>
                {{ formatDate(freeBoard.updated_at) }}
              </td>
            </tr>
          </tbody>

        </table>

        <div class="pagination">
          <ol>
            <li
            v-for="(page, pageIdx) of page_count" :key="`page-${pageIdx}`">
              <a class="strong_p"
              :class="[start_page === page ? ('text-red') : null]"
              @click="clickPagination(page)">
              {{ page }}
              </a>
            </li>
          </ol>
        </div>

      </li>
      <!-- 리스트 1단 -->
      <li>
        <button type="button" class="tab_tit"
        style="  width: 20%; left: 20%;">
          <em>공지사항</em>
        </button>
      </li>
      <!-- 리스트 2단 -->
      <li>
        <button type="button" class="tab_tit"
        style="  width: 20%; left: 40%;">
          <em>1:1문의</em>
        </button>
      </li>
      <!-- 리스트 3단 -->
      <li>
        <button type="button" class="tab_tit"
        style="  width: 20%; left: 60%;">
          <em>단체관람/대관문의</em>
        </button>
      </li>
      <!-- 리스트 4단 -->
      <li>
        <button type="button" class="tab_tit"
        style="  width: 20%; left: 80%;">
          <em>분실물문의</em>
        </button>
      </li>

    </ul>


  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted  } from 'vue';

  const store = useStore();
  const router = useRouter();
  const start_page = ref(1)
  const items_per_page = ref(10)
  const total_page = ref(0)
  //검색
  const searchText = ref('');
  //store 에서 리스트 가져오기
  let freeBoardList = ref([]);
  //정렬 순서(변수)
  const dataDesc = ref('');

  //페이지 수 계산
  // (총 개수 total_page)/(한 페이지당 보여줄 개수 items_per_page)
  const page_count = computed(() => {
    return total_page.value === 0 ? 0
    : Math.floor((total_page.value / items_per_page.value))
    + (total_page.value % items_per_page.value > 0 ? 1 : 0)
      })

  // 페이지 마운트 후, 실행되도록 onMounted 사용
  onMounted(async () => {
    await getFreeBoards()
  });

  // 검색 클릭 => 함수 실행
  const search = () => {
    getFreeBoards()
  }

  // radio => 정렬 순서 변경 함수 실행
  // 정렬 순서가 변경될 때, 데이터 다시 가져오기
  const changeSortOrder = () => {
    getFreeBoards();
  };

  // 자유게시판 리스트 함수
  //(start:시작,limit:끝,total:aggregate:총갯수)
  //sortCondition : 최신순 ,조회순, 번호순
  async function getFreeBoards(){
    let form = {
      start: (start_page.value - 1) * items_per_page.value,
      limit: start_page.value * items_per_page.value,
      sortCondition: dataDesc.value === '최신' ? 'updated_at:desc' : (dataDesc.value === '조회' ? 'viewcount:desc' : 'id:asc')
    }

    // searchText 값 존재 = form[search] 값 = 검색
    if(searchText.value){
      form["search"] = searchText.value
    }

    //리스트를 가지고와 총갯수와 리스트 값을 받음
    await store.dispatch('freeBoardList', form)
    .then((res) => {
      console.log(res);
      total_page.value = res.freeBoardsConnection.aggregate.count;
      freeBoardList.value = res.freeBoards;
    }
    )
    .catch(err => console.error(err));

    //검색 결과 없을 때
    if(freeBoardList.value.length === 0){
      confirm("검색 결과가 존재하지 않습니다.")
      searchText.value ='';
      await getFreeBoards();
    }
  }

  //페이지 변경시 => 함수 실행
  //선택한 페이지를 start_page 변수에 할당, 데이터 다시 가져오기
  function clickPagination(value){
    start_page.value = value
    getFreeBoards()
  }

  // 날짜 포멧 변경
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year} - ${month} - ${day}`;
  };

  // 글자수 ... 생략 처리
  const truncateText = (text, maxLength) => {
    if(text.length > maxLength){
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
  console.log(store.state.meData)

  //글쓰기 유효검사
  const confirmWite = () => {
    if(!store.state.meData.id || store.state.meData.id.trim() === ''){
      const confirmResult = confirm("로그인 후 사용이 가능한 서비스 입니다! 로그인 페이지로 이동 하시겠습니까?")
      if(confirmResult){
        router.push('/login');
      }
    }else{
      router.push({name:'write'})
    }
    return;
  }

  // 검색 다 클릭시 이벤트 시간 조정 테스트
  const lodingTime = 300; //
  let lodingTimer = null;

  //throttle
  //(lodingTime동안)아무리 많이 호출해도 최대 한 번만 발생
  const throttledSearch = () => {
    if (!lodingTimer) {
      lodingTimer = setTimeout(() => {
        search();
        lodingTimer = null;
      }, lodingTime);
    }
  }

  //Debounce
  //(연속해서 발생하는 여러 이벤트)하나로 묶어서 한 번만 실행
  const deBounceSearch = () => {
  clearTimeout(lodingTimer);
  lodingTimer = setTimeout(() => {
    search();
    lodingTimer = null;
  }, lodingTime);
}

</script>

<style>
.n_contents{
  margin-top: 120px;

  width: 980px;
  margin: 0 auto;
}
.title_top{
  margin-bottom: 20px;
  padding: 25px 0 14px;
  border-bottom: 1px solid #EEE;
}
.title_top .tit{
  font-size: 25px;
  font-weight: 500;
}
.tab td{
  /* width: 100px; */
  /* 줄바꿈 방지 */
  /* white-space : nowrap; */
  /* 너비 넘어선 글자 히든 처리 */
  overflow : hidden;
  /* 숨겨진 영역 ... 처리 */
  text-overflow : ellipsis;
}

.tab_wrap.outer{
  padding-top: 80px;
}
.tab_wrap {
    position: relative;
}
.tab_wrap > li > .tab_tit {
    position: absolute;
    top: 0;
}

.tab_wrap.outer > li.active > .tab_tit {
  border-bottom: 2px solid #111;
    color: #000;
}
.tab_wrap.outer > li > .tab_tit{
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #CCC;
  font-size: 15px;
  color: #7F7F7F;
}
.tab_wrap > li.active > .tab_con {
    overflow: inherit;
    position: relative;
    width: auto;
    height: auto;
}
.tab_wrap > li > .tab_con.ty2 {
    margin-top: -8px;
}
.faq_icon_wrap.lotcipassfaq {
    padding: 12px;
}
.faq_icon_wrap {
    position: relative;
    background: #F5F5F5;
    /* padding: 12px 13px; */
    margin-bottom: 48px;
    white-space: nowrap;
    text-align: center;
}
.faq_icon_wrap .ico_01 {
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/customer/ic_faq_cate_01_202209.png);
    background-position: center 20px;
    margin-left: 0;
}
.faq_icon_wrap .ico_02 {
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/customer/ic_faq_cate_02_202209.png);
    background-position: center 20px;
    margin-left: 0;
}
.faq_icon_wrap .ico_03 {
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/customer/ic_faq_cate_03_202209.png);
    background-position: center 20px;
    margin-left: 0;
}
.faq_icon_wrap .ico_04 {
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/customer/ic_faq_cate_04_202209.png);
    background-position: center 20px;
    margin-left: 0;
}
.faq_icon_wrap .ico_05 {
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/customer/ic_faq_cate_05_202209.png);
    background-position: center 20px;
    margin-left: 0;
}
.faq_icon_wrap .ico_06 {
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/customer/ic_faq_cate_06_202209.png);
    background-position: center 20px;
    margin-left: 0;
}
.faq_icon_wrap .ico_07 {
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/customer/ic_faq_cate_07_202209.png);
    background-position: center 20px;
    margin-left: 0;
}
.faq_icon_wrap .ico_08 {
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/customer/ic_faq_cate_08_202209.png);
    background-position: center 20px;
    margin-left: 0;
}
.faq_icon_wrap .ico_09 {
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/customer/ic_faq_cate_09_202209.png);
    background-position: center 20px;
    margin-left: 0;
}
.faq_icon_wrap .ico_10 {
    background-image: url(https://www.lottecinema.co.kr/NLCHS/Content/images/customer/ic_faq_cate_10_202209.png);
    background-position: center 20px;
    margin-left: 0;
}
.faq_icon_wrap.lotcipassfaq button {
  width: 90px;
  padding: 54px 0 14px;

  margin-left: 4px;
}
.faq_icon_wrap button {
  display: inline-block;
  border: 1px solid #EEEEEE;
  background: transparent no-repeat top 23px center;
  font-size: 13px;
  text-align: center;
}
.faq_icon_wrap button.active {
  background-color: #fff;
  border-color: #C9C9C9;
}
.search_wrap{
  position: relative;
  border: 1px solid #DDDDDD;
  border-radius: 4px;
  background: #F8F8F8;
  padding: 22px 22px;
  -webkit-border-radius: 4px;
}
.search_wrap input{
  width: 340px;
  margin-right: 8px;

  height: 40px;
  line-height: 40px;
  padding: 0 18px;

  background-color: #fff;
  font-size: 14px;
  box-sizing: border-box;
  border: 1px solid #DDD;

  vertical-align: middle;
}
.search_wrap .btn_col2{
  width: 86px;
  height: 38px;
  line-height: 34px;
  vertical-align: middle;

  display: inline-block;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #414141;
  font-size: 14px;
  color: #ffffff !important;
  text-align: center;

  background-color: #414141;

  margin-left: 20px;
}
.txt_help_wrap{
  float: right;
  border-left: 1px solid rgba(0, 0, 0, .27);
  padding: 0 25px;
  margin-left: 20px;
  font-size: 12px;
}
.txt_help_wrap p{
  color: #666666;
  margin-bottom: 10px;
  font-weight: 500;
}
.txt_help_wrap a{
  color: #000;
  text-decoration: underline;
  margin-right: 24px;
}
table{
  width: 100%;
  border-spacing: 0;
}
.tb_acc_wrap thead th{
  border-bottom-color: #BBBBBB;
  font-weight: bold;
}
.tb_acc_wrap th{
  position: relative;
  border-bottom: 1px solid #EEEEEE;
  padding: 15px 0;
  font-size: 15px;
  text-align: center;
  line-height: 24px;
}
.tb_acc_wrap td {
    position: relative;
    border-bottom: 1px solid #EEEEEE;
    padding: 15px 0;
    font-size: 15px;
    text-align: center;
    line-height: 24px;
}
.pagination{
  position: relative;
  margin-top: 45px;
  text-align: center;
}

.pagination ol{
  display: inline-block;
  margin: 0;
  vertical-align: middle;
}
.pagination li{
  float: left;
}
.strong_p{
    /* text-decoration: underline; */
    opacity: 1;
}
.strong_p{
  display: inline-block;
  width: 16px;
  height: 17px;
  line-height: 17px;
  padding: 0 5px;
  font-size: 15px;
  color: #000;
  /* opacity: .6; */
  vertical-align: middle;
}
.nomal_p{
  display: inline-block;
  width: 16px;
  height: 17px;
  line-height: 17px;
  padding: 0 5px;
  font-size: 15px;
  color: #000;
  opacity: .6;
  vertical-align: middle;
}
.test_raido{
  margin: 20px auto;
  margin-left: 10px;
  font-weight: 600;
}
.test_raido input{
  margin-right: 1px;
  cursor: pointer;
}
.text_box{
  display: flex;
  width: 190px;
  height: 40px;
}
</style>
