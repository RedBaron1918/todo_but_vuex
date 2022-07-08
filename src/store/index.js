import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    todos:[]
  },
  getters: {
    alltodos(state){
      return state.todos
    }
  },
  mutations: {
    COMMIT_TODO(state,todo){
      state.todos = todo
    },
    ADD_TODO(state,todo){
      state.todos.unshift(todo)
    },
    DELETE_TODO(state,id){
      state.todos = state.todos.filter(todo => todo.id !== id)
    },
    UPDATE_TODO(state,upt){
      const index = state.todos.findIndex(todo =>todo.id === upt.id)
      if(index !== -1){
        state.todos.splice(index,1,upt)
      }
    }

  },
  actions: {
    async Todos({commit}){
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      console.log(data)
      commit('COMMIT_TODO',data)
    },
    async addTodo({commit},title){
      const res = await axios.post('http://localhost:5000/tasks',{title, completed:false})
      commit('ADD_TODO',res.data)
    },
    async deleteTodo({commit},id){
      await axios.delete(`http://localhost:5000/tasks/${id}`)
      commit('DELETE_TODO',id)
    },
    async updateTodo({commit},todo){
      const res = await axios.put(`http://localhost:5000/tasks/${todo.id}`,todo)
      commit('UPDATE_TODO',res.data)
    }
  },
  modules: {
  }
})
