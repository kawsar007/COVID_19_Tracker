import React, { Component } from 'react';
import Icon from './icon';

class Count extends Component {
    static defaultProps = {
        options: [
            "angry",
            "anchor",
            "archive",
            "at",
            "archway",
            "baby",
            "bell",
            "bolt",
            "bone",
            "car",
            "city",
            "cloud",
            "couch"
        ]
    }
    state = { 
        icons: ["car", "bolt"]
     }

    // iconeChange = () => {
    //     let idx = Math.floor(Math.random() * this.props.options.length);
    //     let newIcon = this.props.options[idx];
    //     let icons = this.state.icons;
    //     icons.push(newIcon);
    //     this.setState({icons: icons});

    // }

    iconeChange = () => {
        let newIcon = this.props.options[Math.floor(Math.random() * this.props.options.length)];
        this.setState({
           icons: [...this.state.icons, newIcon]
        })
    }



    render() { 
        // const icons = this.state.icons.map(i => <i className={`fa fa-${i}`}/> )
        return ( 
            <div>
                {/* <i className={`Die fa fa-${this.state.icons}`}/> */}
                <Icon item = {this.state.icons}/>
                {/* <h2>Icons: {icons}</h2> */}
                <h3>Total Score:{this.state.score}</h3>
                <button onClick={this.iconeChange}>Click Here</button>
            </div>
         );
    }
}
 
export default Count;