<template>
  <div class="modal">
    <div class="modal-content">
      <div @click="$emit('ProfileImageComponentClose')" class="close-btn">&times;</div>
      <div class="profile-inside" v-for="(num, index) in this.imgNum" :key="index">
        <div class="small-profile-image-box">
          <img @click="editProfile(num), $emit('ProfileImageComponentClose')" class="small-profile-image" :src="`./../src/assets/account/${num}.png`">
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import { defineComponent } from "vue";
import { mapState, mapActions } from 'pinia'
import { useAccounts } from "@/stores/accounts";
import axios from 'axios'
import secosi from '@/api/secosi.js'

export default defineComponent ({
  name: 'passwordChangeView',
  data() {
    return {
      errors:[],
      userId: '',
      email: '',
      password: '',
      newPassword: '',
      newPasswordCheck: '',
      passwordChangePermission: false,
      imgNum: [...Array(16).keys()],
    }
  },
  computed: {
    ...mapState(useAccounts, ['currentUser']),
  },
  methods: {
    ...mapActions(useAccounts, ['fetchCurrentUser'])
  },
  created() {
  },
  setup() {
    const editProfile = function editProfile(imgNum) {
      const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      const context = {
        "aboutMe": this.currentUser.about_me,
        "profileImg": imgNum,
        "userEmail": this.currentUser.email,
        "userName": this.currentUser.name,
      }
      axios.patch(secosi.mypages.editProfile(this.currentUser.userId), context, config)
      .then(res => {
        this.fetchCurrentUser()
      })
      .catch(err => {
      })
    }

    const passwordChangeValid = function passwordChangeValid() {
      const valueCheck = this.password.length * this.newPassword.length
      if (valueCheck > 0 && this.passwordChangePermission) {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        const context = {
          "current_password": this.password,
          "new_password": this.newPassword,
        }
        axios.patch(secosi.mypages.passwordChange(), context, config)
        .then(res => {
          console.log(res)
        })
        this.password = ''
        this.newPassword = ''
        this.newPasswordCheck = ''
        this.$emit('ProfileImageComponentClose')
      }
    }

    const pwValid = function passwordValid() {
      const password = document.querySelector('.password-check')
      const pattern1 = /[0-9]/
	    const pattern2 = /[a-zA-Z]/
	    const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/
      if (!pattern1.test(this.password) || !pattern2.test(this.password) || !pattern3.test(this.password) || this.password.length < 8) {
        password.style.display = 'block'
        password.innerText = '비밀번호는 8자리 이상 문자, 숫자, 특수문자로 구성되어야 합니다'
        this.passwordChangePermission &&= false
      } else {
        password.style.display = 'none'
        this.passwordChangePermission ||= true
      }
    }
    const newPwValid = function newPasswordValid() {
      const newPassword = document.querySelector('.newPassword-check')
      const pattern1 = /[0-9]/
	    const pattern2 = /[a-zA-Z]/
	    const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/
      if (!pattern1.test(this.newPassword) || !pattern2.test(this.newPassword) || !pattern3.test(this.newPassword) || this.newPassword.length < 8) {
        newPassword.style.display = 'block'
        newPassword.innerText = '비밀번호는 8자리 이상 문자, 숫자, 특수문자로 구성되어야 합니다'
        this.passwordChangePermission &&= false
      } else {
        newPassword.style.display = 'none'
        this.passwordChangePermission ||= true
      }
    }
    const newPwCheckValid = function newPasswordCheckValid() {
      const newPasswordCheck = document.querySelector('.newPasswordCheck-check')
      if (this.newPassword === this.newPasswordCheck) {
        newPasswordCheck.style.display = 'none'
        this.passwordChangePermission ||= true
      } else {
        newPasswordCheck.style.display = 'block'
        newPasswordCheck.innerText = '비밀번호와 일치하지 않습니다'
        this.passwordChangePermission &&= false
      }
    }

    return{
      passwordChangeValid,
      pwValid,
      newPwValid,
      newPwCheckValid,
      editProfile,
    }
  }
})
</script>

<style scoped>

.profile-inside{

}
.profile-image
.small-profile-image {
  width: 90px;
  height: 90px;
  border: none;
}
.small-profile-image-box {
  width: 120px;
  height: 120px;
  border-radius: 70%;
  overflow: hidden;
  background: #BDBDBD;
  margin: 15px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-content: center;
  grid-row: span 3;
  border: none;
  border-color: #1B3C33;
}
.userId-check, .email-check, .password-check, .newPassword-check , .newPasswordCheck-check{
  font-size: 0.7rem;
  margin-top: 0.5rem;
  margin-bottom: 0rem;
  margin-left: 0.5rem;
  color: #f00e0e;
  top: 1.8rem;
  display: none;
}
.modal {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
}
.modal-content{
  max-width: 800px;
  background: #f4f4f4;
  margin: 10% auto;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  min-height: 500px;
  display: grid;
  /* grid-template-rows: 1fr; */
  padding: 30px;
  grid-template-columns: auto auto auto auto;
}
.close-btn {
  position: absolute;
  top: 2%;
  right: 3%;
  font-size: 1.5rem;
  cursor: pointer;
}
.modal-content-left {
  background: linear-gradient(90deg, black 0%, black 100%);
  border-radius: 0 3px 3px 0;
  position: relative;
}
#modal-img {
  width: 70%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-content-right {
  border-radius: 0 3px 3px 0;
  position: relative;
}
.modal-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 83%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal-form h1 {
  font-size: 1rem;
  text-align: start;
  font-size: 1.5rem;
  width: 80%;
  margin-bottom: 1rem;
}
.form-validation {
  margin-bottom: 0.5rem;
  width: 80%;
}
.modal-input {
  display: block;
  padding-left: 0.5rem;
  outline: none;
  border: none;
  height: 2rem;
  width: 100%;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.05);
}
.modal-input::placeholder{
  color: #b1b1b1;
}
.modal-input-btn {
  width: 80%;
  height: 2rem;
  background-color: #1B3C33;
  outline: none;
  border-radius: 2px;
  color: white;
  border: none;
  font-size: 1rem;
}
.modal-input-btn:hover {
  cursor:pointer;
  background-color: #fff;
  transition: all 0.4s ease-out;
  color: #1B3C33;
}
.modal-input-login {
  font-size: 0.8rem;
  margin-top: 1rem;
  color: var(--lightgray);
  width: 80%;
  text-align: center;
}
@media screen and (max-width: 820px) {
  .modal-content-left{
    display: none;
  }
  .modal-content {
    grid-template-columns: auto;
    margin: 15% auto;
    width: 70%;
    height: 75%;
  }
}
@media screen and (max-width: 600px) {
  .modal-content {
    margin: 20% auto;
    width: 90%;
    height: 80%;
    grid-template-columns: auto;
  }
}

</style>

