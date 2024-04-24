<template>
  <div class="r_container">
  <!-- 글 시작 -->
  <div class="content-container">
      <div class="content-box">
          <div class="text-box">
              <div class="text-title-box">
                  <div class="text-title">
                    {{ freeBoard.title }}
                  </div>
              </div>
              <div class="info">
                  <div class="info-id">
                      <div>{{ freeBoard.user ? freeBoard.user.username : "Null" }}</div>
                  </div>
                  <div class="text-date">
                    {{ formatDate(freeBoard.updated_at) }}
                  </div>
              </div>
              <div class="content-text">
                  <p>
                    {{ freeBoard.content }}
                  </p>
              </div>
          </div>
      </div>
    <div class="btn-box">
        <div class="btns-box">
          <button type="button"
          @click="$router.push({name:'freeBoard'})"
          class="notice-btn">목록
          </button>
          <button
          v-if="freeBoard.user?.id === $store.state.meData.id"
          type="button"
          @click="$router.push({name:'modify',params:{id:freeBoard.id}})"
          class="update-btn">수정</button>
          <button
          v-if="freeBoard.user?.id === $store.state.meData.id"
          type="button"
          @click="deleteBoard()"
          class="remove-btn">삭제</button>
        </div>
    </div>
  </div>
  <!-- 글 끝 -->

  <!-- 댓글 시작 -->
  <div class="reply-container">
      <div class="reply-title">댓글</div>
      <div class="reply-input">
          <textarea
          v-model="content"
          name=""
          id=""
          placeholder="댓글을 입력해주세요"></textarea>
          <button
          @click="submitReplyForm"
          >등록</button>
      </div>
      <div class="reply-list">
        <!-- 댓글 list 시작 -->
          <div
          v-for="(reply, replyIdx) of replyList" :key="replyIdx"
          class="reply">
              <div class="id-and-date">
                  <div class="reply-info">
                      <div class="reply-id">
                        {{ reply.user ? reply.user.username : 'null' }}
                      </div>
                  </div>
                  <div class="reply-date">
                    {{ formatTimeAgo(reply.updated_at) }}
                  </div>
              </div>
              <div class="reply-content-n-btns">
                  <div
                  v-if="editing !== reply.id"
                  class="reply-content">
                      {{ reply.content }}
                  </div>
                  <div v-else>
                  <textarea
                  v-model="reply.content"
                  class="reply_edit_box">
                  </textarea>
                  </div>
                  <div class="reply-btns"
                  v-if="reply.user.id === $store.state.meData.id">
                      <button
                      v-if="editing !== reply.id"
                      @click="editReply(reply.id)"
                      type="button"
                      class="update-reply">
                      수정
                    </button>
                      <button
                      v-else
                      @click="saveReply(reply)"
                      class="save-reply">
                      저장
                    </button>
                      <button
                      v-if="editing !== reply.id"
                      @click="deleteReply(reply)"
                      type="button"
                      class="delete-reply">
                      삭제
                      </button>
                      <button
                      v-else
                      @click="editing = null"
                      class="cancel-reply">
                      취소
                    </button>
                  </div>
                  <div v-else>

                  </div>
              </div>
          </div>
          <!-- 댓글 list 끝 -->
      </div>
  </div>
  <!-- 댓글 끝 -->
</div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';

const store = useStore();
const router = useRouter();
const route = useRoute();
const freeBoard = ref('');

// store.state.meData 에서 userId를 가지고오고 체크
const userId = computed(() => store.state.meData);
console.log(userId.value.id)


onMounted(async () => {
  await getFreeBoard();
  await increaseViewCount();
  await getReplys()
});

// 글 상세 내용 가져옴.
async function getFreeBoard(){
  try{
    const res =
      await store.dispatch('freeBoardDetail', {id:route.params.id});
      console.log(res)
    freeBoard.value = res.freeBoards[0];
  }catch(err){
    console.log(err)
  }
}

