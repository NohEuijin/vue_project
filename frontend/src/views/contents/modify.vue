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
                    v-model="freeBoard.title"
                    type="text"
                    placeholder="제목">
                  </div>
              </div>
              <div class="content-text">
                  <textarea
                  v-model=" freeBoard.content"
                  class="">
                  </textarea>
              </div>
          </div>
      </div>
    <div class="btn-box">
        <div class="btns-box">
            <div class="update-btn"
            @click="submitFreeBoardForm">
            수정
           </div>
            <div class="remove-btn"
            @click="$router.push({ name:'detail',params:{id:freeBoard.id} })"
            >취소</div>
        </div>
    </div>
  </form>
  </div>
  <!-- 글 끝 -->

</div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const freeBoard = ref({
      title: '',
      content: ''
    });

    //수정 form => modifyFreeBoard 와 연동
    const submitFreeBoardForm = async () => {
      const form = {
        id : freeBoard.value.id,
        title: freeBoard.value.title,
        content: freeBoard.value.content
      };

      try {
        await store.dispatch('modifyFreeBoard', form);
        router.push({ name: 'detail',params:{id:freeBoard.id} });
      } catch (err) {
        console.error(err);
      }
    };

    //freeBoardDetail 내용을 가져옴.
    onMounted(async () => {
      await getFreeBoard();
    });

    async function getFreeBoard() {
      try {
        const response = await store.dispatch('freeBoardDetail', { id: route.params.id });
        freeBoard.value = response.freeBoards[0];
      } catch (err) {
        console.log(err);
      }
    }

    return {
      freeBoard,
      submitFreeBoardForm
    };
  }
};
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
.update-btn, .remove-btn{
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
