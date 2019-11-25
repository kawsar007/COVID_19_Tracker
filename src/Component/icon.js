import React, { Component } from 'react';

class Icon extends Component {
    state = {  }
    
    render() { 
        console.log(this.props)
        return ( 
            <div>
                {this.props.item.map((ite) => {
                    return <i className={`fa fa-${ite}`}/>
                })}
                
            </div>
         );
    }
}
 
export default Icon;