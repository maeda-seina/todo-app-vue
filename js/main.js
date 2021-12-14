const appdata = {
  data () {
    return {
      newItem: '',
      editIndex: -1,
      todos: []
    }
  },
  mounted () {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  },
  methods: {
    setItems () {
      if (this.editStatus) {
        const editItem = {
          title: this.newItem,
          isDone: false
        }
        this.todos.splice(this.editIndex, 1, editItem)
        localStorage.setItem('todos', JSON.stringify(this.todos))
      } else {
        const item = {
          title: this.newItem,
          isDone: false
        }
        this.todos.push(item)
        localStorage.setItem('todos', JSON.stringify(this.todos))
        this.newItem = ''
      }
      this.cancel()
    },
    deleteItem (index) {
      if (confirm('Are you sure?')) {
        this.todos.splice(index, 1)
        localStorage.setItem('todos', JSON.stringify(this.todos))
      }
    },
    clearDeleteTask () {
      if (!confirm('Delete finished?')) {
        return;
      }
      this.todos = this.remaining
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    edit (index) {
      this.editIndex = index
      this.newItem = this.todos[index].title
    },
    cancel () {
      this.newItem = ""
      this.editIndex = -1
    },
    checked () {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }

  },
  computed: {
    remaining () {
      return this.todos.filter(function (todo) {
        return !todo.isDone
      })
    },
    changeButtonText () {
      return this.editStatus ? 'Update' : 'Add'
    },
    editStatus () {
      return this.editIndex !== -1
    },
    numberOfTasksRemaining () {
      return `(${this.remaining.length}/${this.todos.length})`
    }
  }
}
const app = Vue.createApp(appdata)
app.mount('#app')
