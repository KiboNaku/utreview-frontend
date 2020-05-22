import React from 'react';

class TodoItem extends React.Component { 
      
    render() {
        const styles = {
            fontSize: 20,
            color: "#0914A3"
        }
        const checkboxStyle = {
            backgroundColor: "#eee",
            height: "25px",
            width: "25px"
        }

    return (
        <div>
            <input type ="checkbox" style = {checkboxStyle} checked = {this.props.todo.completed}
            onChange = {() => 
                this.props.handleChange(this.props.todo.id)
            }/>
            <label style={styles}> {this.props.todo.item} </label>
        </div>
        );
    }
  
}

export default TodoItem;