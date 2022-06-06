<template>
<div>
  <header>
    <img src="./assets/icon-left-groupomania-white.png" alt="groupomania">
  </header>
  <router-view/>
  <footer>
    <img src="./assets/icon-left-groupomania-white.png" alt="groupomania">
    <div>
      <span>© 2022 Copyright : Groupomania</span>
      <a href="mailto:admin@corpo.com">Contact</a>
    </div>
  </footer>
</div>
</template>

<style lang="scss">

body{
  margin: 0%;
  padding: 0%;
  width: 100%;
  text-align: center;
}

header{
  background-color: #4E5166;
  padding: 1% 0%;
  margin-bottom: 1%;
}
footer{
  background-color: #4E5166;
  padding: 1% 0%;
  margin-top: 1%;
  img{
    width: 20%;
  }
  div{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
    font-weight: bold;
    a{
      text-decoration: none;
      color: white;
      padding:0.5%;
      border-radius: 20px;
    }
    a:hover{
      color: #2c3e50;
      background-color: white;
      padding:0.5%;
      border-radius: 20px;
    }
  }
}

</style>
