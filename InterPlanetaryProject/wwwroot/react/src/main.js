import React, {Component} from "react";
import Web3 from "web3";
import Library from "../abis/Email.json"; 

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

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
            test: [],
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
            const letterCount = await contract.methods.getReceivedMessagesCount().call({ from: this.state.account });
            console.log("Count of letters for you: ", letterCount);
            this.setState({ letterCount });
            const letters = await contract.methods.getReceivedMessages().call({ from: this.state.account });
            this.setState({ letters }); 
            console.log("STATE", this.state.letters);
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

    // ! IPFS EXAMPLE
    // ! `https://ipfs.infura.io/ipfs/fileHash`

    // * OK
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

    // ? OK
    onSubmit = (event) => {
        event.preventDefault();
        // * Store a letter in bc
        const letterTo = this.to.current.value;
        const letterTheme = this.theme.current.value;
        const letterText = this.text.current.value;
        this.state.contract.methods.sendMessage(letterTo, letterTheme, letterText, this.state.fileHash).send({ from: this.state.account });
        console.log("Submitted!");
    }

    // * OK
    onSubmitFile = (event) => {
      event.preventDefault();
      console.log("Submitted!");
      // ! IPFS
      ipfs.add(this.state.buffer, (error, result) => {
          console.log("IPFS result", result);
          const fileHash = result[0].hash;
          this.setState({ fileHash });
          if (error) {
              console.error(error);
              return;
          }
      })
    }

    render() {
      // const divLetters = this.state.letters.map((lt) => <div key={lt[0]}>{lt.map((ltt) => <div>{ltt}</div>)}</div>);

      const divLetters2 = this.state.letters.map((lt) => {
        return (
          <p>{lt.map((ltt) => {
            return(
              <div>{ltt}</div>
            )
          })}
          </p>
        )
      })

        return (
            <div>
              <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a
                  className="navbar-brand col-sm-3 col-md-2 mr-0"
                  href="http://intership.space"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ssorin Email Center
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
                      <h2>Your letters:</h2>
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
                              <td><a href={`https://ipfs.infura.io/ipfs/${letter[5]}`}>FILE</a></td>
                            </tr>
                          ))}
                        </table>
                        {/* <p><label>ID: {this.state.letters[0][0]}</label></p>
                        <p><label>From: {this.state.letters[0][1]}</label></p>
                        <p><label>To: {this.state.letters[0][2]}</label></p>
                        <p><label>Theme: {this.state.letters[0][3]}</label></p>
                        <p><label>Text: {this.state.letters[0][4]}</label></p>
                        <p></p>
                        <a href={`https://ipfs.infura.io/ipfs/${this.state.letters[0][5]}`}>File</a> */}
                      </div>
                      <h2>Send a new letter</h2>
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <input placeholder="To" ref={this.to} id="toAddress" type="text"/>
                          <input placeholder="Theme" ref={this.theme} id="theme" type="text"/>
                          <input placeholder="Text" ref={this.text} id="letterText" type="text"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </form>
                      <form onSubmit={this.onSubmitFile}>
                          <div className="form-group">
                            <input id="name" type="file" onChange={this.captureFile}/>
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