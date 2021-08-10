import React, {Component} from "react";
import Web3 from "web3";
import Library from "../abis/Email.json"; 

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
var fileList = [];
var fileHashes = [];

class Main extends Component {

    // * OK
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    // ? OK
    constructor(props) {
        super(props);
        this.to = React.createRef();
        this.theme = React.createRef();
        this.text = React.createRef();

        this.state = {
            account: '',
            contract: null,
            fileHash: null,
            letterCount: 0,
            letters: [[]]
        };
    }

    // ? OK
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
        } else {
            window.alert('Smart contract is not deployed to detected network!');
        }
    }

    // ? OK
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else {
            window.alert("Use Metamask!");
        }
    }

    // ? OK
    onSubmit = (event) => {
      event.preventDefault();
      // * Store a letter in bc
      const letterTo = this.to.current.value;
      const letterTheme = this.theme.current.value;
      const letterText = this.text.current.value;
      this.state.contract.methods.sendMessage(letterTo, letterTheme, letterText, fileHashes).send({ from: this.state.account });
      console.log("Submitted!");
  }

    // * OK
    captureFiles = (event) => {
      event.preventDefault();
      fileList = [];
      // * Process file for IPFS send
      const files = event.target.files;
      console.log(files);
      [].forEach.call(files, function(file) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = function() {
          fileList.push(Buffer(reader.result));
        }
      });
    }
    
    // * OK
    // ! IPFS EXAMPLE
    // ! `https://ipfs.infura.io/ipfs/fileHash`
    onSubmitFiles = (event) => {
      event.preventDefault();
      console.log("Submitted!");
      console.log(fileList);
      // ! IPFS
      fileList.map((file) => {
        ipfs.add(file, (error, result) => {
          console.log("IPFS RESULT: ", result);
          const fileHash = result[0].hash;
          fileHashes.push(fileHash);
          if (error) {
            console.error(error);
            return;
          }
        })
      })
    }

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
                <div className="row">
                  <main role="main" className="col-lg-12 d-flex text-center">
                    <div className="content mr-auto ml-auto">
                      <h2>Send a new letter</h2>
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <input placeholder="To" ref={this.to} id="toAddress" type="text"/>
                          <input placeholder="Theme" ref={this.theme} id="theme" type="text"/>
                          <input placeholder="Text" ref={this.text} id="letterText" type="text"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </form>
                      <form onSubmit={this.onSubmitFiles}>
                          <div className="form-group">
                            <input id="name" type="file" multiple onChange={this.captureFiles}/>
                          </div>
                          <button type="submit" className="btn btn-success">Add</button>
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