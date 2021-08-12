import React, {Component} from "react";
import Web3 from "web3";
import Library from "../abis/Email.json"; 

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
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
    // ! IPFS EXAMPLE
    // ! `https://ipfs.infura.io/ipfs/fileHash`
    captureFiles = (event) => {
      event.preventDefault();
      // * Process file for IPFS send
      const files = event.target.files;
      console.log(files);
      [].forEach.call(files, function(file) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = function() {
          // ! IPFS 
          ipfs.add(Buffer(reader.result), (error, result) => {
            console.log("IPFS RESULT: ", result);
            const fileHash = result[0].hash;
            fileHashes.push(fileHash);
            if (error) {
              console.error(error);
              return;
            }
          });
        }
      });
    }

    render() {
      // document.getElementById('address').textContent = `${this.state.account}`;
        return (
        <div>
          <html>
            <head>
              <link href='https://fonts.googleapis.com/css?family=Lobster|Raleway' rel='stylesheet' type='text/css'/>
            </head>
            <body>
              <div className="header">
                New Message  
              </div>
              <div id="form" className="main-circle">
                <div className="writing">
                  &#9997;
                </div>
                <form id="message" onSubmit={this.onSubmit}>
                  <input ref={this.to} type="text" name="address" placeholder="Address" className="name"/><br></br>
                  <input ref={this.theme} type="text" name="theme" placeholder="Theme" className="e-mail"/><br></br>
                  <input ref={this.text} name="message" className="message" placeholder="Message"/><br></br>
                  <div className="file"><label></label><input type="file" multiple onChange={this.captureFiles}/></div><br></br>
                  <button className="button" type="submit">Send</button>
                </form>
              </div>
            </body>
          </html> 
        </div>
          );
    }
}
export default Main;