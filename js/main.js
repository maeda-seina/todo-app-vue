const appdata = {
  data () {
    return {
      newItem: '',
      editIndex: -1,
      todos: []
    }
  },
  watch: {
    todos: {
      handler: function () {
        localStorage.setItem('todos', JSON.stringify(this.todos))
      },
      deep: true
    }
  },
  mounted () {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  },
  methods: {
    setItems () {
      if (this.editIndex === -1) {
        const item = {
          title: this.newItem,
          isDone: false
        }
        this.todos.push(item)
        this.newItem = ''
      } else {
        const editItem = {
          title: this.newItem,
          isDone: false
        }
        this.todos.splice(this.editIndex, 1, editItem)
      }
      this.cancel()
    },
    deleteItem (index) {
      if (confirm('Are you sure?')) {
        this.todos.splice(index, 1)
      }
    },
    clearDeleteTask () {
      if (!confirm('Delete finished?')) {
        return;
      }
      this.todos = this.remaining
    },
    edit (index) {
      this.editIndex = index
      this.newItem = this.todos[index].title
    },
    cancel () {
      this.newItem = ""
      this.editIndex = -1
    }
  },
  computed: {
    remaining () {
      return this.todos.filter(function (todo) {
        return !todo.isDone
      })
    },
    changeButtonText () {
      return this.editIndex === -1 ? 'Add' : 'Update'
    }
  }
}
let app = Vue.createApp(appdata)
app.mount('#app')
