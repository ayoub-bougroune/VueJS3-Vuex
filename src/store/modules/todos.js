import axios from 'axios';

const state = {
    todos: []
  };
  
  const getters = {
    allTodos: state => state.todos
  };
const actions = {
   async fetchTodos({ commit }) {
    try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    commit('setTodos' ,response.data);
  }
    catch (err) {
    console.error(err);
   }
},

  async addTodo({ commit }, title) {
    try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/todos",{title, completed: false});
    commit('newTodo', response.data);
    }
     catch (err) {
       console.log(err)
    }
},
 
  async deleteTodo({ commit }, id) {
   try{
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit('removeTodo', id);
    console.log("success");
   }
   catch (err) { console.log(err)}
},
  async filterTodos({ commit }, e) {
    try{
      const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
      commit('setTodos' ,response.data);
      console.log("success");
    }
    catch (err) { console.log(err)}
  },

   async updateTodos({ commit }, updTodo) {
     try{
     const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`, updTodo);     
     commit('updateTodo' , response.data);     
     console.log("success");
      }
     catch (err) { console.log(err)}
   },
  }
  const mutations = {
    setTodos: (state, todos) => (state.todos = todos) ,
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => (state.todos = state.todos.filter(todo => todo.id !== id)),
    updateTodo: (state, updTodo) => {
      const index = state.todos.findIndex(todo => todo.id === updTodo.id);
      if (index !== -1) {
        state.todos.splice(index, 1, updTodo);
      }
    }
};

export default { state, getters, mutations, actions}