<template>
<div class="admin">
  <h1>The Admin Page!</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add a Customer</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="firstName" placeholder="firstName">
        <input v-model="lastName" placeholder="lastName">
        <div class="radio">
        <form class="gender form">
          <div>
            -Gender
          </div>
          <input type="radio" id="male" name="gender" value="Male">
          <label for="male">Male</label><br>
          <input type="radio" id="female" name="gender" value="Female">
          <label for="female">Female</label><br>
          <input type="radio" id="other" name="gender" value="Other">
          <label for="other">Other</label>
        </form>
        <form class="membership form">
          <div>
            -Membership
          </div>
          <input type="radio" id="basic" name="membership" value="Basic">
          <label for="basic">Basic</label><br>
          <input type="radio" id="fit" name="membership" value="Fit">
          <label for="fit">Fit</label><br>
          <input type="radio" id="pro" name="membership" value="Pro">
          <label for="pro">Pro</label>
        </form>
        </div>
        <input v-model="part" placeholder="workoutPart">
        <input type="number" v-model="age" placeholder="age">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <img :src="addItem.path" />
      </div>
    </div>
     <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete a Customer</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findFirstName" placeholder="Search FirstName">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.firstName}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.firstName">
        <input v-model="findItem.lastName">
        <div class="radio">
        <form class="gender form">
          <div>
            -Gender
          </div>
          <input type="radio" id="maleEdit" name="gender" value="Male">
          <label for="male">Male</label><br>
          <input type="radio" id="femaleEdit" name="gender" value="Female">
          <label for="female">Female</label><br>
          <input type="radio" id="otherEdit" name="gender" value="Other">
          <label for="other">Other</label>
        </form>
        <form class="membership form">
          <div>
            -Membership
          </div>
          <input type="radio" id="basicEdit" name="membership" value="Basic">
          <label for="basic">Basic</label><br>
          <input type="radio" id="fitEdit" name="membership" value="Fit">
          <label for="fit">Fit</label><br>
          <input type="radio" id="proEdit" name="membership" value="Pro">
          <label for="pro">Pro</label>
        </form>
        </div>
        <input v-model="findItem.part" placeholder="workoutPart">
        <input type="number" v-model="findItem.age" placeholder="age">
        <p></p>
        <img :src="findItem.path" />
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
        <button @click="editItem(findItem)">Edit</button>
      </div>
    </div>
</div>

</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
   data() {
    return {
      firstName: "",
      lastName: "",
      gender: "",
      membership: "",
      part: "",
      age: "",
      file: null,
      addItem: null,
      items: [],
      findFirstName: "",
      findItem: null,
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.firstName.toLowerCase().startsWith(this.findFirstName.toLowerCase()));
      return items.sort((a, b) => a.firstName > b.firstName);
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      var genderRadio;
      if (document.getElementById('male').checked) {
        genderRadio = document.getElementById('male').value;
      } else if (document.getElementById('female').checked) {
        genderRadio = document.getElementById('female').value;
      } else if (document.getElementById('other').checked) {
        genderRadio = document.getElementById('other').value;
      }
      var membershipRadio;
      if (document.getElementById('basic').checked) {
        membershipRadio = document.getElementById('basic').value;
      } else if (document.getElementById('fit').checked) {
        membershipRadio = document.getElementById('fit').value;
      } else if (document.getElementById('pro').checked) {
        membershipRadio = document.getElementById('pro').value;
      }
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          path: r1.data.path,
          firstName: this.firstName,
          lastName: this.lastName,
          gender: genderRadio,
          membership: membershipRadio,
          part: this.part,
          age: this.age,
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findFirstName = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      var genderEditRadio;
      if (document.getElementById('maleEdit').checked) {
        genderEditRadio = document.getElementById('maleEdit').value;
      } else if (document.getElementById('femaleEdit').checked) {
        genderEditRadio = document.getElementById('femaleEdit').value;
      } else if (document.getElementById('otherEdit').checked) {
        genderEditRadio = document.getElementById('otherEdit').value;
      }
      var memberEditshipRadio;
      if (document.getElementById('basicEdit').checked) {
        memberEditshipRadio = document.getElementById('basicEdit').value;
      } else if (document.getElementById('fitEdit').checked) {
        memberEditshipRadio = document.getElementById('fitEdit').value;
      } else if (document.getElementById('proEdit').checked) {
        memberEditshipRadio = document.getElementById('proEdit').value;
      }
      try {
        await axios.put("/api/items/" + item._id, {
          firstName: this.findItem.firstName,
          lastName: this.findItem.lastName,
          gender: genderEditRadio,
          membership: memberEditshipRadio,
          part: this.findItem.part,
          age: this.findItem.age,
        });
        console.log(genderEditRadio);
        console.log(memberEditshipRadio);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
  display:block;
}

.gender,
.membership {
  width:40%;
}

.radio {
  display:flex;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>