/**조회수 증가(day 기준)
{getLastViewedDate} 게시물 마지막 조회 일자, 로컬스토리지에서 가져옴
{setLastViewedDate} 게시물의 마지막 조회 일자, 로컬 스토리지에 저장
{isNextDay} 다음 일자인지 확인
{increaseViewCount} 조회수 증가
: 마지막 조회가 없거나 현재 일자와 마지막 조회 일자가 다른 경우, 조회수 증가
{increaseViewCount} 조회수 증가
@author 노의진

*/
function getLastViewedDate() {
  return localStorage.getItem(`lastViewedDate_${route.params.id}_${userId.value.id}`);
}
function setLastViewedDate(date) {
  localStorage.setItem(`lastViewedDate_${route.params.id}_${userId.value.id}`, date);
}
function isNextDay(lastViewedDate) {
  const currentDate = new Date().toISOString().split('T')[0];
  // 현재 일자
  return lastViewedDate !== currentDate;
  // 마지막 조회 일자와 현재 일자가 다르면 다음 일자이므로 true 반환
}
async function increaseViewCount() {
  try {
    const lastViewedDate = getLastViewedDate();

    if (!lastViewedDate || isNextDay(lastViewedDate)) {
      await store.dispatch('modifyFreeBoard', { id: route.params.id, viewcount: ++freeBoard.value.viewcount });
      setLastViewedDate(new Date().toISOString().split('T')[0]);
      // 현재 일자를 저장
    }
  } catch(err) {
    console.error(err);
  }
}

// 글 삭제
async function deleteBoard() {
  const confirmResult = confirm("게시글을 삭제 하시겠습니까?");
  if(confirmResult){
      try {
      await store.dispatch('deleteFreeBoard', { id: freeBoard.value.id });
      router.push({ name: 'freeBoard' });
    } catch (err) {
      console.log(err);
    }
  }
  return;
}

/**댓글
 {getReplys} 댓글리스트
 {submitReplyForm} 댓글저장
@author 노의진
*/
let replyList = ref([]);
const content = ref('');

async function getReplys(){
  await store.dispatch('replyList',{freeBoard_id:freeBoard.value.id})
  .then((res)=>{
    console.log(res)
      replyList.value = res.replies;
    }
  )
  .catch((err)=>{
    console.error(err)
  })
}

const submitReplyForm = async () =>{
  const form = {
    user_id : userId.value.id,
    freeBoardId : freeBoard.value.id,
    content : content.value,
  }
  // 댓글 유효성 검사
  if(!content.value || content.value.trim() === ''){
    alert("댓글을 입력 해주세요!!")
    return;
  }
  if (!userId.value.id || userId.value.id.trim() ==='') {
    const confirmResult = confirm("로그인이 필요한 서비스 입니다! 로그인 페이지로 이동 하시겠습니까?");
    if (confirmResult) {
      router.push('/login');
    }
    return;
  }
  // 댓글 저장 - 갱신 - 폼 초기화
  await store.dispatch('createReply',form)
  {
  getReplys();
  content.value = '';
  editing.value = null;
  }
}

//댓글 수정
//수정 상태 댓글 id 저장
let editing = ref(null);

// 수정 버튼 클릭 시, 해당 댓글 ID 저장(수정 상태로 전환)
const editReply = (replyId) => {
  editing.value = replyId;
  console.log(replyId)
}

// 저장 버튼 클릭 시, 해당 댓글의 내용 저장(수정 상태 해제)
const saveReply = async (reply) => {
  const form = {
    id: reply.id,
    content: reply.content,
  };
    try {
        await store.dispatch('modifyReply', form);
        console.log(form)
        getReplys();
         // 수정 상태 해제
        editing.value = null;
    } catch (err) {
        console.error(err);
    }
}

// 댓글 삭제 (확인 후)
async function deleteReply(reply){
  const confirmResult = confirm("댓글을 삭제 하시겠습니까?");
  if(confirmResult){
      try{
      await store.dispatch('deleteReply', { id: reply.id });
      getReplys();
      editing.value = null;
    }catch(err){
      console.error(err)
    }
  }
  return
}

// 날짜 변경 format
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 댓글 시간 form
const formatTimeAgo = (dateTime) => {
  const currentDate = new Date();
  const pastDate = new Date(dateTime);
  const timeDifference = currentDate.getTime() - pastDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
      return '방금 전';
  } else if (secondsDifference < 3600) {
      return Math.floor(secondsDifference / 60) + '분 전';
  } else if (secondsDifference < 86400) {
      return Math.floor(secondsDifference / 3600) + '시간 전';
  } else if (secondsDifference < 2592000) {
      return Math.floor(secondsDifference / 86400) + '일 전';
  } else if (secondsDifference < 31536000) {
      return Math.floor(secondsDifference / 2592000) + '달 전';
  } else {
      return Math.floor(secondsDifference / 31536000) + '년 전';
  }
}
</script>

