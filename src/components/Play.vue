<template>
  <div>
    <nav :class="{'navbar':isActive, 'navbar-light':command<=3, 'navbar-dark':command>3}">
      <li
        v-if="command===1"
        class="navbar-brand navbar-collapse navbar-nav bg-danger"
      >ON YOUR MARKS!</li>
      <li
        v-else-if="command===2"
        class="navbar-brand navbar-collapse navbar-nav bg-warning"
      >GET SET!</li>
      <li v-else-if="command===3" class="navbar-brand navbar-collapse navbar-nav bg-success">GO!</li>
      <li v-else class="navbar-brand navbar-collapse navbar-nav bg-dark">AM TouchTyper</li>
    </nav>

    <!-- <div class="inputWrapper">
      <h1 v-if="command===1" class="background1">ON YOUR MARKS!</h1>
      <h1 v-else-if="command===2" class="background2">GET SET!</h1>
      <h1 v-else-if="command===3" class="background3">GO!</h1>
    </div>-->
    <router-link style="border-radius:100%" class="btn btn-primary" to="/"><-</router-link>
    <div align="right">
      <button
        @click.prevent="refreshPage()"
        align="right"
        class="btn btn-primary"
        style="border-radius:100%"
      >Try again</button>
      <router-link to="/settings">settings</router-link>
    </div>

    <div align="center">
      <div v-if="typingcontents" class="centerbox container">
        <h6>wpm:{{cpm | cpmToWpm}}</h6>
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
import "bootstrap/dist/js/bootstrap";
import "jquery";
import "popper.js";
export default {
  data() {
    return {
      isActive: true,
      command: 1,
      tempword: null,
      typingcontents: null,
      finished: "",
      currentunfinished: "",
      currentfinished: null,
      currenterror: "",
      currentword: null,
      unfinished: null,
      disableInput: true,
      wordstyped: 0,
      timeelapsed: 0,
      startTimer: 0,
      paragraphs: ["hi hello bye.", "hello hi bye."],
      maxlimit: null
    };
  },
  watch: {
    tempword() {
      var words = this.unfinished.split(" ");
      var word = words[0];
      var self = this;
      // console.log(this.tempword);
      if (
        this.tempword === "" &&
        this.currentunfinished === "" &&
        this.currenterror === ""
      ) {
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
          if (pos > chars.length - 1) break;
          this.currenterror += chars[pos];
          flag = 1;
        }
        pos++;
      }
      while (pos < chars.length) {
        this.currentunfinished += chars[pos++];
      }
      if (this.currentunfinished === "" && this.currenterror === "") {
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
    },
    refreshPage() {
      location.reload();
    }
  },
  created() {
    this.typingcontents =
      this.paragraphs[Math.floor(Math.random() * this.paragraphs.length)] + " ";
    this.unfinished = this.typingcontents;
    var self = this;
    this.tempword = "";
    this.maxlimit = this.typingcontents.length / 3;
    this.startTimer = setInterval(function() {
      self.command++;
      if (self.command >= 3) {
        self.disableInput = false;
        self.Focus("tempword");
        self.timeelapsed += 1;
        //set min limit
        if (self.timeelapsed > this.maxlimit) {
          //gameover
          self.timeelapsed = 0;
          self.typingcontents = null;
          clearInterval(self.startTimer);
        }
      }
    }, 1000);
  },
  computed: {
    characterstyped() {
      if (this.finished != null && this.currentfinished != null)
        return this.finished.length + this.currentfinished.length;

      return 0;
    },
    cpm() {
      if (this.timeelapsed == 0) {
        return 0;
      }
      return Math.round((this.characterstyped * 60) / this.timeelapsed);
    }
  },
  filters: {
    cpmToWpm(input) {
      return Math.round(input / 5);
    }
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
  border-radius: 25px;
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