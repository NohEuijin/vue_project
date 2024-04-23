<script>
/*
Vue 2

useStore() 훅을 컴포넌트 바깥에서 사용할 수 없다.
=>대신에 this.$store를 사용하여 접근

useRouter() 훅을 직접 사용할 수 없다.
=>대신에 this.$router를 사용하여 접근
*/
  export default{
    data(){
      return{
        show1 : false,
        // admin join info
        name : "",
        company : "",
        email : "",
        password : "",
        role:"",


        // password : ref([
        //   (v) => !!v || '비밀번호는 필수입니다',
        //   (v) => (v && v.length <= 10) || '비밀번호는 10자 미만이어야 합니다!'
        // ]),
        // firstRules : ref([
        //   (v) => !!v || '이름은 필수 항목입니다!']),
        // lastRules : ref([
        //   (v) => !!v || '성은 필수 항목입니다!']),
        // emailRules : ref([
        //   (v) => !!v || '이메일은 필수입니다!',
        //   (v) => /.+@.+\..+/.test(v) || '유효하지 않은 이메일 입니다!'
        // ]),
      }
    },
    methods:{
      async submitForm(){
        // 여기 validation
        const form = {
          name : this.name,
          company : this.company,
          password : this.password,
          email : this.email,
          username : this.email,
          role:4,
        }
        console.log(form);

        try{
          const registerRes = await this.$store.dispatch('register', form)
          console.log(registerRes)
          if(registerRes){
            this.$router.push({name:'index'})
            alert("최종 승인 후 사용이 가능 합니다!")
          }
      }catch(err){
        console.log(err)
      }
    }
    }
  }

</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <h3 class="text-h6 text-center mb-0">회원가입</h3>
    <router-link
    to="/admin/login"
    class="text-primary text-decoration-none">
    이미 계정이 있습니까?
  </router-link>
  </div>
  <v-form ref="form" lazy-validation action="/dashboards/analytical" class="mt-7 loginForm">
    <v-row class="my-0">
      <v-col cols="12" class="py-0">
        <div class="mb-6">
          <v-label>이름*</v-label>
          <v-text-field
            v-model="name"
            hide-details="auto"
            required
            variant="outlined"
            class="mt-2"
            color="primary"
            placeholder="Gildong"
          ></v-text-field>
        </div>
      </v-col>

    </v-row>
    <div class="mb-6">
      <v-label>회사명(부서명)</v-label>
      <v-text-field
      v-model="company"
      hide-details="auto"
      variant="outlined"
      class="mt-2"
      color="primary"
      placeholder="Demo Inc."></v-text-field>
    </div>
    <div class="mb-6">
      <v-label>이메일 주소(계정)*</v-label>
      <v-text-field
        v-model="email"
        placeholder="lotte@company.com"
        class="mt-2"
        required
        hide-details="auto"
        variant="outlined"
        color="primary"
      ></v-text-field>
    </div>
    <div class="mb-6">
      <v-label>비밀번호</v-label>
      <v-text-field
        v-model="password"
        placeholder="*********"
        required
        variant="outlined"
        color="primary"
        hide-details="auto"
        :type="show1 ? 'text' : 'password'"
        class="pwdInput mt-2"
      >
        <template v-slot:append>
          <v-btn
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

    <div class="d-sm-inline-flex align-center mt-2 mb-7 mb-sm-0 font-weight-bold">
      <h6 class="text-caption">가입 시
        <router-link
        to="/auth/register"
        class="text-primary link-hover font-weight-medium"
        >서비스 약관</router-link>및
        <router-link
        to="/auth/register"
        class="text-primary link-hover font-weight-medium"
        >개인 정보 보호 정책</router-link>에 동의 하게 됩니다.
      </h6>
    </div>
    <v-btn
    color="primary"
    block class="mt-4"
    variant="flat"
    size="large"
    @click="submitForm"
    >계정 만들기</v-btn>
  </v-form>
</template>
