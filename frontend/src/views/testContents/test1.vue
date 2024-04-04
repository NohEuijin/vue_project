<template>
  <div class="mt-12 pt-12"> 테스트1이야</div>
  <div>되는거야?</div>
</template>

<script>
export default {
  created(){
    console.log(this.$router.currentRoute.value.name)
  }

}
</script>

<style>

</style>
