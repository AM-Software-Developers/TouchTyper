<template>
  <div >
    <div align="center">
      <div class="centerbox">
        <h1>AM TouchTyper</h1>
        <router-link tag="button" to="/play" class="btn btn-primary btn-danger">Start Typing</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "jquery";
import "popper.js";
export default {};
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
</style>