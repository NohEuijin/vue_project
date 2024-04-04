<template>
  <div class="r_container">
  <!-- 글 시작 -->
  <div class="content-container">
    <form action="" method="" id="freeBoard-write-form">
      <div class="content-box">
          <div class="text-box">
              <div class="text-title-box">
                  <div class="text-title">
                    <input
                    v-model="title"
                    type="text"
                    placeholder="제목">
                  </div>
              </div>
              <div class="content-text">
                  <textarea
                  v-model="content"
                  class="">
                내용을 입력해 주세요
                  </textarea>
              </div>
          </div>
      </div>
    <div class="btn-box">
        <div class="btns-box">
            <div class="update-btn"
            @click="submitFreeBoardForm">
            등록
           </div>
            <div
            @click="$router.push({name:'freeBoard'})"
            class="cancel-btn">취소</div>
        </div>
    </div>
  </form>
  </div>
  <!-- 글 끝 -->

</div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup(){
    const store = useStore();
    const router = useRouter();

    const title = ref('');
    const content = ref('');

    // computed 속성으로 username 정의
    const username = computed(() => store.state.meData);
    console.log( store.state.meData)

    const submitFreeBoardForm = async () =>{
      const form = {
        title : title.value,
        content : content.value,
        userId: username.value.id
      }
      console.log(form)

      if(!title.value || title.value.trim() === '' ){
        alert("제목을 입력 해주세요!!")
        return;
      }
      if(!content.value || content.value.trim() === ''){
        alert("내용을 입력 해주세요!!")
        return;
      }

      await store.dispatch('createFreeBoard',form).then((res) =>{
        console.log(res);
        router.push({ name : 'freeBoard' })
      })
    }

    return{
      title,
      content,
      username,
      submitFreeBoardForm,
    }
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

    margin: 70px auto;

    /* background-color: pink; */
}
.content-box{
    width: 100%;
    height: 400px;

    margin-top: 40px;

    display: flex;
    /* background-color: paleturquoise; */
}
.text-box{
    width: 100%;
    height: 100%;

    box-sizing: border-box;
    padding: 5px;
}
.text-box h1{
  font-size: 30px;
}
.text-title-box{
    width: 100%;
    height: 50px;
    /* background-color: blueviolet; */
    display: flex;
    justify-content: space-between;
    /* border-bottom: 1px solid #E4E4E4; */

    padding: 0 10px;
}
.text-title{
  width: 100%;
  height: 50px;


}
.text-title input{
  width: 100%;
  height: 50px;

  display: flex;
  align-items: end;

  box-sizing: border-box;
  padding: 15px 5px;

  font-size: 22px;
  font-family: 'TAEBAEKmilkyway';
  font-weight: bolder;

  /* border :3px solid #f6f6f6; */
  border-radius: 4px;
}
.text-box hr{
  margin: 20px auto;
  border: 0.5px solid #f6f6f6;
}

.content-text{
  margin: 20px auto;
  height: auto;
}
.content-text textarea{
  width: 100%;
  height: 430px;
  padding: 20px;

  border: 3px solid #f6f6f6;
  border-radius: 4px;

  resize: none;
}

.btn-box{
    width: 100%;
    height: 30px;
    /* background-color: yellow; */
}
.btns-box{
  margin: 150px auto;
  display: flex;
  justify-content: end;
  align-items: center;

  cursor: pointer;

  color: white;
}
.update-btn, .cancel-btn{
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

</style>
