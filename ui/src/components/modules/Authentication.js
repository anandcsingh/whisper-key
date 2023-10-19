import {
    PublicKey,
    PrivateKey,
    Field,
} from 'snarkyjs'

const Authentication = {
    contractAddress: 'B62qkDQqHBkiL6bXWh2RU81C1fBLQqQVK3CMVmW7DAq1yiAg2QPRtdC',
    loggedIn: false,
    zkClient: null,
    authentication: null,
    hasWallet: null,
    hasBeenSetup: false,
    accountExists: false,
    currentNum: null,
    publicKey: null,
    zkappPublicKey: null,
    creatingTransaction: false,
    snarkyLoaded: false,
    showRequestingAccount: false,
    showCreateWallet: false,
    fundAccount: false,
    showLoadingContracts: false,
    contractsLoaded: false,
    contractsLoader: null,
    bjjAddClient: null,
    bjjAddAddress: 'B62qkDQqHBkiL6bXWh2RU81C1fBLQqQVK3CMVmW7DAq1yiAg2QPRtdC',
    setBjjAddClient: function (client) {
        this.bjjAddClient = client;
    },
    bjjPromoteClient: null,
    bjjPromoteAddress: 'B62qkDQqHBkiL6bXWh2RU81C1fBLQqQVK3CMVmW7DAq1yiAg2QPRtdC',
    setBjjPromoteClient: function (client) {
        this.bjjPromoteClient = client;
    },
    setZkClient: function (client) {
        this.zkClient = client;
    },
    setContractsLoader: function (loader) {
        this.contractsLoader = loader;
    },
    getContractsFromLoader: function () {
        return this.contractsLoader.contracts;
    },
    loadSnarky: async function () {
        await this.zkClient.loadSnarkyJS();
        await this.zkClient.setActiveInstanceToBerkeley();
        this.snarkyLoaded = true;
        return true;
    },
    checkForWallet: async function () {
        const mina = window.mina;
        this.hasWallet = mina != null;
        return this.hasWallet;
    },
    login: async function () {
        try {
            const mina = window.mina;
            this.address = (await mina.requestAccounts())[0];
            this.loggedIn = true;
            console.log("logged in: ", this.address);
            return {
                success: true
            };
        } catch (e) {

            this.loggedIn = false;
            var result = {
                success: false
            };
            if (e.message == "user reject") {
                result.error = e.message;
                result.message = "You cancelled connection with Mina wallet!";
            }
            else if (e.message == "please create or restore wallet first") {
                result.error = e.message;
                result.message = "Please create or restore a wallet first!";
            }
            return result;
        }
    },
    doesAccountExist: async function () {
        const publicKey = PublicKey.fromBase58(this.address);
        const res = await this.zkClient.fetchAccount({ publicKey: publicKey });
        console.log("does account exist", res);
        this.fundAccount = res.error != null;
        return !this.fundAccount;
    },
    setupContracts: async function () {
        // this.zkClient.loadContract()
        // .then(this.zkClient.compileContract())
        // .then(() => {
        //     const zkappPublicKey = PublicKey.fromBase58('B62qnQpnwWNr7b9sbEtdQVdf8Ckprm9WGmHfk7Cum2ZLL69HaiM9R5B');
        //     this.zkClient.initZkappInstance(zkappPublicKey);
        //     console.log("initialized zkapp instance");
        //     this.contractsLoaded = true;
        // })
        // this.hasBeenSetup = true;
        // return true;

        await this.zkClient.loadContract();
        console.log("loaded AllMaWorkerEventsClient contract");
        await this.zkClient.compileContract();
        console.log("compiled AllMaWorkerEventsClient contract");
        const zkappPublicKey = PublicKey.fromBase58(this.contractAddress);
        await this.zkClient.initZkappInstance(zkappPublicKey);
        console.log("initialized AllMaWorkerEventsClient zkapp instance");
        console.log("contract address", this.contractAddress);

        // await this.bjjPromoteClient.loadContract();
        // console.log("loaded bjjPromoteClient contract");
        // await this.bjjPromoteClient.compileContract();
        // console.log("compiled bjjPromoteClient contract");
        // const zkappPublicKey1 = PublicKey.fromBase58(this.bjjPromoteAddress);
        // await this.bjjPromoteClient.initZkappInstance(zkappPublicKey1);
        // console.log("initialized bjjPromoteClient zkapp instance");

        //this.contractsLoader.loadAll();
        this.hasBeenSetup = true;
        return true;

    },
    setupBjjAddContracts: async function () {
        await this.bjjAddClient.loadContract();
        console.log("loaded bjjAddClient contract");
        await this.bjjAddClient.compileContract();
        console.log("compiled bjjAddClient contract");
        const zkappPublicKey = PublicKey.fromBase58(this.bjjAddAddress);
        await this.bjjAddClient.initZkappInstance(zkappPublicKey);
        console.log("initialized bjjAddClient zkapp instance");
        return true;
    },
    setupBjjPromoteContracts: async function () {
        
        await this.bjjPromoteClient.loadContract();
        console.log("loaded bjjPromoteClient contract");
        await this.bjjPromoteClient.compileContract();
        console.log("compiled bjjPromoteClient contract");
        const zkappPublicKey1 = PublicKey.fromBase58(this.bjjPromoteAddress);
        await this.bjjPromoteClient.initZkappInstance(zkappPublicKey1);
        console.log("initialized bjjPromoteClient zkapp instance");
        this.hasBeenSetup = true;

        //this.contractsLoader.loadAll();
        //this.hasBeenSetup = true;
        return true;

    },
    fetchZkappAccount: async function() {
        await this.zkClient.fetchAccount({ publicKey: this.contractAddress });
    },
    getNum: async function () {
        if (this.hasBeenSetup) {
            //const zkappPublicKey = PublicKey.fromBase58('B62qqEme9EYMj3KC4vSXij2vAwt8qxLiKLsrHPprQeYXXmjTFUH16wF');
            await this.zkClient.fetchAccount({ publicKey: this.contractAddress })

            const currentNum = await this.zkClient.getNum();
            console.log('current state:', currentNum.toString());
        }
        else {
            console.log("has not been setup");
        }
    },
    address: '',
    getShortAddress: function () {
        return this.address.substring(0, 5) + "..." + this.address.substring(this.address.length - 5, this.address.length);
    }
}

export default Authentication;