<template>
  <div class="hello">
    <form>
      <input type="text" style="display:none" />
      <input v-model="currentTask" type="text" />
      <input type="button" value="추가" @click="taskCreate">
    </form>
    <table align="center" border="0">
      <tr>
        <th>완료</th>
        <th>작업</th>
        <th>삭제</th>
      </tr>
      <tr v-for="(task, index) in tasks" :key="task.id">
        <td><input type="checkbox" v-model="task.done" @change="taskUpdate(task.id, task.name, task.done)" /></td>
        <td><input type="text" v-model="task.name" @change="taskUpdate(task.id, task.name, task.done)" /></td>
        <td><input type="button" value="삭제" @click="taskDelete(task.id, index)" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data: () => ({
    currentTask: "",
    tasks:[],
  }),

  created: async function () {
    try {
      const result = await axios.get("/task/");
      this.tasks = result.data;
    } catch (error) {
      alert(JSON.stringify(error));
    }
  },
  
  methods: {
    taskCreate: async function () {
      try {
        const result = await axios.post('/task/', {name: this.currentTask});
        this.tasks.push(result.data);
        this.currentTask = '';
      } catch (error) {
        alert(JSON.stringify(error));
      }
    },
    taskUpdate: async function(id, val, done) {
      try {
        await axios.put("/task/"+id, {name: val, done: done});
        this.currentTask = "";
      } catch (error) {
        alert(JSON.stringify(error));
      }
    },
    taskDelete: async function(id, index) {
      try {
        await axios.delete("/task/"+id);
        this.currentTask = "";
        this.tasks.splice(index, 1);
      } catch (error) {
        alert(JSON.stringify(error));
      }
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
