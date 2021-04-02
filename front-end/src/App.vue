<template>
<div id="app">
  <div class="header">

    <div class="title">
      <h1>Vasa Fitness</h1>
    </div>
  </div>
  <div class="menu">
    <router-link class="router-link" to="/">Home</router-link>
    <router-link class="router-link" to="/Membership">Membership</router-link>
    <router-link class="router-link" to="/admin">Admin</router-link>
    <router-link class="router-link" to="/account">Account</router-link>

  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <a class="github" href="https://github.com/JaeMoon94/creative4.git" target="_blank">gitHub link</a>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #2f2f2f;
  color: #fff;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
  padding-left: 10px;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* menu */
.menu {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #2f2f2f;
  font-size: 20px;
  text-decoration:none;
  color: white;
  border-top: 1px solid white;
  display: flex;
  justify-content: space-between;
}
.menu li {
  display: inline;
}

.router-link:link,
.router-link:visited,
a:visited {
  text-decoration: none;
  color: white;
}
a.github
{
  color: white;
  font-size: 20px;
}


.menu a {
  color: #000;
}



/* footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  font-size: 12px;
  background:#2f2f2f;
  color: #b5b829;
  text-decoration: none;
}

.footer:visited {
  color: #b5b829;
}
.footer a {
  text-decoration: none;
}
h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}

@media only screen and (max-width: 550px)
  {
   .menu
   {
     font-size: 15px;
   }
  }
@media only screen and (max-width: 480px)
  {
   .menu
   {
     font-size: 11px;
   }
  }
</style>
