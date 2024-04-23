<template>
  <div>
    <button @click="$router.push({name:'dashboard'})" aria-label="logo">
      <div class="admin_logo">
        <img class="admin_small_icon" src="https://www.lotte.co.kr/common/m/img/img_ci_01.png" alt="">
        <img class="admin_medle_icon"  src="https://www.lotte.co.kr/upload/backup/upload_images/1459299335800.jpg" alt="">
      </div>

    </button>

  </div>

</template>
<script>
</script>
<style>
.admin_logo{
  display: flex;
  text-align: start;
}
.admin_small_icon{
  width: 20px;
  height: 20px;
  margin-left: 9px;
}
.admin_medle_icon{
  width: 90px;
  height: 20px;
  margin-left: 25px;
}
</style>
