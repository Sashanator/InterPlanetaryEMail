import React, {Component} from "react";
import Web3 from "web3";
import Library from "../abis/Library.json";

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

class Main extends Component {

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            contract: null,
            buffer: null,
            hash: '"QmNk8tVygzgaCyYqnAU1ku66f3jcsm1fXaA9BJt1sn2WZo"'
        };
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        this.setState({ account: accounts[0] });
        const networkId = await web3.eth.net.getId();
        const networkData = Library.networks[networkId];
        if (networkData) {
            const contract = new web3.eth.Contract(Library.abi, networkData.address);
            this.setState({ contract });
            console.log(this.state.contract);
            const hash = await contract.methods.getHash().call();
            this.setState({ hash });
        } else {
            window.alert('Smart contract is not deployed to detected network!');
        }
    }
    
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else {
            window.alert("Use Metamask!");
        }
    }

    captureFile = (event) => {
        event.preventDefault();
        // * Process file for IPFS send
        const reader = new window.FileReader();
        const file = event.target.files[0];
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result) });
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted!");
        // ! IPFS
        ipfs.add(this.state.buffer, (error, result) => {
            console.log("IPFS result", result);
            const myHash = result[0].hash;
            this.setState({ hash: myHash });
            if (error) {
                console.error(error);
                return;
            }
            // * Store information in bc
            this.state.contract.methods.setHash(myHash).send({ from: this.state.account }).then(() => {
                this.setState({ hash: myHash });
            })
        })
    }

    render() {
        return (
            <div>
              <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a
                  className="navbar-brand col-sm-3 col-md-2 mr-0"
                  href="http://intership.space"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ssorin EMAIL Center
                </a>
                <ul className="navbar-nav px-3">
                  <li className="nav-item text-nowrap d-none d-sm-none d-sm-block"> 
                    <small className="text-white">{this.state.account}</small>
                  </li>
                </ul>
              </nav>
              <div className="container-fluid mt-5">
                <div className="row">
                  <main role="main" className="col-lg-12 d-flex text-center">
                    <div className="content mr-auto ml-auto">
                      <img width='200' height='250' src={`https://ipfs.infura.io/ipfs/${this.state.hash}`}/>
                      <p><small className="text-black">If you can't see image, then you can download file below</small></p>
                      <h2>Last user's file</h2>
                      <a className="btn btn-danger" href={`https://ipfs.infura.io/ipfs/${this.state.hash}`}>
                        Download
                      </a>
                      <p>&nbsp;</p>
                      <h2>Upload your file</h2>
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <input id="name" type="file" onChange={this.captureFile}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </form>
                    </div>
                  </main>
                </div>
              </div>
            </div>
          );
    }
}
export default Main;