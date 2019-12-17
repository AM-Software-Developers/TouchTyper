<template>
  <div>
    <div class="inputWrapper">
      <h1 v-if="command===1" class="background1">ON YOUR MARKS!</h1>
      <h1 v-else-if="command===2" class="background2">GET SET!</h1>
      <h1 v-else-if="command===3" class="background3">GO!</h1>
    </div>
    <p>{{command}}</p>
    <router-link style="border-radius:100%" class="btn btn-primary" to="/"><-</router-link>
    <div align="center">
      <div v-if="typingcontents" class="centerbox">
        <h6>wpm:{{wpm}}</h6>
        <h6>cpm:{{cpm}}</h6>
        <span class="finished">{{finished}}</span>
        <span class="currentfinished">
          <u>{{currentfinished}}</u>
        </span>
        <span class="currenterror">
          <u>{{currenterror}}</u>
        </span>
        <span class="currentunfinished">
          <u>{{currentunfinished}}</u>
        </span>
        <span class="unfinished">{{unfinished}}</span>
        <br />
        <input type="text" id="tempword" v-model="tempword" :disabled="disableInput" />
        <p>{{tempword}}</p>
      </div>
      <div v-else class="centerbox">BETTER LUCK NEXT TIME</div>
    </div>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "jquery";
import "popper.js";
export default {
  data() {
    return {
      command: 1,
      tempword: null,
      typingcontents: null,
      finished: "",
      currentunfinished: null,
      currentfinished: null,
      currentfinishedafter: null,
      currenterror: null,
      currentword: null,
      unfinished: null,
      disableInput: true,
      wordstyped: 0,
      timeelapsed: 0,
      startTimer: 0,
      characterstyped:0,
    };
  },
  watch: {
    tempword() {
      var words = this.unfinished.split(" ");
      var word = words[0];
      var self = this;
      // console.log(this.tempword);
      if (this.tempword === "") {
        this.currentunfinished = word + " ";
        this.currentword = word + " ";
        this.unfinished = this.unfinished.replace(word + " ", "");
        return;
      }
      // console.log(this.currentword);
      var chars = this.currentword.split("");
      var curchars = this.tempword.split("");
      var pos = 0;
      this.currentfinished = "";
      this.currenterror = "";
      this.currentunfinished = "";
      var flag = 0;
      while (pos < curchars.length) {
        if (curchars[pos] === chars[pos] && flag == 0) {
          this.currentfinished += curchars[pos];
        } else {
          this.currenterror += chars[pos];
          flag = 1;
        }
        pos++;
      }
      while (pos < chars.length) {
        this.currentunfinished += chars[pos++];
      }
      if (this.currentunfinished === "") {
        this.tempword = "";
        this.finished += this.currentfinished;
        this.wordstyped += 1;
        this.currentfinished = "";
      }
      if (this.unfinished === "" && this.currentunfinished === "") {
        this.wpm = "You Win!";
        clearInterval(this.startTimer);
      }
    }
  },
  methods: {
    Focus(location) {
      document.getElementById(location).focus();
    }
  },
  created() {
    this.typingcontents = "something to type. ";
    this.unfinished = this.typingcontents;
    var self = this;
    this.tempword = "";
    this.startTimer = setInterval(function() {
      self.command++;
      if (self.command >= 3) {
        self.disableInput = false;
        self.Focus("tempword");
        self.timeelapsed+=1;
        if(self.timeelapsed>10){//set min limit
          //gameover
          self.timeelapsed=0;
          self.typingcontents=null;
          clearInterval(self.startTimer)
        }
      }
    }, 1000);
  },
  computed: {
    wpm(){
      if(this.timeelapsed==0){
        return 0;
      }
      return (this.wordstyped * 60)/this.timeelapsed;
    },
    cpm(){
      if(this.timeelapsed==0){
        return 0;
      }
      return (this.characterstyped * 60)/this.timeelapsed;
    }
    
  },
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
.finished {
  color: #39ff14;
}
.currentfinished {
  color: #39ff14;
}
.currenterror {
  color: red;
  background-color: pink;
}
</style>