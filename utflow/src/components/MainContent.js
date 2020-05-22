import React from 'react';
import TodoItem from './TodoItem'
import Joke from './Joke'
import todoListData from './Data'

class MainContent extends React.Component {
  constructor(){
    super();
    this.state = {
        todo: todoListData
    }
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleChange(id){
    this.setState(prevState => {
        const todoListComponents = prevState.todo.map(todo => {
            if(id === todo.id){
                console.log(todo)
                todo.completed = !todo.completed
                console.log(todo)
            }
            return todo
        })
        return {
            todo: todoListComponents
        }
            
    })   
  }
  
  render(){
    const todoListComponents = this.state.todo.map(todo => <TodoItem key = {todo.id} todo = {todo} handleChange = {this.handleChange}/> )
    return (
        <div>
          <div className="alert alert-success" role="alert"> Main </div>
            {todoListComponents}
        </div>
      );
  }
  
}

export default MainContent;