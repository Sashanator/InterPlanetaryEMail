import React, {Component} from "react";
import Web3 from "web3";
import Library from "../abis/Email.json"; 

class Main extends Component {

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    constructor(props) {
        super(props);
        this.addressFrom = React.createRef();

        this.state = {
            account: '',
            address: '',
            contract: null,
            letters: [[]]
        };
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        const networkId = await web3.eth.net.getId();
        const networkData = Library.networks[networkId];
        if (networkData) {
            // * Fetch contract
            const contract = new web3.eth.Contract(Library.abi, networkData.address);
            this.setState({ contract });
            const letters = await contract.methods.getReceivedMessagesFromAddress().call({ from: this.state.account });
            this.setState({ letters }); 
        } else {
            window.alert('Smart contract is not deployed to detected network!');
        }
    }
    
    async componentDidMount() {
        const letters = await this.state.contract.methods.getReceivedMessagesFromAddress(this.state.address).call({ from: this.state.account });
        this.setState({ letters });
    }

    async componentDidUpdate() {
        const letters = await this.state.contract.methods.getReceivedMessagesFromAddress(this.state.address).call({ from: this.state.account });
        this.setState({ letters });
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else {
            window.alert("Use Metamask!");
        }
    }

    onSubmit = (event) => {
      event.preventDefault();
      const address = this.addressFrom.current.value;
      if (address.length > 0) {
        this.setState({ address });
      } else {
        window.alert("Enter address!");
      }
    }

    // TODO: Fix --> Everything!
    render() {
        return (
            <div>
              <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <ul className="navbar-nav px-3">
                  <li className="nav-item text-nowrap d-none d-sm-none d-sm-block"> 
                    <small className="text-white">{this.state.account}</small>
                  </li>
                </ul>
              </nav>
              <div className="container-fluid mt-5">
              <main role="main" className="col-lg-12 d-flex text-center">
                    <div className="content mr-auto ml-auto">
                        <form id="form-address" onSubmit={this.onSubmit}>
                            <input ref={this.addressFrom} type="text" placeholder="Enter address" id="addressFrom"/>
                            <button className="btn btn-danger" type="submit">Find</button>
                        </form>  
                      <h2>From this address letters:</h2>
                      <div className="form-group">
                        <table className="table table-boarded">
                          <tr>
                            <th>ID</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Theme</th>
                            <th>Text</th>
                            <th>IPFS</th>
                          </tr>
                          {this.state.letters.map((letter) => (
                            <tr>
                              <td>{letter[0]}</td>
                              <td>{letter[1]}</td>
                              <td>{letter[2]}</td>
                              <td>{letter[3]}</td>
                              <td>{letter[4]}</td>
                              {
                                letter.length > 0 &&
                                <td><ul>{letter[5].map((f) => <li><a href={`https://ipfs.infura.io/ipfs/${f}`}>FILE</a></li>)}</ul></td>
                              }
                            </tr>
                          ))}
                        </table>
                      </div>
                    </div>
                  </main>
              </div>
            </div>
          );
    }
}
export default Main;