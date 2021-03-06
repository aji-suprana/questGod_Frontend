import React, {Component} from 'react';

class AddNewProduct extends Component{
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeProductType = this.onChangeProductType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            productType: '',
            userEmail: '',
            userToken: '',
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem('userData')) {
            let userData = JSON.parse(sessionStorage.getItem('userData'));
            this.setState({
                userEmail: userData.email,
                userToken: userData.token,
            });
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeProductType(e) {
        this.setState({
            productType: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const obj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.userToken
            },
            body: JSON.stringify({
                name: this.state.name,
                productType: this.state.productType,
            }),
        };

        console.log(obj);

        fetch('http://localhost:8080/restapi_0/products', obj)
            .then( response => {
                return response.json()
            })
            .then( data => {
                console.log(data);
            })
    }

    render() {
        return (
            <div className="col-6 offset-3">
                <h3 className="mt-3 text-center" style={{ fontSize: '2.5em' }}>Add New Product</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            required
                            />
                    </div>

                    <div className="form-group">
                        <label>Product Type</label>
                        <select
                            className="form-control"
                            value={this.state.productType}
                            onChange={this.onChangeProductType}
                            required
                            >
                            
                            <option value=""> -- Select Product Type -- </option>
                            <option value="Game">Game</option>
                            <option value="TwitchProduct">TwitchProduct</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-success"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddNewProduct;