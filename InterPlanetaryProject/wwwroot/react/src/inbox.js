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
        this.to = React.createRef();
        this.theme = React.createRef();
        this.text = React.createRef();

        this.state = {
            account: '',
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
            const letters = await contract.methods.getReceivedMessages().call({ from: this.state.account });
            this.setState({ letters }); 
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

    // TODO: Fix --> Return only main components!
    render() {
        return (
            <div className="table-users">
              <div className="header">Letters</div>
              <table cellspacing="0">
                          <tr>
                            <th>Theme</th>
                            <th>Text</th>
                            <th>IPFS</th>
                            <th>From</th>
                          </tr>
                          {this.state.letters.map((letter) => (
                            <tr>
                              <td>{letter[3]}</td>
                              <td>{letter[4]}</td>
                              {
                                letter.length > 0 &&
                                <td><ul>{letter[5].map((f) => <li><a href={`https://ipfs.infura.io/ipfs/${f}`}>FILE</a></li>)}</ul></td>
                              }
                              <td className="cell expand-maximum-on-hover">{letter[1]}</td>
                            </tr>
                          ))}
                        </table>
            </div>
          );
    }
}
export default Main;