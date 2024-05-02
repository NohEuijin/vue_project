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
      limit: items_per_page.value,
      // limit: start_page.value * items_per_page.value,
      user_del:false,
      sortCondition: dataDesc.value === '최신' ? 'updated_at:desc' : (dataDesc.value === '조회' ? 'viewcount:desc' : 'id:asc')
    }
    // console.log(items_per_page.value)
    // searchText 값 존재 = form[search] 값 = 검색
    if(searchText.value){
      form["search"] = searchText.value
    }

    //리스트를 가지고와 총갯수와 리스트 값을 받음
    await store.dispatch('freeBoardList', form)
    .then((res) => {
      console.log(res);
      console.log(res.freeBoards[0])
      total_page.value = res.freeBoardsConnection.aggregate.count;
      freeBoardList.value = res.freeBoards;

      // username = null 인 회원 글 삭제
      //   for (const board of res.freeBoards) {
      //   if (!board.user || !board.user.username) {
      //     // console.log('User name is null:', board);
      //     deleteBoard(board);
      //   }
      // }
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
  // 글 삭제
  // async function deleteBoard(board) {
  //     try {
  //     await store.dispatch('deleteFreeBoard', { id: board.id});
  //     router.push({ name: 'freeBoard' });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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
        getFreeBoards();
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

</style>
