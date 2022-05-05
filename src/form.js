import React ,{Component} from "react";

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {payload:{lastname:"", firstname:""}, image:[]}
        this.submitForm = this.submitForm.bind(this)
        this.handleChange= this.handleChange.bind(this)
        this.change = this.change.bind(this)

    }
    handleChange(e){
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value

        this.setState({payload:{...this.state.payload, [name] : value}})

    }
submitForm(e){
    e.preventDefault()
    alert(this.state.payload.firstname)
    this.setState({payload:{lastname:"", firstname:""}})
    


}

change(e){
    this.setState({image:[...e.target.files]})
    console.log(this.image)
}
    render(){
        return(<div><form onSubmit={this.submitForm}>
            <input placeholder="firstname" name="firstname" value={this.state.payload.firstname} onChange={this.handleChange}/>
            <input placeholder="lastname" name="lastname" value={this.state.payload.lastname} onChange={this.handleChange}/>
            <input multiple type="file" accept="image/*"  onChange={this.change}/>
            <button type="submit">submit</button>
            
            </form></div>)
    }

}
export default Form
