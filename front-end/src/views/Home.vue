<template>
<div class="home">
  <div class="experience">
    EXPERIENCE TEAM TRAINING OUR PREMIUM <p>BOUTIQUE STYLE CLASSES</p>
  </div>
  <!-- <img src="/Users/seungjaemoon/cs260/creative4project/data/workout.jpg" alt=""> -->
  <div class="workoutImg">
      <img class="workout" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-649768690-1555623400.jpg?resize=768:*" alt="">
  </div>
  
  <div class="button">
    <p class="price">$9.99 For all membership</p>
    <button><router-link to="/Login">Join</router-link></button>
  </div>
</div>
</template>

<script>
// import axios from 'axios';
export default {

}
</script>

<style scoped>
div.content{
  background-color: grey !important;
}

  .experience
  {
    text-align: center;
    background-color: grey;
    
  }
  .experience p
  {
    color: red;
  }
  .workoutImg
  {
    text-align: center;
  }
  .button
  {
    text-align: center;
  }
  button
  {
    background-color: red;
    color: white;
    height: 60px;
    width: 240px;
    font-size: 40px;
  }


   @media only screen and (max-width: 968px) 
  {
    img.workout{
      width: 550px;
    }

  }

    @media only screen and (max-width: 752px) 
  {
    img.workout{
      width: 350px;
    }

  }

  @media only screen and (max-width: 550px)
  {
    img.workout{
      width:200px;
    }
    div.experience{
      font-size: 15px;
    }
  }
