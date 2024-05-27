<template>

  <div class="ma-12 main-text-div">
     <input v-model="myInput" />
     <button @click="$emit('resolve', myInput)">Submit</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.main-text-div{
  display: grid;
  border: 1px solid black;
  border-radius: 4px;
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.main-text-div input{
  border: 1px solid black;
  border-radius: 4px;

  text-indent: 10px;
  line-height: 10px;
}
.main-text-div button{
  border: 1px solid black;
  border-radius: 4px;

  width: 50px;
  height: 20px;
}
</style>
