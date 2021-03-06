const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');
const INITIAL_STRING = "Hi there!";


let accounts;
let inbox;

beforeEach(async () => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();
    

    //use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode, arguments:[INITIAL_STRING] })
    .send({from: accounts[0], gas:'1000000'});

    inbox.setProvider(provider);
});

describe('Inbox', () =>{
    it('deploys a contract', () =>{
        //confirm there is an address generated for my deployed contract
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () =>{
        //check that the initial message was set correctly
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('can set messages', async () =>{
        //set the new message
        await inbox.methods.setMessage("new test message").send({from: accounts[0]});
        
        //confirm the message has changed
        const message = await inbox.methods.message().call();
        assert.equal(message, "new test message");
    });
    
});