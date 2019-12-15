<template>
  <div>
    <div class="inputWrapper">
      <h1 v-if="command===1" class="background1">ON YOUR MARKS!</h1>
      <h1 v-else-if="command===2" class="background2">GET SET!</h1>
      <h1 v-else-if="command===3" class="background3">GO!</h1>
      <!-- <h1 v-else></h1> -->
    </div>
    <div align="center">
      <div v-if="typingcontents" class="centerbox">
        <h6>wpm:{{wpm}}</h6>
        <span>{{finished}}</span>
        <span>{{currentfinished}}</span>
        <span>{{currenterror}}</span>
        <span class="blinking-cursor">|</span>
        <span>{{currentfinishedafter}}</span>
        <span>
          <u>{{currentunfinished}}</u>
        </span>
        <span>{{unfinished}}</span>
        <br />
        <input type="text" id="tempword" v-model="tempword" :disabled="disableInput" />
        <p>{{tempword}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      command: 1,
      tempword: null,
      typingcontents: null,
      finished: null,
      currentunfinished: null,
      currentfinished: null,
      currenterror: null,
      unfinished: null,
      wpm: 0,
      disableInput: true
    };
  },
  watch: {
    tempword() {}
  },
  methods: {
    Focus(location) {
      document.getElementById(location).focus();
    }
  },
  created() {
    this.typingcontents = "something to type";
    this.unfinished = this.typingcontents;
    var self = this;
    setInterval(function() {
      self.command++;
      if (self.command >= 3) {
        self.disableInput = false;
        self.Focus("tempword");
        clearInterval();
      }
    }, 1000);
  }
};
</script>

<style scoped>
.inputWrapper {
  display: inline-block;
  width: 100%;
  text-align: center;
  color: aliceblue;
}
.blinking-cursor {
  font-weight: 100;
  font-size: 30px;
  color: #2e3d48;
  -webkit-animation: 1s blink step-end infinite;
  -moz-animation: 1s blink step-end infinite;
  -ms-animation: 1s blink step-end infinite;
  -o-animation: 1s blink step-end infinite;
  animation: 1s blink step-end infinite;
}
.centerbox {
  display: inline-block;
  width: 50%;
  height: 40%;
  background-color: #000;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 100px;
  overflow: auto;
}
.background1 {
  background-color: #dc3545;
  color: black;
}
.background2 {
  color: black;
  background-color: #ffff00;
}
.background3 {
  color: black;
  background-color: #39ff14;
}
</style>