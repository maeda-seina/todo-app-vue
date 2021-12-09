(function () {

  'use strict';

  const vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      editIndex: -1,
      todos: []
    },
    watch: {
      todos: {
        handler: function () {
          localStorage.setItem('todos', JSON.stringify(this.todos))
        },
        deep: true
      }
    },
    mounted: function () {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      setItems: function () {
        if (this.editIndex === -1) {
          const item = {
            title: this.newItem,
            isDone: false
          }
          this.todos.push(item);
          this.newItem = '';
        } else {
          this.todos.splice(this.editIndex, 1, this.newItem)
        }
        this.cancel()
      },
      deleteItem: function (index) {
        if (confirm('are you sure?')) {
          this.todos.splice(index, 1)
        }
      },
      clearDeleteTask: function () {
        if (!confirm('delete finished?')){
          return;
        }
        this.todos = this.remaining
      },
      edit: function (index) {
        this.editIndex = index
        this.newItem = this.todos[index]
      },
      cancel: function () {
        this.newItem = ""
        this.editIndex = -1
      }
    },
    computed: {
      remaining: function () {
        return this.todos.filter(function (todo) {
          return !todo.isDone
        })
      },
      changeButtonText: function () {
        return this.editIndex === -1 ? 'Add' : 'Update'
      }
    }
  })
})();