<style>
.r_container{
  min-width: 1024px;
  width: 1024px;
  margin: 0 auto;
}
.content-container{
    width: 100%;
    height: auto;

    box-sizing: border-box;
    padding: 10px;

    margin-top: 30px;
}
.content-box{
    width: 100%;
    height: 500px;

    display: flex;
}
.text-box{
    width: 100%;
    height: 100%;

    box-sizing: border-box;
    padding: 5px;
}
.text-title-box{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #E4E4E4;
}
.text-title{
    display: flex;
    align-items: end;

    box-sizing: border-box;
    padding: 15px 20px;

    font-size: 22px;
    font-family: 'TAEBAEKmilkyway';
    font-weight: bolder;
}
.info{
    width: 100%;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 13px;

    border-bottom: 1px solid #E4E4E4;
}
.info-id{
    width: 200px;
    height: 100%;
    margin-left: 20px;

    display: flex;
    align-items: center;
}
.content-text{
  margin-top: 30px;
  padding: 20px;
}
.text-date{
    width: 150px;
    height: 100%;

    font-size: 13px;

    display: flex;
    align-items: center;
    justify-content: center;

}
.content-text p{
    /* white-space: pre-wrap; */
    height: auto;

    white-space:pre;
}

.btn-box{
    width: 100%;
    height: 100px;
}
.btns-box{
    display: flex;
    justify-content: end;
    align-items: center;

    cursor: pointer;

    color: white;
}

.notice-btn, .update-btn, .remove-btn{
    width: 60px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 13px;
    margin: 0 3px;

    border-radius: 10px;
    background-color: #414141;
}
.reply-container{
    width: 100%;
    height: auto;
}
.reply-title{
    width: 100%;
    height: 60px;
    font-size: 20px;
    font-weight: bold;
    box-sizing: border-box;
    padding: 10px;
    margin: 30px 0 15px 0;
    display: flex;
    align-items: end;
}
.reply-input{
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.reply-input textarea{
    width: 98%;
    height: 98%;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid #E4E4E4;
    resize: none;
}
.reply-input button{
    width: 70px;
    height: 25px;
    position: absolute;
    right: 30px;
    bottom: 20px;
    border-radius: 15px;
    border: none;
    background-color: #414141;
  color: #FFF;
    cursor: pointer;
}
.reply-list{
    width: 100%;
    height: auto;
    margin: 30px 0;
}
.reply{
    width: 100%;
    height: auto;
    border-bottom: 1px solid #E4E4E4;
    box-sizing: border-box;
    padding: 5px 10px;
}
.id-and-date{
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
}
.reply-info{
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
}
.reply-img{
    width: 20px;
    height: 20px;
    border-radius: 70%;
}
.reply-img img{
    width: 100%;
    height: 100%;
    border-radius: 70%;
}
.reply-id{
    margin: 0 5px;
    font-size: 12px;
    font-weight: bold;
}
.reply-date{
    width: 80px;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;
}
.reply-content-n-btns{
    width: 100%;
    height: 36px;

    display: flex;
    align-items: end;
}
.reply-content{
    width: 90%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-size: 15px;
}
.reply-btns{
    width: 10%;
    height: 40px;

    display: flex;
    justify-content: end;

    font-size: 12px;
}
.update-reply, .save-reply, .delete-reply, .cancel-reply{
    width: 45px;
    height: 20px;
    margin: 0 3px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 20px;
    background-color: #414141;
    color: #FFF;
    cursor: pointer;
}

/* 리플 수정 삭제 등 */
.reply-content-n-btns div{
  width: 100%;
  height: auto;

}
.reply_edit_box{
  width: 800px;
  height: 27px;
  resize: none;
  box-sizing: border-box;
  /* padding: 2px; */
  border-radius: 10px;
  border: 2px solid #E4E4E4;
  font-size: 15px;
  /* margin-left: 10px; */
  text-indent: 8px;
}
</style>
