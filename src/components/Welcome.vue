<template>
  <div >
    <div align="center">
      <div class="centerbox typewriter">
        <h1>AM TouchTyper</h1>
        <router-link v-shortkey="['ctrl', 'alt', 'o']" @shortkey.native="theAction()" tag="button" to="/play" class="btn btn-primary btn-danger">Start Typing</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "jquery";
import "popper.js";
export default {
  methods: {
    play(){
      this.$route.push('/play')
    },
    theAction(){
      this.$router.push('/play');
    }
  },
};
</script>

<style scoped>
.centerbox {
  border-radius: 25px;
  background-color: black;
  color:aliceblue;
  margin: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  overflow: auto;
  height:50%;
  padding: 4%;
}
button{
  position:fixed;
  top: 50%;
  left:50%;
  transform: translate(-50%, -50%);
}
.typewriter h1 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .20em; /*Adjust as needed*/
  animation: 
    typing 3.5s steps(26, end),
    blink-caret .75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}
</style>