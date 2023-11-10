/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3454:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var _global_process, _global_process1;
module.exports = ((_global_process = __webpack_require__.g.process) == null ? void 0 : _global_process.env) && typeof ((_global_process1 = __webpack_require__.g.process) == null ? void 0 : _global_process1.env) === "object" ? __webpack_require__.g.process : __webpack_require__(7663);

//# sourceMappingURL=process.js.map

/***/ }),

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Wb: function() { return /* binding */ CredentialProxy; }
/* harmony export */ });
/* unused harmony exports DiscordBadgeEntity, DiscordBadgeContract */
/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9466);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_0__]);
o1js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
var __decorate = undefined && undefined.__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

class DiscordBadgeEntity extends (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .Struct */ .AU)({
    id: o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN,
    credentialType: o1js__WEBPACK_IMPORTED_MODULE_0__/* .CircuitString */ ._G,
    issuer: o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh,
    owner: o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh,
    BadgeName: o1js__WEBPACK_IMPORTED_MODULE_0__/* .CircuitString */ ._G,
    DiscordID: o1js__WEBPACK_IMPORTED_MODULE_0__/* .CircuitString */ ._G
}) {
    toPlainObject() {
        return {
            id: Number(this.id.toBigInt()),
            credentialType: this.credentialType.toString(),
            issuer: this.issuer.toBase58(),
            owner: this.owner.toBase58(),
            BadgeName: this.BadgeName.toString(),
            DiscordID: this.DiscordID.toString()
        };
    }
    static fromPlainObject(obj) {
        return new DiscordBadgeEntity({
            id: (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(obj.id),
            credentialType: o1js__WEBPACK_IMPORTED_MODULE_0__/* .CircuitString */ ._G.fromString(obj.credentialType),
            issuer: o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh.fromBase58(obj.issuer),
            owner: o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh.fromBase58(obj.owner),
            BadgeName: o1js__WEBPACK_IMPORTED_MODULE_0__/* .CircuitString */ ._G.fromString(obj.BadgeName),
            DiscordID: o1js__WEBPACK_IMPORTED_MODULE_0__/* .CircuitString */ ._G.fromString(obj.DiscordID)
        });
    }
    hash() {
        return o1js__WEBPACK_IMPORTED_MODULE_0__/* .Poseidon */ .jm.hash(this.id.toFields().concat(this.credentialType.toFields()).concat(this.issuer.toFields()).concat(this.owner.toFields()).concat(this.BadgeName.toFields()).concat(this.DiscordID.toFields()));
    }
}
class DiscordBadgeContract extends o1js__WEBPACK_IMPORTED_MODULE_0__/* .SmartContract */ .C3 {
    init() {
        super.init();
        this.mapRoot.set((0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(new o1js__WEBPACK_IMPORTED_MODULE_0__/* .MerkleMap */ .Ne().getRoot()));
    }
    setMapRoot(newRoot) {
        // only owners should do this
        this.mapRoot.getAndAssertEquals();
        this.mapRoot.set(newRoot);
    }
    issueCredential(owner, credential, witness, currentRoot) {
        this.mapRoot.getAndAssertEquals();
        this.mapRoot.assertEquals(currentRoot);
        this.sender.assertEquals(credential.issuer);
        credential.owner = owner;
        const hash = credential.hash();
        const [newRoot, _] = witness.computeRootAndKey(hash);
        this.mapRoot.set(newRoot);
    }
    constructor(){
        super(...arguments);
        this.mapRoot = (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .State */ .ZM)();
    }
}
__decorate([
    (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .state */ .SB)(o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN),
    __metadata("design:type", Object)
], DiscordBadgeContract.prototype, "mapRoot", void 0);
__decorate([
    o1js__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN
    ]),
    __metadata("design:returntype", void 0)
], DiscordBadgeContract.prototype, "setMapRoot", null);
__decorate([
    o1js__WEBPACK_IMPORTED_MODULE_0__/* .method */ .UD,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [
        o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh,
        DiscordBadgeEntity,
        o1js__WEBPACK_IMPORTED_MODULE_0__/* .MerkleMapWitness */ .FJ,
        o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN
    ]),
    __metadata("design:returntype", void 0)
], DiscordBadgeContract.prototype, "issueCredential", null);
class CredentialProxy {
    async getStorageRoot() {
        if (!this.useLocal) await (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .fetchAccount */ .$G)({
            publicKey: this.contractAddress
        });
        return this.zkApp.mapRoot.get();
    }
    async setStorageRoot(storageRoot, sender) {
        if (!this.useLocal) await (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .fetchAccount */ .$G)({
            publicKey: this.contractAddress
        });
        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__/* .Mina */ .No.transaction({
            sender
        }, ()=>{
            this.zkApp.setMapRoot(storageRoot);
        });
        return transaction;
    }
    async issueCredential(owner, credential, merkleStore) {
        if (!this.useLocal) await (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .fetchAccount */ .$G)({
            publicKey: this.contractAddress
        });
        //this.zkApp = new DiscordBadgeContract(this.contractAddress);
        const entity = DiscordBadgeEntity.fromPlainObject(credential);
        entity.id = (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(merkleStore.nextID);
        let hash = entity.hash();
        console.log("hash:", hash.toString());
        merkleStore.map.set(entity.id, hash);
        const witness = merkleStore.map.getWitness(entity.id);
        const transaction = await o1js__WEBPACK_IMPORTED_MODULE_0__/* .Mina */ .No.transaction({
            sender: entity.issuer
        }, ()=>{
            this.zkApp.issueCredential(owner, entity, witness, this.zkApp.mapRoot.get());
        });
        return {
            transaction: transaction,
            pendingEntity: entity
        };
    }
    async deployLocal(minaLocal, deployer, zkAppPrivateKey, useLocal) {
        this.useLocal = useLocal;
        let zkAppAddress = zkAppPrivateKey.toPublicKey();
        let deployerPublic = deployer.toPublicKey();
        const txn = await minaLocal.transaction(deployerPublic, ()=>{
            o1js__WEBPACK_IMPORTED_MODULE_0__/* .AccountUpdate */ .nx.fundNewAccount(deployerPublic);
            this.zkApp.deploy();
        });
        await txn.prove();
        // this tx needs .sign(), because `deploy()` adds an account update that requires signature authorization
        await txn.sign([
            deployer,
            zkAppPrivateKey
        ]).send();
    }
    constructor(contractAddress, credentialName, owner, proofsEnabled){
        this.useLocal = false;
        this.credentialName = credentialName;
        this.owner = owner;
        this.proofsEnabled = proofsEnabled;
        this.contractAddress = contractAddress;
        this.contractType = DiscordBadgeContract;
        //console.log("compiling contract @", new Date().toISOString());
        if (this.proofsEnabled) this.contractType.compile();
        //console.log("compiled contract @", new Date().toISOString());
        this.zkApp = new DiscordBadgeContract(this.contractAddress);
    }
} //# sourceMappingURL=CredentialProxy.js.map

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* unused harmony export default */
/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9466);
/* harmony import */ var _DiscordBadgeContract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(703);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_0__, _DiscordBadgeContract__WEBPACK_IMPORTED_MODULE_1__]);
([o1js__WEBPACK_IMPORTED_MODULE_0__, _DiscordBadgeContract__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);


class ActionResult {
    constructor(success, message){
        this.success = success;
        this.message = message;
    }
}
// ---------------------------------------------------------------------------------------

const state = {
    transaction: null,
    credentialProxy: null,
    pendingEntity: null,
    credentialsRepository: null,
    mentatStore: null,
    credentialName: null,
    owner: null
};
const localBlockchainSetup = {
    useLocal: false,
    localBlockchain: null,
    deployer: null,
    issuer: null,
    owner: null
};
// ---------------------------------------------------------------------------------------
const functions = {
    loado1js: async (args)=>{
        await o1js__WEBPACK_IMPORTED_MODULE_0__/* .isReady */ .DK;
    },
    setupActiveInstance: async (args)=>{
        if (!localBlockchainSetup.useLocal) {
            const Berkeley = o1js__WEBPACK_IMPORTED_MODULE_0__/* .Mina */ .No.Network("https://proxy.berkeley.minaexplorer.com/graphql");
            console.log("Berkeley Instance Created");
            o1js__WEBPACK_IMPORTED_MODULE_0__/* .Mina */ .No.setActiveInstance(Berkeley);
        } else {
            localBlockchainSetup.localBlockchain = o1js__WEBPACK_IMPORTED_MODULE_0__/* .Mina */ .No.LocalBlockchain({
                proofsEnabled: false
            });
            o1js__WEBPACK_IMPORTED_MODULE_0__/* .Mina */ .No.setActiveInstance(localBlockchainSetup.localBlockchain);
            console.log("using local blockchain instead of Berkeley");
            console.log("attaching accounts to local blockchain");
            let senderPrivate = localBlockchainSetup.deployer = o1js__WEBPACK_IMPORTED_MODULE_0__/* .PrivateKey */ ._q.fromBase58("EKFUES7YfgYm38njcBHzxyU6RPZQdZnfThcMzLrHL9LjyxJKfXzY");
            let senderPublic = senderPrivate.toPublicKey();
            let issuerPrivate = localBlockchainSetup.issuer = o1js__WEBPACK_IMPORTED_MODULE_0__/* .PrivateKey */ ._q.fromBase58("EKFZWMtRmcQELaJvqcEyEEJqh874B3PndA8kpxSst6AiHtErn7Xw"); //B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx
            let issuerPublic = issuerPrivate.toPublicKey();
            let ownerPrivate = localBlockchainSetup.owner = o1js__WEBPACK_IMPORTED_MODULE_0__/* .PrivateKey */ ._q.fromBase58("EKDzuEofrhNa2iSHS7Zq19fy6p7cX3FYrQ2pQ99uab1JjM4zLwA4"); // B62qk5mbK8NfRVXEw2ubyD2QbuU7WWhevE42yHz9rxgwjt21BtEa6Jg
            let ownerPublic = ownerPrivate.toPublicKey();
            localBlockchainSetup.localBlockchain.addAccount(senderPublic, "10_000_000_000");
            localBlockchainSetup.localBlockchain.addAccount(issuerPublic, "10_000_000_000");
            localBlockchainSetup.localBlockchain.addAccount(ownerPublic, "10_000_000_000");
        }
    },
    fetchAccount: async (args)=>{
        console.log("fetching account AllMartialArtsEvents from worker:", args.publicKey58);
        if (!localBlockchainSetup.useLocal) {
            console.log("fetching account AllMartialArtsEvents:", args.publicKey58);
            console.log("fetch @ ", new Date().toLocaleTimeString());
            const publicKey = o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh.fromBase58(args.publicKey58);
            let fetch = await (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .fetchAccount */ .$G)({
                publicKey
            });
            console.log("fetched @ ", new Date().toLocaleTimeString());
            return fetch;
        } else {
            console.log("no fetching using local blockchain");
            return {
                error: null
            };
        }
    },
    setupContract: async (args)=>{
        //const { CredentialProxy } = await import(/* webpackIgnore: true */ `../../../public/credentials/${args.name}Contract.js`);
        const path = "../../../../credentials/PassportContract.js";
        //const { CredentialProxy } = await import(/* webpackIgnore: true */path);
        // lookup address from credentials repo
        let contractAddress = o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh.fromBase58("B62qpsNhMkUqtpdsdUyNURPa7Z9p4YB7mSaxFWk4bi5NobfBhttk8u2"); //PublicKey.empty();// pull from credential repo
        if (localBlockchainSetup.useLocal) contractAddress = o1js__WEBPACK_IMPORTED_MODULE_0__/* .PrivateKey */ ._q.random().toPublicKey();
        //state.mentatStore = new CredentialRepository().GetCredentialStore(args.name);
        state.credentialProxy = new _DiscordBadgeContract__WEBPACK_IMPORTED_MODULE_1__/* .CredentialProxy */ .Wb(contractAddress, args.name, args.owner, args.useProofs);
        state.credentialName = args.name;
        state.owner = args.owner;
        state.credentialsRepository = {};
        console.log("contract setup");
        console.log("contract root:", JSON.stringify(await state.credentialProxy.getStorageRoot()));
        if (localBlockchainSetup.useLocal) {
            state.credentialProxy.deployLocal(localBlockchainSetup.localBlockchain, localBlockchainSetup.deployer, contractAddress, localBlockchainSetup.useLocal);
        }
    },
    getStorageRootField: async ()=>{
        return state.credentialProxy.getStorageRoot();
    },
    getStorageRoot: async ()=>{
        return JSON.stringify(await functions.getStorageRootField());
    },
    setStorageRoot: async (args)=>{
        let storage = (0,o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN)(args.root);
        const transaction = state.credentialProxy.setStorageRoot(storage);
        state.transaction = transaction;
    },
    rootsVerified: async (args)=>{
        const backingStoreRoot = args.merkleStore.map.getRoot();
        // verify roots match
        if (backingStoreRoot.toString() != args.contractRoot.toString()) {
            return {
                success: false,
                message: "Roots do not match"
            };
        }
        return {
            success: true,
            message: "Roots match"
        };
    },
    issueCredential: async (args)=>{
        console.log("issueCredential");
        args.credential.credentialType = state.credentialName;
        console.log("credential:", args.credential);
        console.log(state.mentatStore);
        let backingStore = state.mentatStore;
        const merkleStore = await backingStore.getMerkleMap();
        console.log("merkleStore:", merkleStore);
        const contractRoot = await functions.getStorageRootField();
        const rootsVerified = await functions.rootsVerified({
            merkleStore: merkleStore,
            contractRoot: contractRoot
        });
        if (!rootsVerified.success) return rootsVerified;
        const result = state.credentialProxy.issueCredential(args.credential.owner, args.credential, merkleStore);
        state.transaction = result.transaction;
        state.pendingEntity = result.pendingEntity;
        return {
            success: true,
            message: "Transaction created"
        };
    },
    updateBackingStore: async (args)=>{
        let backingStore = state.mentatStore;
        const merkleStore = await backingStore.getMerkleMap();
        const backingStoreRoot = merkleStore.map.getRoot();
        const contractRoot = await functions.getStorageRootField();
        // verify roots match
        const rootsVerified = await functions.rootsVerified({
            merkleStore: merkleStore,
            contractRoot: contractRoot
        });
        if (!rootsVerified.success) return rootsVerified;
        // update student in backing store
        backingStore.upsert(state.pendingEntity);
        return {
            success: true,
            message: "Backing store updated"
        };
    },
    proveUpdateTransaction: async (args)=>{
        await state.transaction.prove();
    },
    getTransactionJSON: async (args)=>{
        return state.transaction.toJSON();
    }
};
if (true) {
    addEventListener("message", async (event)=>{
        const returnData = await functions[event.data.fn](event.data.args);
        const message = {
            id: event.data.id,
            data: returnData
        };
        postMessage(message);
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7663:
/***/ (function(module) {

var __dirname = "/";
(function(){var e={229:function(e){var t=e.exports={};var r;var n;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){r=setTimeout}else{r=defaultSetTimout}}catch(e){r=defaultSetTimout}try{if(typeof clearTimeout==="function"){n=clearTimeout}else{n=defaultClearTimeout}}catch(e){n=defaultClearTimeout}})();function runTimeout(e){if(r===setTimeout){return setTimeout(e,0)}if((r===defaultSetTimout||!r)&&setTimeout){r=setTimeout;return setTimeout(e,0)}try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}function runClearTimeout(e){if(n===clearTimeout){return clearTimeout(e)}if((n===defaultClearTimeout||!n)&&clearTimeout){n=clearTimeout;return clearTimeout(e)}try{return n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}var i=[];var o=false;var u;var a=-1;function cleanUpNextTick(){if(!o||!u){return}o=false;if(u.length){i=u.concat(i)}else{a=-1}if(i.length){drainQueue()}}function drainQueue(){if(o){return}var e=runTimeout(cleanUpNextTick);o=true;var t=i.length;while(t){u=i;i=[];while(++a<t){if(u){u[a].run()}}a=-1;t=i.length}u=null;o=false;runClearTimeout(e)}t.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1){for(var r=1;r<arguments.length;r++){t[r-1]=arguments[r]}}i.push(new Item(e,t));if(i.length===1&&!o){runTimeout(drainQueue)}};function Item(e,t){this.fun=e;this.array=t}Item.prototype.run=function(){this.fun.apply(null,this.array)};t.title="browser";t.browser=true;t.env={};t.argv=[];t.version="";t.versions={};function noop(){}t.on=noop;t.addListener=noop;t.once=noop;t.off=noop;t.removeListener=noop;t.removeAllListeners=noop;t.emit=noop;t.prependListener=noop;t.prependOnceListener=noop;t.listeners=function(e){return[]};t.binding=function(e){throw new Error("process.binding is not supported")};t.cwd=function(){return"/"};t.chdir=function(e){throw new Error("process.chdir is not supported")};t.umask=function(){return 0}}};var t={};function __nccwpck_require__(r){var n=t[r];if(n!==undefined){return n.exports}var i=t[r]={exports:{}};var o=true;try{e[r](i,i.exports,__nccwpck_require__);o=false}finally{if(o)delete t[r]}return i.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r=__nccwpck_require__(229);module.exports=r})();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = function() {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [674], function() { return __webpack_require__(2375); })
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	!function() {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = function(queue) {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach(function(fn) { fn.r--; });
/******/ 				queue.forEach(function(fn) { fn.r-- ? fn.r++ : fn(); });
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = function(deps) { return deps.map(function(dep) {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then(function(r) {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, function(e) {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = function(fn) { fn(queue); };
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = function() {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}); };
/******/ 		__webpack_require__.a = function(module, body, hasAwait) {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise(function(resolve, rej) {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = function(fn) { queue && fn(queue), depQueues.forEach(fn), promise["catch"](function() {}); };
/******/ 			module.exports = promise;
/******/ 			body(function(deps) {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = function() { return currentDeps.map(function(d) {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}); }
/******/ 				var promise = new Promise(function(resolve) {
/******/ 					fn = function() { resolve(getResult); };
/******/ 					fn.r = 0;
/******/ 					var fnQueue = function(q) { q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))); };
/******/ 					currentDeps.map(function(dep) { dep[webpackQueues](fnQueue); });
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, function(err) { (err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue); });
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "static/chunks/" + "982f5ae2" + "-" + "e314af3878770098" + ".js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/trusted types policy */
/******/ 	!function() {
/******/ 		var policy;
/******/ 		__webpack_require__.tt = function() {
/******/ 			// Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
/******/ 			if (policy === undefined) {
/******/ 				policy = {
/******/ 					createScriptURL: function(url) { return url; }
/******/ 				};
/******/ 				if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
/******/ 					policy = trustedTypes.createPolicy("nextjs#bundler", policy);
/******/ 				}
/******/ 			}
/******/ 			return policy;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/trusted types script url */
/******/ 	!function() {
/******/ 		__webpack_require__.tu = function(url) { return __webpack_require__.tt().createScriptURL(url); };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "/whisper-key/_next/";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			685: 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = function(data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = function(chunkId, promises) {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.tu(__webpack_require__.p + __webpack_require__.u(chunkId)));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	!function() {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = function() {
/******/ 			return __webpack_require__.e(674).then(next);
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	_N_E = __webpack_exports__;
/******/ 	
/******/ })()
;