import React , {Component} from 'react';
import SideNav from '../../layouts/ChairSideBar';
import logo from '../../images/logo.png';

class programChairHome extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        return(
            <div className="container-fluid">
                <div className="jumbotron">
                    <div className="image">
                        <img className="img" src={logo}/>
                    </div>
                    <br/>
                    <h1 className=" head mr-5">CUCMS</h1>
                </div>
            <SideNav/>
            </div>
        )
    }
}

export default programChairHome;