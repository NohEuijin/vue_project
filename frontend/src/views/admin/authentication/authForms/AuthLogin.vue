<script>
  export default{
    data(){
      return{
        identifier : '',
        password : '',
        saveId : false,
        show1 : false,
        SAVEADMINTOKEN : 'admin_save_token',
      }
    },
    created() {
    this.saveChange();
  },
    methods:{
      async loginAdmin(){
        try{
          await this.$store.dispatch('login',{
            identifier : this.identifier,
            password : this.password,
          })
          .then((res)=>{

            console.log(res)

            if(res.role.id === "3"){
              this.saveIdinCookie();
              this.$router.push({name:'dashboard'})
            }else{
              console.log("관리자 승인 후 이용해 주세요!")
            }
          })
        }catch(err){
          console.log(err)
        }
      },
      saveIdinCookie(){
        if(this.saveId){
          localStorage.setItem(this.SAVEADMINTOKEN, this.identifier)
        }else{
          localStorage.removeItem(this.SAVEADMINTOKEN)
        }
      },
      saveChange(){
        const loginId = localStorage.getItem(this.SAVEADMINTOKEN)
        if(loginId){
          this.identifier = loginId,
          this.saveId = true
        }
      }
    }

  }
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h6 text-center mb-0">로그인</h3>
    <router-link
    to="/admin/register"
    class="text-primary text-decoration-none">
    계정이 없나요?
  </router-link>
  </div>
  <v-form class="mt-7">
    <div class="mb-6">
      <v-label>이메일 주소</v-label>
      <v-text-field
        v-model="identifier"
        aria-label="email address"
        class="mt-2"
        required
        hide-details="auto"
        variant="outlined"
        color="primary"
      ></v-text-field>
    </div>
    <div>
      <v-label>비밀번호</v-label>
      <v-text-field
        v-model="password"
        aria-label="password"
        required
        variant="outlined"
        color="primary"
        hide-details="auto"
        :type="show1 ? 'text' : 'password'"
        class="pwdInput mt-2"
      >
      <template v-slot:append>
          <v-btn
          class="pa-0"
          color="secondary"
          icon rounded
          variant="text"
          @click="show1 = !show1">
            <v-icon>
              {{ show1 ? 'mdi-eye' : 'mdi-eye-off' }}
            </v-icon>
        </v-btn>
        </template>
      </v-text-field>
    </div>

    <div class="d-flex align-center mt-4 mb-7 mb-sm-0">
      <v-checkbox
        v-model="saveId"
        label="아이디 저장"
        required
        color="primary"
        class="ms-n2"
        hide-details
      ></v-checkbox>
      <div class="ml-auto">
        <!-- <router-link
        to="/auth/login"
        class="text-darkText link-hover">
          비밀번호 찾기
        </router-link> -->
      </div>
    </div>
    <v-btn
    @click="loginAdmin"
    color="primary"
    block
    class="mt-5"
    variant="flat"
    size="large"
    type="button">
      로그인
    </v-btn>
    <div class="mt-2">
      <!-- <v-alert color="error">

      </v-alert> -->
    </div>
  </v-form>
</template>
