(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[26],{

/***/ 9637:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/dashboard",
      function () {
        return __webpack_require__(5683);
      }
    ]);
    if(false) {}
  

/***/ }),

/***/ 2804:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react_qr_code__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1653);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7294);
/* harmony import */ var _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2971);
/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9466);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_3__, o1js__WEBPACK_IMPORTED_MODULE_4__]);
([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_3__, o1js__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const QRCodeCreator = (props)=>{
    const [authState, _] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_3__/* .AuthContext */ .V);
    const copyAddressToClipboard = ()=>{
        navigator.clipboard.writeText(authState.userAddress);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
        className: "",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "grid grid-cols-1 text-center",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "m-auto",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                            className: "text-3xl font-bold sm:text-4xl",
                            children: "Share your address"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "mt-4 text-gray-600",
                            children: "Allow others to scan your address or click the QR code to copy."
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "m-auto py-7 ",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                        onClick: copyAddressToClipboard,
                        className: "cursor-pointer",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_qr_code__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP, {
                            value: authState.userAddress
                        })
                    })
                })
            ]
        })
    });
};
/* harmony default export */ __webpack_exports__.Z = (QRCodeCreator);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9191:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var react_qr_scanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2090);
/* harmony import */ var react_qr_scanner__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_qr_scanner__WEBPACK_IMPORTED_MODULE_2__);



class QRCodeScanner extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    render() {
        const { camUse, result } = this.state;
        const previewStyle = {
            height: 240,
            width: 320
        };
        var _this_props_className;
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    className: (_this_props_className = this.props.className) !== null && _this_props_className !== void 0 ? _this_props_className : "btn",
                    onClick: this.openModal,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            strokeWidth: 1.5,
                            stroke: "currentColor",
                            className: "w-6 h-6",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    d: "M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                                })
                            ]
                        }),
                        " Scan"
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("dialog", {
                    id: this.props.uniqueID,
                    className: "modal",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        method: "dialog",
                        className: "modal-box",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                    onClick: this.closeModal,
                                    className: "cursor-pointer btn btn-sm btn-circle btn-ghost absolute right-2 top-2",
                                    children: "X"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "grid grid-cols-1 text-center",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "m-auto",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                                className: "text-3xl font-bold sm:text-4xl",
                                                children: "Scan an address"
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                className: "mt-4 text-gray-600"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "m-auto py-7 ",
                                        children: camUse && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((react_qr_scanner__WEBPACK_IMPORTED_MODULE_2___default()), {
                                                    delay: this.state.delay,
                                                    style: previewStyle,
                                                    onError: this.handleError,
                                                    onScan: this.handleScan
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                    className: "modal-action"
                                                })
                                            ]
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        });
    }
    constructor(props){
        super(props);
        this.handleScan = (data)=>{
            if (data) {
                if (data.text) {
                    this.setState({
                        result: data.text
                    });
                    this.props.onScan(data.text);
                    this.closeModal();
                }
            }
        };
        this.handleError = (err)=>{
            console.error(err);
        };
        this.openModal = ()=>{
            window[this.props.uniqueID].showModal();
            this.setState({
                camUse: true,
                result: ""
            });
        };
        this.closeModal = ()=>{
            window[this.props.uniqueID].close();
            this.setState({
                camUse: false
            });
        };
        this.state = {
            delay: 100,
            result: "",
            camUse: false
        };
    }
}
/* harmony default export */ __webpack_exports__.Z = (QRCodeScanner);


/***/ }),

/***/ 2971:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: function() { return /* binding */ AuthContext; },
/* harmony export */   W: function() { return /* binding */ AuthPage; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9008);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _layout_Header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2019);
/* harmony import */ var _layout_Footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8981);
/* harmony import */ var _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3508);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1163);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7294);
/* harmony import */ var _modules_Snackbar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2333);
/* harmony import */ var _modules_workers_AllMaWorkerEventsClient__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9556);
/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9466);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_layout_Header__WEBPACK_IMPORTED_MODULE_4__, _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__, _modules_workers_AllMaWorkerEventsClient__WEBPACK_IMPORTED_MODULE_9__, o1js__WEBPACK_IMPORTED_MODULE_10__]);
([_layout_Header__WEBPACK_IMPORTED_MODULE_4__, _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__, _modules_workers_AllMaWorkerEventsClient__WEBPACK_IMPORTED_MODULE_9__, o1js__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












const AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_8__.createContext)();
const AuthPage = (param)=>{
    let { validate, children } = param;
    // load from Authentication values
    //Authentication.getNum();
    let [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)({
        authentication: null,
        hasWallet: _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.hasWallet,
        hasBeenSetup: validate ? _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.hasBeenSetup : true,
        accountExists: _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.accountExists,
        currentNum: null,
        publicKey: null,
        zkappPublicKey: null,
        creatingTransaction: false,
        snarkyLoaded: _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.sn,
        showRequestingAccount: false,
        showCreateWallet: false,
        showFundAccount: false,
        showLoadingContracts: false,
        userAddress: null,
        authentication: null
    });
    let [authState, setAuthState] = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)({
        userAuthenticated: false,
        userAddress: "",
        firstFetchAccount: false,
        alertAvailable: false,
        alertMessage: "",
        alertNeedsSpinner: false
    });
    const [userAuthenticated, setUserAuthenticated] = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(false);
    const [userAddress, setUserAddress] = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)("");
    const [firstFetchAccount, setFirstFetchAccount] = (0,react__WEBPACK_IMPORTED_MODULE_8__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_8__.useEffect)(()=>{
        function timeout(seconds) {
            return new Promise(function(resolve) {
                setTimeout(function() {
                    resolve();
                }, seconds * 1000);
            });
        }
        (async ()=>{
            if (!_modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.loggedIn) {
                if (!state.hasBeenSetup) {
                    console.log("setting up");
                    const allWorkerClient = new _modules_workers_AllMaWorkerEventsClient__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z();
                    //const allWorkerClient = new AllMaWorkerClient();
                    //const zkappWorkerClient = new RankedBjjWorkerClient();
                    _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.setZkClient(allWorkerClient);
                    await timeout(15);
                    console.log("loading snarky");
                    try {
                        const loadedSnarky = await _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.loadSnarky();
                    } catch (e) {
                        console.log("error loading snarky", e);
                    }
                    console.log("loadedSnarky");
                    const hasWallet = await _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.checkForWallet();
                    if (!hasWallet) {
                        setState({
                            ...state,
                            hasWallet: false,
                            snarkyLoaded: true
                        });
                        return;
                    } else {
                        setState({
                            ...state,
                            hasWallet: true,
                            snarkyLoaded: true,
                            showRequestingAccount: true
                        });
                        console.log("has wallet");
                    }
                    console.log("requesting account");
                    const loginResult = await _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.login();
                    console.log("login result", loginResult);
                    if (loginResult.error == "user reject") {
                        (0,_modules_Snackbar__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)("You cancelled connection with Mina wallet!", 1500);
                    } else if (loginResult.error == "please create or restore wallet first") {
                        console.log("please create or restore wallet first");
                        setState({
                            ...state,
                            showCreateWallet: true,
                            hasWallet: true,
                            snarkyLoaded: true,
                            showRequestingAccount: false
                        });
                    }
                    console.log("checking account");
                    const accountExists = await _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.doesAccountExist();
                    if (!accountExists) {
                        setState({
                            ...state,
                            showFundAccount: true,
                            showCreateWallet: false,
                            hasWallet: true,
                            snarkyLoaded: true,
                            showRequestingAccount: false
                        });
                    } else {
                        setState({
                            ...state,
                            showLoadingContracts: true,
                            showFundAccount: false,
                            showCreateWallet: false,
                            hasWallet: true,
                            snarkyLoaded: true,
                            showRequestingAccount: false,
                            userAddress: true
                        });
                        const hasBeenSetup = await _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.setupContracts();
                        setUserAuthenticated(true);
                        setUserAddress(_modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.address);
                        //const hasBeenSetup = Authentication.setupBjjPromoteContracts();
                        setState({
                            ...state,
                            hasBeenSetup: hasBeenSetup,
                            showLoadingContracts: false,
                            showFundAccount: false,
                            showCreateWallet: false,
                            hasWallet: true,
                            snarkyLoaded: true,
                            showRequestingAccount: false,
                            userAddress: _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.address,
                            authentication: _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z
                        });
                        console.log("fetching account");
                        _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.zkClient.fetchAccount({
                            publicKey: o1js__WEBPACK_IMPORTED_MODULE_10__/* .PublicKey */ .nh.fromBase58(_modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.contractAddress)
                        });
                        console.log("fetching account done");
                        setFirstFetchAccount(true);
                        setAuthState({
                            ...authState,
                            userAuthenticated: true,
                            userAddress: _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.address,
                            firstFetchAccount: true,
                            alertAvailable: true,
                            alertMessage: "Successfully logged in"
                        });
                    // console.log('fetching storage root');
                    // let root = await Authentication.zkClient.getNum();
                    // console.log("storage root", root.toString());
                    }
                }
            }
        })();
    }, []);
    const loginClicked = async ()=>{
        try {
            const loggedIn = await _modules_Authentication__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z.login();
            if (loggedIn) {
                next_router__WEBPACK_IMPORTED_MODULE_7___default().push("/dashboard");
            }
        } catch (e) {
            console.log("Login Failed", e.message);
            if (e.message == "user reject") {
                (0,_modules_Snackbar__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)("You cancelled connection with Mina wallet!", 1500);
            }
        }
    // const loggedIn = Authentication.login();
    // if (Authentication.loggedIn) {
    //   Router.push('/dashboard')
    // }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("title", {
                        children: "Whisper Key"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("link", {
                        rel: "icon",
                        href: "/assets/favicon.ico"
                    })
                ]
            }),
            !state.hasBeenSetup ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("main", {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "rankproof-page",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "rankproof-content-wrap",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                            className: "hero min-h-screen bg-base-200",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "hero-content text-center",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "max-w-md",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
                                            className: "text-5xl font-bold",
                                            children: "Getting things ready"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "pt-20",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "".concat(!state.snarkyLoaded || state.showRequestingAccount || state.showLoadingContracts ? "loading-snarky" : ""),
                                                "data-reveal-delay": "400",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        style: {
                                                            display: state.snarkyLoaded ? "none" : "block"
                                                        },
                                                        children: [
                                                            "Loading ",
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                                className: "text-color-primary",
                                                                children: "o1js"
                                                            }),
                                                            "..."
                                                        ]
                                                    }),
                                                    state.hasWallet != null && !state.hasWallet && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "text-color-warning",
                                                        children: [
                                                            "Could not find a wallet. Install Auro wallet here",
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "pt-4",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                                                    className: "btn btn-accent",
                                                                    href: "https://www.aurowallet.com/",
                                                                    target: "_blank",
                                                                    rel: "noreferrer",
                                                                    children: "Auro wallet"
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    state.showRequestingAccount && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        children: "Requesting account"
                                                    }),
                                                    state.showCreateWallet && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        className: "text-color-warning",
                                                        children: "Please create or restore a wallet first!"
                                                    }),
                                                    state.showFundAccount && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "text-color-warning",
                                                        children: [
                                                            "Your account does not exist, visit thefaucet to fund your account",
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                                className: "pt-4",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                                                    className: "btn btn-accent",
                                                                    href: "https://faucet.minaprotocol.com/",
                                                                    target: "_blank",
                                                                    rel: "noreferrer",
                                                                    children: "Faucet"
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    state.showLoadingContracts && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                        children: "Loading contracts..."
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "pt-20",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "loading loading-bars loading-lg"
                                            })
                                        })
                                    ]
                                })
                            })
                        })
                    })
                })
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AuthContext.Provider, {
                    value: [
                        authState,
                        setAuthState
                    ],
                    children: children
                })
            })
        ]
    });
};


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6061:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var _AuthPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2971);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_AuthPage__WEBPACK_IMPORTED_MODULE_2__]);
_AuthPage__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const Header = ()=>{
    const [authState, setAuthState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_AuthPage__WEBPACK_IMPORTED_MODULE_2__/* .AuthContext */ .V);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("nav", {
        className: "bg-gray-800 z-100 invisible lg:visible",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("header", {
            className: "fixed w-full zclass",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("nav", {
                className: "border-gray-200 py-2.5 dark:bg-gray-900",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                            href: "/",
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                    src: "/assets/images/logo.png",
                                    className: "h-6 mr-3 sm:h-9",
                                    alt: "RankProok Logo"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "self-center text-xl font-semibold whitespace-nowrap dark:text-white",
                                    children: "Whisper Key"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex items-center lg:order-2",
                            id: "mobile-menu-2",
                            children: [
                                authState.userAuthenticated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    className: "mr-2",
                                    children: authState.userAddress.substring(0, 5) + "..." + authState.userAddress.substring(authState.userAddress.length - 5, authState.userAddress.length)
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                    type: "button",
                                    className: "inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
                                    children: [
                                        "Notifications",
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                            className: "inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full",
                                            children: "2"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            })
        })
    });
};
/* harmony default export */ __webpack_exports__.Z = (Header);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8981:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);

const Footer = ()=>{
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: /*#__PURE__*/ _jsx("h1", {
            children: "Footer"
        })
    });
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (Footer)));


/***/ }),

/***/ 2019:
/***/ (function(module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1163);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7294);
/* harmony import */ var _modules_Authentication__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3508);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_modules_Authentication__WEBPACK_IMPORTED_MODULE_5__]);
_modules_Authentication__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];







const Header = ()=>{
    const [loggedInState, setLoggedIn] = useState(false);
    const loginClicked = async ()=>{
        try {
            const loggedIn = await Authentication.login();
            if (loggedIn) {
                setLoggedIn(true);
                Router.push("/dashboard");
            }
        } catch (e) {
            console.log("Login Failed", e.message);
            if (e.message == "user reject") {
                Snackbar("You cancelled connection with Mina wallet!", 1500);
            }
        }
    // const loggedIn = Authentication.login();
    // if (Authentication.loggedIn) {
    //   Router.push('/dashboard')
    // }
    };
    useEffect(()=>{
        setLoggedIn(true);
    // Function to run after the component has loaded
    //check if logged in
    // const checkLoggedIn = async () => {
    //   const loggedIn = await Authentication.loggedIn;
    //   if (loggedIn) {
    //     setLoggedIn(true);
    //   } else {
    //     Router.push('/');
    //   }
    // }
    // checkLoggedIn();
    // You can put any code here that you want to run after the component has loaded.
    }, []);
    return /*#__PURE__*/ _jsx("nav", {
        className: "bg-gray-800",
        children: /*#__PURE__*/ _jsx("header", {
            className: "fixed w-full",
            children: /*#__PURE__*/ _jsx("nav", {
                className: "border-gray-200 py-2.5 dark:bg-gray-900",
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto",
                    children: [
                        /*#__PURE__*/ _jsxs(Link, {
                            href: "/",
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ _jsx("img", {
                                    src: "/assets/images/logo.png",
                                    className: "h-6 mr-3 sm:h-9",
                                    alt: "RankProok Logo"
                                }),
                                /*#__PURE__*/ _jsx("span", {
                                    className: "self-center text-xl font-semibold whitespace-nowrap dark:text-white",
                                    children: "RankProof"
                                })
                            ]
                        }),
                        loggedInState ? /*#__PURE__*/ _jsx("div", {
                            className: "flex items-center lg:order-2",
                            children: /*#__PURE__*/ _jsx("div", {
                                className: "absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0",
                                children: /*#__PURE__*/ _jsx("div", {
                                    className: "relative ml-3",
                                    children: /*#__PURE__*/ _jsx("div", {
                                        children: /*#__PURE__*/ _jsxs("button", {
                                            type: "button",
                                            className: "flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800",
                                            id: "user-menu-button",
                                            "aria-expanded": "false",
                                            "aria-haspopup": "true",
                                            children: [
                                                /*#__PURE__*/ _jsx("span", {
                                                    className: "sr-only",
                                                    children: "Open user menu"
                                                }),
                                                /*#__PURE__*/ _jsx(Image, {
                                                    height: "32",
                                                    width: "32",
                                                    className: "h-8 w-8 rounded-full ",
                                                    src: "https://robohash.org/B62qmdQVgKWmWWxtNpfjdx9wUp6fm1eUsBrK4V3PXjm4bFBvDTK5U3U",
                                                    alt: ""
                                                })
                                            ]
                                        })
                                    })
                                })
                            })
                        }) : /*#__PURE__*/ _jsx("span", {}),
                        loggedInState ? /*#__PURE__*/ _jsxs("div", {
                            className: "items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1",
                            id: "mobile-menu-2",
                            children: [
                                /*#__PURE__*/ _jsx(Link, {
                                    href: "/dashboard",
                                    className: "text-purple-700 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800",
                                    children: "Dashboard"
                                }),
                                /*#__PURE__*/ _jsx(Link, {
                                    href: "/lineage",
                                    className: "text-purple-700 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800",
                                    children: "Lineage"
                                }),
                                /*#__PURE__*/ _jsx(Link, {
                                    href: "/manage",
                                    className: "text-purple-700 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800",
                                    children: "Manage"
                                }),
                                /*#__PURE__*/ _jsx(Link, {
                                    href: "/dashboardskeleton",
                                    className: "text-purple-700 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800",
                                    children: "skeleton"
                                })
                            ]
                        }) : /*#__PURE__*/ _jsx("div", {
                            className: "flex items-center lg:order-2",
                            id: "mobile-menu-2",
                            children: /*#__PURE__*/ _jsx(Link, {
                                href: "/dashboard",
                                className: "inline-block py-2 px-4 text-sm leading-5 text-green-50 btn-primary hover:bg-indigo-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md float-right",
                                children: "Launch App"
                            })
                        })
                    ]
                })
            })
        })
    });
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (Header)));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9931:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);


const DashBoardIssueCredentials = ()=>{
    let licenseCredentialFields = [
        {
            name: "Full Name",
            type: "string"
        },
        {
            name: "Permit Number",
            type: "string"
        }
    ];
    let licenseCredentialMetaData = {
        name: "License",
        description: "Ministry of Works and Transport License VC",
        fields: licenseCredentialFields
    };
    let degreeCredentialFields = [
        {
            name: "Full Name",
            type: "string"
        },
        {
            name: "Degree",
            type: "string"
        }
    ];
    let degreeCredentialMetaData = {
        name: "Degree",
        description: "UWI Degree VC",
        fields: degreeCredentialFields
    };
    let credentialMetaDataList = [];
    credentialMetaDataList.push(licenseCredentialMetaData);
    credentialMetaDataList.push(degreeCredentialMetaData);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                className: "inline-block rounded btn-primary px-12 py-3 text-center text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400",
                href: "#issue_credential_modal",
                children: "Issue Verifiable Credentials to Users"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "modals-area",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("dialog", {
                    className: "modal",
                    id: "issue_credential_modal",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            method: "dialog",
                            className: "modal-box w-11/12 max-w-5xl",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "modal-action",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                        href: "#",
                                        className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2",
                                        children: "X"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                            children: "Issue Verifiable Credential"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "form-control",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    className: "label",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-base label-text vc-fieldName",
                                                        children: "Type"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                    className: "select select-bordered w-full max-w-xs",
                                                    children: [
                                                        credentialMetaDataList.map((vc, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                                                children: vc.name
                                                            }, vc.name)),
                                                        ";"
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("form", {
                            method: "dialog",
                            className: "modal-backdrop",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                children: "close"
                            })
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (DashBoardIssueCredentials);


/***/ }),

/***/ 8740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _Forms_AddVerifiableCredentialForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8144);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Forms_AddVerifiableCredentialForm__WEBPACK_IMPORTED_MODULE_1__]);
_Forms_AddVerifiableCredentialForm__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const AddAction = (param)=>{
    let { isInstructor } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                className: "block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring",
                href: "#add_action_modal",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "inline-block rounded-lg bg-gray-50 p-3",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                            className: "w-6 h-6 text-gray-800 dark:text-white",
                            "aria-hidden": "true",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "#652dc5",
                            viewBox: "0 0 20 18",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                d: "M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z"
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                        className: "mt-2 font-bold",
                        children: "Add"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600",
                        children: "Start your journey in a new Martial Art."
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "modals-area",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("dialog", {
                    className: "modal",
                    id: "add_action_modal",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            method: "dialog",
                            className: "modal-box w-11/12 max-w-5xl",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "modal-action",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                        href: "#",
                                        className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2",
                                        children: "X"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Forms_AddVerifiableCredentialForm__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {})
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("form", {
                            method: "dialog",
                            className: "modal-backdrop",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                children: "close"
                            })
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (AddAction);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2971);
/* harmony import */ var _AddAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8740);
/* harmony import */ var _InstructorsAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3548);
/* harmony import */ var _ShareAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7855);
/* harmony import */ var _PromoteAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7601);
/* harmony import */ var _RevokeAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6704);
/* harmony import */ var _ProveAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(83);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__, _AddAction__WEBPACK_IMPORTED_MODULE_3__, _InstructorsAction__WEBPACK_IMPORTED_MODULE_4__, _ShareAction__WEBPACK_IMPORTED_MODULE_5__, _PromoteAction__WEBPACK_IMPORTED_MODULE_6__, _RevokeAction__WEBPACK_IMPORTED_MODULE_7__, _ProveAction__WEBPACK_IMPORTED_MODULE_8__]);
([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__, _AddAction__WEBPACK_IMPORTED_MODULE_3__, _InstructorsAction__WEBPACK_IMPORTED_MODULE_4__, _ShareAction__WEBPACK_IMPORTED_MODULE_5__, _PromoteAction__WEBPACK_IMPORTED_MODULE_6__, _RevokeAction__WEBPACK_IMPORTED_MODULE_7__, _ProveAction__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const DashboardActions = (param)=>{
    let { isInstructor, disciplines } = param;
    const [authState, _] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__/* .AuthContext */ .V);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: authState.userAuthenticated && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "grid grid-cols-2 gap-4 sm:grid-cols-3",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_AddAction__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                    isInstructor: isInstructor,
                    disciplines: disciplines
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_InstructorsAction__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    isInstructor: isInstructor,
                    disciplines: disciplines
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ShareAction__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    isInstructor: isInstructor,
                    disciplines: disciplines
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_PromoteAction__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    isInstructor: isInstructor,
                    disciplines: disciplines
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_RevokeAction__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                    isInstructor: isInstructor,
                    disciplines: disciplines
                }),
                disciplines && disciplines.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ProveAction__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                    isInstructor: isInstructor,
                    disciplines: disciplines
                })
            ]
        })
    });
};
/* harmony default export */ __webpack_exports__.Z = (DashboardActions);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _InstructorMartialArts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5673);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_InstructorMartialArts__WEBPACK_IMPORTED_MODULE_1__]);
_InstructorMartialArts__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const InstructorsAction = (param)=>{
    let { isInstructor, disciplines } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: isInstructor && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                    className: "block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring",
                    href: "#instructors_action_modal",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "inline-block rounded-lg bg-gray-50 p-3",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                                className: "w-6 h-6 text-gray-800 dark:text-white",
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "#652dc5",
                                viewBox: "0 0 20 16",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                        d: "M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                        d: "M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                            className: "mt-2 font-bold",
                            children: "My Students"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600",
                            children: "Manage my students across disciplines."
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "modals-area",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("dialog", {
                        className: "modal",
                        id: "instructors_action_modal",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                method: "dialog",
                                className: "modal-box w-11/12 max-w-5xl",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "modal-action",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                            href: "#",
                                            className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2",
                                            children: "X"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_InstructorMartialArts__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                                        martialArts: disciplines
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("form", {
                                method: "dialog",
                                className: "modal-backdrop",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    children: "close"
                                })
                            })
                        ]
                    })
                })
            ]
        })
    });
};
/* harmony default export */ __webpack_exports__.Z = (InstructorsAction);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _Forms_PromoteForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5210);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Forms_PromoteForm__WEBPACK_IMPORTED_MODULE_1__]);
_Forms_PromoteForm__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const PromoteAction = (param)=>{
    let { isInstructor } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: isInstructor && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                    className: "block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring",
                    href: "#promote_modal",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "inline-block rounded-lg bg-gray-50 p-3",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                className: "w-6 h-6 text-gray-800 dark:text-white",
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 20 20",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    stroke: "#652dc5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: "2",
                                    d: "M4.008 8.714c1-.097 1.96-.45 2.792-1.028a25.112 25.112 0 0 0 4.454-5.72 1.8 1.8 0 0 1 .654-.706 1.742 1.742 0 0 1 1.65-.098 1.82 1.82 0 0 1 .97 1.128c.075.248.097.51.065.767l-1.562 4.629M4.008 8.714H1v9.257c0 .273.106.535.294.728a.99.99 0 0 0 .709.301h1.002a.99.99 0 0 0 .71-.301c.187-.193.293-.455.293-.728V8.714Zm8.02-1.028h4.968c.322 0 .64.08.925.232.286.153.531.374.716.645a2.108 2.108 0 0 1 .242 1.883l-2.36 7.2c-.288.813-.48 1.354-1.884 1.354-2.59 0-5.39-1.06-7.504-1.66"
                                })
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                            className: "mt-2 font-bold",
                            children: "Promote"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600",
                            children: "Promote my students across disciplines."
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "modals-area",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("dialog", {
                        className: "modal",
                        id: "promote_modal",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                method: "dialog",
                                className: "modal-box ",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "modal-action",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                            href: "#",
                                            className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2",
                                            children: "X"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Forms_PromoteForm__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {})
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("form", {
                                method: "dialog",
                                className: "modal-backdrop",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    children: "close"
                                })
                            })
                        ]
                    })
                })
            ]
        })
    });
};
/* harmony default export */ __webpack_exports__.Z = (PromoteAction);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _Forms_ProveForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(854);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Forms_ProveForm__WEBPACK_IMPORTED_MODULE_1__]);
_Forms_ProveForm__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const ProveAction = (param)=>{
    let { isInstructor } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                className: "block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring",
                href: "#prove_modal",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "inline-block rounded-lg bg-gray-50 p-3",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                            className: "w-6 h-6 text-gray-800 dark:text-white",
                            "aria-hidden": "true",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 20 16",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                stroke: "#652dc5",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2",
                                d: "M3.656 12.115a3 3 0 0 1 5.682-.015M13 5h3m-3 3h3m-3 3h3M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm6.5 4.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                        className: "mt-2 font-bold",
                        children: "Prove"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600",
                        children: "Prove my rank to another practitioner."
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "modals-area",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("dialog", {
                    className: "modal",
                    id: "prove_modal",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            method: "dialog",
                            className: "modal-box ",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "modal-action",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                        href: "#",
                                        className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2",
                                        children: "X"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Forms_ProveForm__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {})
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("form", {
                            method: "dialog",
                            className: "modal-backdrop",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                children: "close"
                            })
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (ProveAction);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _Forms_RevokeForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(70);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Forms_RevokeForm__WEBPACK_IMPORTED_MODULE_1__]);
_Forms_RevokeForm__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const RevokeAction = (param)=>{
    let { isInstructor } = param;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: isInstructor && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                    className: "block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring",
                    href: "#revoke_modal",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "inline-block rounded-lg bg-gray-50 p-3",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                className: "w-6 h-6 text-gray-800 dark:text-white",
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 20 20",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    stroke: "#652dc5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: "2",
                                    d: "M15.992 11.287c-1 .097-1.96.45-2.792 1.029a25.118 25.118 0 0 0-4.454 5.721 1.803 1.803 0 0 1-.655.705 1.742 1.742 0 0 1-1.648.096 1.786 1.786 0 0 1-.604-.457 1.874 1.874 0 0 1-.432-1.439l1.562-4.626m9.023-1.03H19V2.03c0-.273-.106-.535-.294-.728A.99.99 0 0 0 17.997 1h-1.002a.99.99 0 0 0-.71.301 1.042 1.042 0 0 0-.293.728v9.258Zm-8.02 1.03H3.003c-.322 0-.64-.08-.925-.233a2.022 2.022 0 0 1-.716-.645 2.108 2.108 0 0 1-.242-1.883l2.36-7.2C3.769 1.54 3.96 1 5.365 1c2.59 0 5.39 1.06 7.504 1.66"
                                })
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                            className: "mt-2 font-bold",
                            children: "Revoke"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                            className: "hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600",
                            children: "Revoke an existing student's rank."
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "modals-area",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("dialog", {
                        className: "modal",
                        id: "revoke_modal",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                method: "dialog",
                                className: "modal-box ",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "modal-action",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                            href: "#",
                                            className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2",
                                            children: "X"
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Forms_RevokeForm__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {})
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("form", {
                                method: "dialog",
                                className: "modal-backdrop",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                    children: "close"
                                })
                            })
                        ]
                    })
                })
            ]
        })
    });
};
/* harmony default export */ __webpack_exports__.Z = (RevokeAction);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var _modules_Authentication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3508);
/* harmony import */ var _components_QRCodeCreator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2804);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_modules_Authentication__WEBPACK_IMPORTED_MODULE_2__, _components_QRCodeCreator__WEBPACK_IMPORTED_MODULE_3__]);
([_modules_Authentication__WEBPACK_IMPORTED_MODULE_2__, _components_QRCodeCreator__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const InstructorsAction = (param)=>{
    let { isInstructor } = param;
    const [address, setAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [showAddress, setShowAddress] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const showAddressModalRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef(null);
    const showAddressModal = async ()=>{
        let tempAddress = _modules_Authentication__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.address ? _modules_Authentication__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.address : "No address loaded"; // Authentication.address;
        setAddress(tempAddress);
        setShowAddress(true);
        try {
            window.share_address_modal.showModal();
        } catch (error) {
            console.log(error);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                className: "cursor-pointer block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring",
                href: "#share_address_modal",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                        className: "inline-block rounded-lg bg-gray-50 p-3",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                            className: "w-6 h-6 text-gray-800 dark:text-white",
                            "aria-hidden": "true",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "#652dc5",
                            viewBox: "0 0 16 20",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                d: "M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                        className: "mt-2 font-bold",
                        children: "My Address"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600",
                        children: "View or share my MINA address."
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "modals-area",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("dialog", {
                    className: "modal",
                    id: "share_address_modal",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            method: "dialog",
                            className: "modal-box ",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "modal-action",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                        href: "#",
                                        className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2",
                                        children: "X"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_QRCodeCreator__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                    address: address
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("form", {
                            method: "dialog",
                            className: "modal-backdrop",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                children: "close"
                            })
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (InstructorsAction);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2971);
/* harmony import */ var _DashboardContainerDataLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7917);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__, _DashboardContainerDataLoader__WEBPACK_IMPORTED_MODULE_3__]);
([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__, _DashboardContainerDataLoader__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const DashboardContainer = (param)=>{
    let { showDummyData, dummyDataIsInstructor } = param;
    const [authState, _] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__/* .AuthContext */ .V);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DashboardContainerDataLoader__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            showDummyData: showDummyData,
            dummyDataIsInstructor: dummyDataIsInstructor
        })
    });
};
/* harmony default export */ __webpack_exports__.Z = (DashboardContainer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7917:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _modules_Authentication__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3508);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7294);
/* harmony import */ var _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2971);
/* harmony import */ var _modules_UserMartialArts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3341);
/* harmony import */ var _DashboardProfile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4081);
/* harmony import */ var _DashboardActions_DashboardActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(518);
/* harmony import */ var _DashboardStats__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4429);
/* harmony import */ var _NotificationBox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1852);
/* harmony import */ var _DashboardCredentialsOwned__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(918);
/* harmony import */ var _DashbaordIssueCredentials__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9931);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_modules_Authentication__WEBPACK_IMPORTED_MODULE_1__, _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_3__, _DashboardProfile__WEBPACK_IMPORTED_MODULE_4__, _DashboardActions_DashboardActions__WEBPACK_IMPORTED_MODULE_5__, _NotificationBox__WEBPACK_IMPORTED_MODULE_7__]);
([_modules_Authentication__WEBPACK_IMPORTED_MODULE_1__, _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_3__, _DashboardProfile__WEBPACK_IMPORTED_MODULE_4__, _DashboardActions_DashboardActions__WEBPACK_IMPORTED_MODULE_5__, _NotificationBox__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












const DashboardContainerDataLoader = (param)=>{
    let { showDummyData, dummyDataIsInstructor } = param;
    const [disciplinesLoaded, setDisciplinesLoaded] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [disciplines, setDisciplines] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(Array());
    const [authState, _] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_3__/* .AuthContext */ .V);
    const [isInstructor, setIsInstructor] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const getDummyAddress = ()=>{
        if (dummyDataIsInstructor) {
            return "B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx";
        } else {
            return "B62qjBcYihfVGHyQGuxgG5m4QbPrq6jEEMys5p4fe4Pt33CmWy7Bvuq";
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        (async ()=>{
            // let path = "'../../../public/credentials/UserCredentials.js'";
            // const {PassportCredential} = await import(/* webpackIgnore: true */'http://localhost:3001/scripts/PassportCredential');
            // let pass = new PassportCredential();
            // pass.id = "test";
            // console.log("DashboardContainer: PassportCredential loaded");
            // console.log(pass.hash());
            console.log("DashboardContainer: useEffect loaded");
            if (!authState.userAuthenticated && showDummyData) {
                console.log("USING DUMMY DATA!");
                authState.userAuthenticated = true;
                authState.userAddress = getDummyAddress();
                _modules_Authentication__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z.address = getDummyAddress();
            }
            if (authState.userAuthenticated) {
                const disciplines = new _modules_UserMartialArts__WEBPACK_IMPORTED_MODULE_10__/* .UserMartialArts */ ._();
                const userDisciplines = await disciplines.getMartialArts(authState.userAddress);
                console.log("found user disciplines: " + userDisciplines.length);
                setDisciplines(userDisciplines);
                setDisciplinesLoaded(true);
                // get a boolen if the user is an instructor from the userDisciplines collection
                const instructor = userDisciplines.find((discipline)=>discipline.isInstructor);
                setIsInstructor(instructor ? true : false);
            }
        })();
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: " lg:py-10 min-h-screen",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("section", {
                className: "place-self-center lg:col-span-7 space-y-8",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "m-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-8",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_NotificationBox__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {}),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            children: [
                                disciplinesLoaded && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DashboardProfile__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                    disciplines: disciplines
                                }),
                                !disciplinesLoaded && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "m-auto",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                        className: "loading loading-dots loading-lg"
                                    })
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("section", {
                className: "place-self-center lg:col-span-7 space-y-8",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "m-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-8",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DashbaordIssueCredentials__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {})
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("section", {
                className: "place-self-center lg:col-span-7 space-y-8",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "m-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-8",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DashboardCredentialsOwned__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {})
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("section", {
                className: "place-self-center lg:col-span-7 space-y-8",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "m-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16",
                        children: [
                            disciplinesLoaded && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DashboardActions_DashboardActions__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                isInstructor: isInstructor,
                                disciplines: disciplines
                            }),
                            !disciplinesLoaded && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "m-auto",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "loading loading-dots loading-lg"
                                })
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("section", {
                className: "place-self-center lg:col-span-7 space-y-8",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "m-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DashboardStats__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {})
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (DashboardContainerDataLoader);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 918:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);


const DashBoardCredentialsOwned = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "carousel w-full",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                id: "slide1",
                className: "carousel-item relative w-full",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "card w-96 bg-base-100",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "card-body",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "card-title",
                                    children: "License"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    children: "Issued by the Ministry of Works & Transport"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "card-actions justify-end",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        className: "btn btn-primary",
                                        children: "View Credential"
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "card w-96 bg-base-100",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "card-body",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "card-title",
                                    children: "Bsc. Computing"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    children: "Issued by the University of the West Indies"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "card-actions justify-end",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        className: "btn btn-primary",
                                        children: "View Credential"
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "card w-96 bg-base-100",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "card-body",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "card-title",
                                    children: "National ID"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    children: "Issued by the EBC"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "card-actions justify-end",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        className: "btn btn-primary",
                                        children: "View Credential"
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                href: "#slide2",
                                className: "btn btn-circle",
                                children: "❮"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                href: "#slide2",
                                className: "btn btn-circle",
                                children: "❯"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                id: "slide2",
                className: "carousel-item relative w-full",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "card w-96 bg-base-100",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "card-body",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "card-title",
                                    children: "National ID"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    children: "Issued by the EBC"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "card-actions justify-end",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        className: "btn btn-primary",
                                        children: "View Credential"
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "card w-96 bg-base-100",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "card-body",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "card-title",
                                    children: "Passport"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    children: "Issued by the Ministry of Legal Affairs"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "card-actions justify-end",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        className: "btn btn-primary",
                                        children: "View Credential"
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "card w-96 bg-base-100",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "card-body",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    className: "card-title",
                                    children: "Deed"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                    children: "Issued by the Ministry of Housing"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "card-actions justify-end",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                        className: "btn btn-primary",
                                        children: "View Credential"
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                href: "#slide1",
                                className: "btn btn-circle",
                                children: "❮"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                href: "#slide1",
                                className: "btn btn-circle",
                                children: "❯"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (DashBoardCredentialsOwned);


/***/ }),

/***/ 4081:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2971);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__]);
_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const DashboardProfile = (param)=>{
    let { disciplines } = param;
    const verifiedClass = "card w-96 bg-yellow-300 text-primary-content";
    const unVerifiedClass = "card w-96 bg-zinc-300 text-primary-content";
    const [verified, setverified] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("bg-blue-100");
    const [authState, _] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__/* .AuthContext */ .V);
    const shortName = ()=>{
        let address = authState.userAddress;
        return address.substring(0, 5) + "..." + address.substring(address.length - 5, address.length);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                    width: "319",
                    height: "198",
                    xmlnsXlink: "http://www.w3.org/1999/xlink",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("defs", {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    id: "welcome-a",
                                    d: "M64 0l64 128-64-20-64 20z"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    id: "welcome-e",
                                    d: "M40 0l40 80-40-12.5L0 80z"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                    id: "welcome-g",
                                    d: "M40 0l40 80-40-12.5L0 80z"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                                    x1: "50%",
                                    y1: "0%",
                                    x2: "50%",
                                    y2: "100%",
                                    id: "welcome-b",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                            stopColor: "#A5B4FC",
                                            offset: "0%"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                            stopColor: "#818CF8",
                                            offset: "100%"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
                                    x1: "50%",
                                    y1: "24.537%",
                                    x2: "50%",
                                    y2: "100%",
                                    id: "welcome-c",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                            stopColor: "#4338CA",
                                            offset: "0%"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                                            stopColor: "#6366F1",
                                            stopOpacity: "0",
                                            offset: "100%"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
                            fill: "none",
                            fillRule: "evenodd",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
                                    transform: "rotate(64 36.592 105.604)",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("mask", {
                                            id: "welcome-d",
                                            fill: "#fff",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("use", {
                                                xlinkHref: "#welcome-a"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("use", {
                                            fill: "url(#welcome-b)",
                                            xlinkHref: "#welcome-a"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                            fill: "url(#welcome-c)",
                                            mask: "url(#welcome-d)",
                                            d: "M64-24h80v152H64z"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
                                    transform: "rotate(-51 91.324 -105.372)",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("mask", {
                                            id: "welcome-f",
                                            fill: "#fff",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("use", {
                                                xlinkHref: "#welcome-e"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("use", {
                                            fill: "url(#welcome-b)",
                                            xlinkHref: "#welcome-e"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                            fill: "url(#welcome-c)",
                                            mask: "url(#welcome-f)",
                                            d: "M40.333-15.147h50v95h-50z"
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
                                    transform: "rotate(44 61.546 392.623)",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("mask", {
                                            id: "welcome-h",
                                            fill: "#fff",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("use", {
                                                xlinkHref: "#welcome-g"
                                            })
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("use", {
                                            fill: "url(#welcome-b)",
                                            xlinkHref: "#welcome-g"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                            fill: "url(#welcome-c)",
                                            mask: "url(#welcome-h)",
                                            d: "M40.333-15.147h50v95h-50z"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                        className: "text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1",
                        children: [
                            "Good afternoon, ",
                            authState.userAuthenticated && shortName(),
                            " \uD83D\uDC4B"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                        className: "dark:text-indigo-200 pb-2",
                        children: "Create your Verified Credentials..."
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "grid grid-cols-1 gap-4 lg:grid-cols-2 items-center ",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "grid grid-cols-3",
                                children: disciplines.map((discipline, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                                href: "#my_modal_8",
                                                children: !discipline.verified ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-3 rounded dark:bg-blue-900 dark:text-blue-300",
                                                    children: [
                                                        discipline.discipline,
                                                        " : ",
                                                        discipline.rank
                                                    ]
                                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "bg-yellow-300 text-blue-800 text-xs font-medium mr-2 px-2.5 py-3 rounded dark:bg-blue-900 dark:text-blue-300",
                                                    children: [
                                                        discipline.discipline,
                                                        " : ",
                                                        discipline.rank
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "modal",
                                                id: "my_modal_8",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "modal-box ",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                            className: "font-bold text-lg",
                                                            children: "Hello!"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            className: "py-4",
                                                            children: "This modal works with anchor links"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                            className: "modal-action",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                                                href: "#",
                                                                className: "btn btn-primary",
                                                                children: "Close"
                                                            })
                                                        })
                                                    ]
                                                })
                                            })
                                        ]
                                    }, index))
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                className: "inline-block rounded btn-primary px-12 py-3 text-center text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400",
                                href: "#add_action_modal",
                                children: "Create Verifiable Credential"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (DashboardProfile);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4429:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);

const DashboardStats = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("section", {
        className: "place-self-center lg:col-span-7 space-y-8",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("header", {
                    className: "text-center",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                        className: "text-3xl font-bold sm:text-4xl",
                        children: "Verifiable Credential Stats"
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "m-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "stats w-full ",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "card w-100 bg-gray-100 shadow-xl mr-5",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "card-body",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                            className: "card-title",
                                            children: "More Stats!"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                            children: "Would You like to see more interesting Verifiable Credential stats?"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "card-actions justify-end",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                className: "btn btn-primary",
                                                children: "More Stats"
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "stat bg-gray-100 rounded-l-lg",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "stat-figure text-primary",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            className: "inline-block w-8 h-8 stroke-current",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "2",
                                                d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "stat-title",
                                        children: "Total Verifiable Credentials"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "stat-value text-primary",
                                        children: "25.6K"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "stat-desc",
                                        children: "21% more than last month"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "stat bg-gray-100",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "stat-figure text-secondary",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            className: "inline-block w-8 h-8 stroke-current",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "2",
                                                d: "M13 10V3L4 14h7v7l9-11h-7z"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "stat-title",
                                        children: "Number of supported credential types"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "stat-value text-secondary",
                                        children: "2.6M"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "stat-desc",
                                        children: "21% more than last month"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "stat bg-gray-100",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "stat-figure text-secondary",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "avatar online",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                                className: "w-16 rounded-full",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                    src: "/assets/images/jutsu.png"
                                                })
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "stat-title",
                                        children: "Number of credentials issued"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "stat-value",
                                        children: "3005"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                        className: "stat-desc text-secondary",
                                        children: "105 credentials issued in the last 24 hrs"
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    });
};
/* harmony default export */ __webpack_exports__.Z = (DashboardStats);


/***/ }),

/***/ 8144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var _modules_Authentication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3508);
/* harmony import */ var _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2971);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1163);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6154);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_modules_Authentication__WEBPACK_IMPORTED_MODULE_2__, _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_3__]);
([_modules_Authentication__WEBPACK_IMPORTED_MODULE_2__, _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// midway iteration






//import { defineComponent } from "vue";
const apiUrl = "http://localhost:3001/api/credentials";
const AddForm = ()=>{
    const addressRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const [authState, setAuthState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_3__/* .AuthContext */ .V);
    const [visibility, setVisibility] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("invisible");
    const [fieldTypeValue, setfieldTypeValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const handlefieldTypeValueChange = async (event)=>{
        setfieldTypeValue(event.target.value);
    };
    const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        {
            id: 1,
            name: "",
            type: "CircuitString"
        }
    ]);
    const [nextRowId, setNextRowId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(2);
    const [vcNameValue, setVCNameValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [vcDescriptionValue, setVCDescriptionValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [fieldNameValue, setfieldNameValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const handleVCNameChange = async (event)=>{
        setVCNameValue(event.target.value);
    };
    const handleVCDescriptionChange = async (event)=>{
        setVCDescriptionValue(event.target.value);
    };
    const addAnotherField = ()=>{
        console.log("Adding another row to define fields...");
        setRows([
            ...rows,
            {
                id: nextRowId,
                name: "",
                type: "CircuitString"
            }
        ]);
        setNextRowId(nextRowId + 1);
    };
    const removeRow = (id)=>{
        const updatedRows = rows.filter((row)=>row.id !== id);
        setRows(updatedRows);
    };
    const handleChange = (id, field, value)=>{
        const updatedRows = rows.map((row)=>row.id === id ? {
                ...row,
                [field]: value
            } : row);
        setRows(updatedRows);
    };
    const addVeriableCredential = async (event)=>{
        setAuthState({
            ...authState,
            alertAvailable: true,
            alertMessage: "Adding Verifiable Credential, please wait this can take a few mins",
            alertNeedsSpinner: true
        });
        next_router__WEBPACK_IMPORTED_MODULE_4___default().back();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        console.log("Name: ", vcNameValue);
        console.log("Description: ", vcDescriptionValue);
        console.log("Field Name: ", fieldNameValue);
        console.log("Field Type: ", fieldTypeValue);
        // let studentID = Authentication.address;
        // console.log("studentID", studentID);
        // let client = Authentication.zkClient! as AllMaWorkerEventsClient;
        // console.log('client', client);
        // console.log('adding Verifiable Credential...', vcNameValue, vcDescriptionValue);
        // console.log(`fetching account ... ${Authentication.contractAddress} @ ${new Date().toLocaleTimeString()}}`);
        // setAuthState({ ...authState, alertAvailable: true, alertMessage: `Fetching account, please wait this can take a few mins`, alertNeedsSpinner: true });
        // await client.fetchAccount({ publicKey: PublicKey.fromBase58(Authentication.contractAddress) });
        // setAuthState({ ...authState, alertAvailable: true, alertMessage: `Invoking contracts, please wait this can take a few mins`, alertNeedsSpinner: true });
        // console.log(`fetching account done ${Authentication.contractAddress} @ ${new Date().toLocaleTimeString()}`);
        // let credentialFields = Array<CredentialField>();
        // if(rows[0].name !== ""){
        //   rows.forEach(element => {
        //     credentialFields.push(new CredentialField(element.name, "", element.type));
        //   });
        // }
        // console.log(credentialFields);
        let credentialFields = Array();
        //let vcID = crypto.randomBytes(16).toString("hex"),
        if (rows[0].name !== "") {
            rows.forEach((element)=>{
                credentialFields.push({
                    name: element.name,
                    description: "",
                    type: element.type
                });
            });
        }
        var _Authentication_address;
        let credentialMetaData = {
            name: vcNameValue,
            description: vcDescriptionValue,
            owner: (_Authentication_address = _modules_Authentication__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.address) !== null && _Authentication_address !== void 0 ? _Authentication_address : "2n1VVuNBQof37isET7MBTPkD5VRfE7T8xRpKtD1BAinfy1GuQWux",
            created: new Date().toISOString(),
            version: "1.0",
            fields: credentialFields
        };
        console.log(credentialFields);
        console.log(credentialMetaData);
        const requestHeaders = {
            "Content-Type": "application/json"
        };
        let data = credentialMetaData; // JSON.stringify(credentialMetaData);
        console.log(data);
        // const request = await axios.post(apiUrl, data, {
        //   headers: requestHeaders,
        // });
        axios__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z.post(apiUrl, data).then((res)=>{
            console.log("VC added");
            console.log(res);
            console.log(res.data);
            setAuthState({
                ...authState,
                alertAvailable: true,
                alertMessage: "Adding credential please check back later",
                alertNeedsSpinner: false
            });
        }).catch((err)=>{
            // Handle error
            console.log("Something went wrong.");
            console.log(data);
            console.log(err.toJSON());
        });
    //   let result = await client.add(studentID, rankValue, disciplineValue);
    //   console.log("result", result);
    //   if (result && result.success) {
    //     console.log("result", result);
    //     console.log("proving update transaction...");
    //     setAuthState({ ...authState, alertAvailable: true, alertMessage: `Proving transaction, please wait this can take a few mins`, alertNeedsSpinner: true });
    //     await client.proveUpdateTransaction();
    //     console.log("sending transaction...");
    //     setAuthState({ ...authState, alertAvailable: true, alertMessage: `Sending transaction, please approve the transaction on your wallet`, alertNeedsSpinner: true });
    //     let hash = await client.sendTransaction();
    //     console.log("transaction sent");
    //     // if hash is not empty or null, then we have a transaction hash
    //     if (hash) {
    //       let hashStr = `https://berkeley.minaexplorer.com/transaction/${hash}`;
    //       let hashlink = `<a href="${hashStr}" class="btn btn-sm" target="_blank">View transaction</a>`;
    //       console.log("transaction", hashStr);
    //       result = await client.updateBackingStore(disciplineValue);
    //       console.log("result", result);
    //       if (result.success) {
    //         setAuthState({ ...authState, alertAvailable: true, alertMessage: `Add martial art transaction submitted ${hashlink}`, alertNeedsSpinner: false });
    //       }
    //       else {
    //         setAuthState({ ...authState, hasAlert: true, alertMessage: result.message, needsLoading: false });
    //       }
    //     }
    //     else {
    //       setAuthState({ ...authState, hasAlert: true, alertMessage: `Add martial art transaction failed, try again later`, needsLoading: false });
    //     }
    //   }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                className: "text-3xl font-bold sm:text-4xl",
                children: "Create Verifiable Credential"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "divider"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-1 space-y-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-control",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "label",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-base label-text",
                                    children: "Name"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                type: "text",
                                id: "name",
                                onChange: handleVCNameChange,
                                className: "input input-bordered w-full max-w-xs",
                                placeholder: "Enter verifiable credential name"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-control",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "label",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-base label-text",
                                    children: "Description"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                type: "text",
                                id: "name",
                                onChange: handleVCDescriptionChange,
                                className: "input input-bordered w-full max-w-xs",
                                placeholder: "Enter a description"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-section",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                className: "text-2xl font-bold sm:text-3xl",
                                children: "Define fields"
                            }),
                            rows.map((row, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "form-row grid grid-cols-4 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "form-control",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    className: "label",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-base label-text vc-fieldName",
                                                        children: "Name"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                                    type: "text",
                                                    className: "input input-bordered w-full max-w-xs",
                                                    placeholder: "Enter field name.",
                                                    value: row.name,
                                                    onChange: (e)=>handleChange(row.id, "name", e.target.value)
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "form-control",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                                    className: "label",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                        className: "text-base label-text vc-fieldName",
                                                        children: "Type"
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                                    className: "select select-bordered w-full max-w-xs",
                                                    value: row.type,
                                                    onChange: (e)=>handleChange(row.id, "type", e.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                                            children: "Field"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                                            children: "Bool"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                                            children: "CircuitString"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                                            children: "PublicKey"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        rows.length > 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex items-end",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                className: "btn btn-square",
                                                onClick: ()=>removeRow(row.id),
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    className: "h-6 w-6",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: "2",
                                                        d: "M6 18L18 6M6 6l12 12"
                                                    })
                                                })
                                            })
                                        }),
                                        index === rows.length - 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                            className: "flex items-end",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                                                onClick: addAnotherField,
                                                className: "btn btn-sm btn-accent",
                                                children: "Add Another"
                                            })
                                        })
                                    ]
                                }, row.id))
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: addVeriableCredential,
                            className: "btn btn-primary",
                            children: "Add Verifiable Credential"
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (AddForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _components_QRCodeScanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9191);
/* harmony import */ var _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2971);
/* harmony import */ var _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3508);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1163);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7294);
/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9466);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__, _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__, o1js__WEBPACK_IMPORTED_MODULE_6__]);
([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__, _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__, o1js__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const PromoteForm = ()=>{
    const [authState, setAuthState] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useContext)(_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__/* .AuthContext */ .V);
    const [disciplineValue, setDisciplineValue] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("");
    const handleDiscipleineChange = async (event)=>{
        setDisciplineValue(event.target.value);
    };
    const [rankValue, setRankValue] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("");
    const handleRankChange = async (event)=>{
        setRankValue(event.target.value);
    };
    const [studentValue, setStudentValue] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("");
    const handleStudentChange = async (event)=>{
        setStudentValue(event.target.value);
    };
    const [notifyStudentValue, setNotifyStudentValue] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("");
    const handleNotifyStudentChange = async (event)=>{
        setNotifyStudentValue(event.target.value);
    };
    const handleScan = async (event)=>{
        if (event) {
            console.log(event);
            setStudentValue(event);
        }
    };
    const promoteMartialArtist = async (event)=>{
        setAuthState({
            ...authState,
            alertAvailable: true,
            alertMessage: "Promoting Martial Artist, please wait this can take a few mins",
            alertNeedsSpinner: true
        });
        next_router__WEBPACK_IMPORTED_MODULE_4___default().back();
        let instructorID = _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.address;
        let studentID = studentValue;
        let client = _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.zkClient;
        setAuthState({
            ...authState,
            alertAvailable: true,
            alertMessage: "Fetching contract for promotion, please wait this can take a few mins",
            alertNeedsSpinner: true
        });
        console.log("fetching account ".concat(_modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.contractAddress, " @ ").concat(new Date().toLocaleTimeString()));
        await client.fetchAccount({
            publicKey: o1js__WEBPACK_IMPORTED_MODULE_6__/* .PublicKey */ .nh.fromBase58(_modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.contractAddress)
        });
        setAuthState({
            ...authState,
            alertAvailable: true,
            alertMessage: "Invoking contracts for promotion, please wait this can take a few mins",
            alertNeedsSpinner: true
        });
        console.log("fetching account done ".concat(_modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.contractAddress, " @ ").concat(new Date().toLocaleTimeString()));
        let result = await client.promoteStudent(studentID, rankValue, instructorID, disciplineValue);
        console.log("result", result);
        if (result && result.success) {
            console.log("result", result);
            console.log("proving update transaction...");
            setAuthState({
                ...authState,
                alertAvailable: true,
                alertMessage: "Proving transaction for promotion, please wait this can take a few mins",
                alertNeedsSpinner: true
            });
            await client.proveUpdateTransaction();
            console.log("sending transaction...");
            setAuthState({
                ...authState,
                alertAvailable: true,
                alertMessage: "Sending transaction for promotion, please approve the transaction on your wallet",
                alertNeedsSpinner: true
            });
            let hash = await client.sendTransaction();
            console.log("transaction sent");
            // if hash is not empty or null, then we have a transaction hash
            if (hash) {
                let hashStr = "https://berkeley.minaexplorer.com/transaction/".concat(hash);
                let hashlink = '<a href="'.concat(hashStr, '" class="btn btn-sm" target="_blank">View transaction</a>');
                console.log("transaction", hashStr);
                result = await client.updateBackingStore(disciplineValue);
                console.log("result", result);
                if (result.success) {
                    setAuthState({
                        ...authState,
                        alertAvailable: true,
                        alertMessage: "Promote student transaction submitted ".concat(hashlink),
                        alertNeedsSpinner: false
                    });
                } else {
                    setAuthState({
                        ...authState,
                        hasAlert: true,
                        alertMessage: result.message,
                        needsLoading: false
                    });
                }
            } else {
                setAuthState({
                    ...authState,
                    hasAlert: true,
                    alertMessage: "Promote transaction failed, try again later",
                    needsLoading: false
                });
            }
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                className: "text-3xl font-bold sm:text-4xl",
                children: "Promote your student"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "divider"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-1 space-y-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-control",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "label",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-base label-text",
                                    children: "Student address"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "join",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_QRCodeScanner__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                                        uniqueID: "promote-form-scan",
                                        className: "btn join-item",
                                        onScan: handleScan
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        onChange: handleStudentChange,
                                        value: studentValue,
                                        className: "input input-bordered join-item "
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-control",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "label",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-base label-text",
                                    children: "Marital Art discipline"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                onChange: handleDiscipleineChange,
                                className: "select select-bordered w-full max-w-xs ",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Select a Martial Art"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "BJJ"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Judo"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Karate"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-control",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "label",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-base label-text",
                                    children: "Marital Art rank"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                onChange: handleRankChange,
                                className: "select select-bordered w-full max-w-xs ",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Select a Rank"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "White Belt"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Blue Belt"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Purple Belt"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Brown Belt"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Black Belt"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "form-control",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                            className: "label cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "label-text",
                                    children: "Notfiy your student?"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                    onChange: handleNotifyStudentChange,
                                    type: "checkbox",
                                    className: "checkbox"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: promoteMartialArtist,
                            className: "btn btn-accent",
                            children: "Promote"
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (PromoteForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _components_QRCodeScanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9191);
/* harmony import */ var _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2971);
/* harmony import */ var _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3508);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1163);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7294);
/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9466);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__, _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__, o1js__WEBPACK_IMPORTED_MODULE_6__]);
([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__, _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__, o1js__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const ProveForm = ()=>{
    const [authState, setAuthState] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useContext)(_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__/* .AuthContext */ .V);
    const [disciplineValue, setDisciplineValue] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("");
    const handleDiscipleineChange = async (event)=>{
        setDisciplineValue(event.target.value);
    };
    const [inquirerValue, setInquirerValue] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("");
    const handleStudentChange = async (event)=>{
        setInquirerValue(event.target.value);
    };
    const handleScan = async (event)=>{
        if (event) {
            console.log(event);
            setInquirerValue(event);
        }
    };
    const proveMartialArtist = async (event)=>{
        setAuthState({
            ...authState,
            alertAvailable: true,
            alertMessage: "Proving Martial Artist, please wait this can take a few mins",
            alertNeedsSpinner: true
        });
        next_router__WEBPACK_IMPORTED_MODULE_4___default().back();
        let practitionerID = _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.address;
        let inquirerID = inquirerValue;
        let client = _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.zkClient;
        setAuthState({
            ...authState,
            alertAvailable: true,
            alertMessage: "Fetching account for prove rank, please wait this can take a few mins",
            alertNeedsSpinner: true
        });
        console.log("fetching account ".concat(_modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.contractAddress, " @ ").concat(new Date().toLocaleTimeString()));
        await client.fetchAccount({
            publicKey: o1js__WEBPACK_IMPORTED_MODULE_6__/* .PublicKey */ .nh.fromBase58(_modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.contractAddress)
        });
        setAuthState({
            ...authState,
            alertAvailable: true,
            alertMessage: "Invoking contracts for prove rank, please wait this can take a few mins",
            alertNeedsSpinner: true
        });
        //console.log(`Proving martial art rank for ${practitionerID} to ${inquirerID} for discipline ${disciplineValue}`);
        console.log("fetching account done ".concat(_modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.contractAddress, " @ ").concat(new Date().toLocaleTimeString()));
        await client.prove(practitionerID, inquirerID, disciplineValue);
        //await client.proveYourRank(inquirerID, "white", practitionerID, disciplineValue);
        setAuthState({
            ...authState,
            alertAvailable: true,
            alertMessage: "Proving transaction fro prove rank, please wait this can take a few mins",
            alertNeedsSpinner: true
        });
        await client.proveUpdateTransaction();
        setAuthState({
            ...authState,
            alertAvailable: true,
            alertMessage: "Sending transaction for prove rank, please approve the transaction on your wallet",
            alertNeedsSpinner: true
        });
        let hash = await client.sendTransaction();
        if (hash) {
            let hashStr = "https://berkeley.minaexplorer.com/transaction/".concat(hash);
            let hashlink = '<a href="'.concat(hashStr, '" class="btn btn-sm" target="_blank">View transaction</a>');
            setAuthState({
                ...authState,
                alertAvailable: true,
                alertMessage: "Prove martial art rank transaction submitted ".concat(hashlink),
                alertNeedsSpinner: false
            });
        } else {
            setAuthState({
                ...authState,
                hasAlert: true,
                alertMessage: "Prove martial art rank transaction failed, try again later",
                needsLoading: false
            });
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                className: "text-3xl font-bold sm:text-4xl",
                children: "Prove your rank"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "divider"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-1 space-y-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-control",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "label",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-base label-text",
                                    children: "Inquirer address"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "join",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_QRCodeScanner__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                                        uniqueID: "prove-form-scan",
                                        className: "btn join-item",
                                        onScan: handleScan
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        onChange: handleStudentChange,
                                        value: inquirerValue,
                                        className: "input input-bordered join-item "
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-control",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "label",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-base label-text",
                                    children: "Marital Art discipline"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                onChange: handleDiscipleineChange,
                                className: "select select-bordered w-full max-w-xs ",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Select a Martial Art"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "BJJ"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Judo"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Karate"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: proveMartialArtist,
                            className: "btn btn-accent",
                            children: "Prove"
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (ProveForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _components_QRCodeScanner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9191);
/* harmony import */ var _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2971);
/* harmony import */ var _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3508);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1163);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7294);
/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9466);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__, _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__, o1js__WEBPACK_IMPORTED_MODULE_6__]);
([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__, _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__, o1js__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const RevokeForm = ()=>{
    const [authState, setAuthState] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useContext)(_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__/* .AuthContext */ .V);
    const [disciplineValue, setDisciplineValue] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("");
    const handleDiscipleineChange = async (event)=>{
        setDisciplineValue(event.target.value);
    };
    const [studentValue, setStudentValue] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("");
    const handleStudentChange = async (event)=>{
        setStudentValue(event.target.value);
    };
    const [notifyStudentValue, setNotifyStudentValue] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("");
    const handleNotifyStudentChange = async (event)=>{
        setNotifyStudentValue(event.target.value);
    };
    const handleScan = async (event)=>{
        if (event) {
            console.log(event);
            setStudentValue(event);
        }
    };
    const promoteMartialArtist = async (event)=>{
        setAuthState({
            ...authState,
            alertAvailable: true,
            alertMessage: "Revoking a Martial Artist, please wait this can take a few mins",
            alertNeedsSpinner: true
        });
        next_router__WEBPACK_IMPORTED_MODULE_4___default().back();
        let instructorID = _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.address;
        let studentID = studentValue;
        console.log("studentID", studentID);
        let client = _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.zkClient;
        setAuthState({
            ...authState,
            alertAvailable: true,
            alertMessage: "Fetching account for revoke student, please wait this can take a few mins",
            alertNeedsSpinner: true
        });
        await client.fetchAccount({
            publicKey: o1js__WEBPACK_IMPORTED_MODULE_6__/* .PublicKey */ .nh.fromBase58(_modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.contractAddress)
        });
        setAuthState({
            ...authState,
            alertAvailable: true,
            alertMessage: "Invoking contracts fro revoke student, please wait this can take a few mins",
            alertNeedsSpinner: true
        });
        let result = await client.revokeStudent(studentID, instructorID, disciplineValue);
        console.log("result", result);
        if (result && result.success) {
            console.log("result", result);
            console.log("proving update transaction...");
            setAuthState({
                ...authState,
                alertAvailable: true,
                alertMessage: "Proving transaction for revoke student, please wait this can take a few mins",
                alertNeedsSpinner: true
            });
            await client.proveUpdateTransaction();
            console.log("sending transaction...");
            setAuthState({
                ...authState,
                alertAvailable: true,
                alertMessage: "Sending transaction for revoke student, please approve the transaction on your wallet",
                alertNeedsSpinner: true
            });
            let hash = await client.sendTransaction();
            console.log("transaction sent");
            // if hash is not empty or null, then we have a transaction hash
            if (hash) {
                let hashStr = "https://berkeley.minaexplorer.com/transaction/".concat(hash);
                let hashlink = '<a href="'.concat(hashStr, '" class="btn btn-sm" target="_blank">View transaction</a>');
                console.log("transaction", hashStr);
                result = await client.updateBackingStore(disciplineValue);
                console.log("result", result);
                if (result.success) {
                    setAuthState({
                        ...authState,
                        alertAvailable: true,
                        alertMessage: "Revoke martial artist transaction submitted ".concat(hashlink),
                        alertNeedsSpinner: false
                    });
                } else {
                    setAuthState({
                        ...authState,
                        hasAlert: true,
                        alertMessage: result.message,
                        needsLoading: false
                    });
                }
            } else {
                setAuthState({
                    ...authState,
                    hasAlert: true,
                    alertMessage: "Revoke martial artist transaction failed, try again later",
                    needsLoading: false
                });
            }
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                className: "text-3xl font-bold sm:text-4xl",
                children: "Revoke your student's rank"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "divider"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "grid grid-cols-1 space-y-6",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-control",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "label",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-base label-text",
                                    children: "Student address"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "join",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_QRCodeScanner__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                                        uniqueID: "revoke-form-scan",
                                        className: "btn join-item",
                                        onScan: handleScan
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                        onChange: handleStudentChange,
                                        value: studentValue,
                                        className: "input input-bordered join-item "
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "form-control",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
                                className: "label",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "text-base label-text",
                                    children: "Marital Art discipline"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                onChange: handleDiscipleineChange,
                                className: "select select-bordered w-full max-w-xs ",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Select a Martial Art"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "BJJ"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Judo"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("option", {
                                        children: "Karate"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "form-control",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                            className: "label cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                    className: "label-text",
                                    children: "Notfiy your student?"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                    onChange: handleNotifyStudentChange,
                                    type: "checkbox",
                                    className: "checkbox"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                        className: "",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
                            onClick: promoteMartialArtist,
                            className: "btn btn-accent",
                            children: "Revoke"
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ __webpack_exports__.Z = (RevokeForm);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var flowbite_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3569);
/* harmony import */ var _StudentList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3280);
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8873);
/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9466);
/* harmony import */ var _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2971);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_5__, _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_6__]);
([o1js__WEBPACK_IMPORTED_MODULE_5__, _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const InstructorMartialArts = (param)=>{
    let { martialArts } = param;
    let [showStudents, setShowStudents] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [authState, _] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_6__/* .AuthContext */ .V);
    const getMartialArt = async (discipline)=>{
        let instructorAddress = o1js__WEBPACK_IMPORTED_MODULE_5__/* .PublicKey */ .nh.fromBase58("B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx");
        //let studentAddress = PublicKey.fromBase58("B62qpzAWcbZSjzQH9hiTKvHbDx1eCsmRR7dDzK2DuYjRT2sTyW9vSpR");
        console.log("authState", authState);
        let address = authState.userAddress == "" ? instructorAddress : o1js__WEBPACK_IMPORTED_MODULE_5__/* .PublicKey */ .nh.fromBase58(authState.userAddress);
    // let backingStore = new FirebaseBackingStore(discipline);
    // //let martialArt = await backingStore.get(instructorAddress);
    // let martialArt = await backingStore.get(address);
    // return backingStore.getObjectFromStruct(martialArt);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        (async ()=>{
            if (authState.userAuthenticated) {
                setShowStudents(true);
            }
        })();
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                    className: "text-3xl font-bold sm:text-4xl",
                    children: "Manage my students"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "divider"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex space-x-4 items-center justify-center gap-2 overflow-x-hidden p-4 ",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                            href: "#promote_modal",
                            className: "btn btn-primary",
                            children: "Promote"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                            href: "#revoke_modal",
                            className: "btn btn-warning",
                            children: "Revoke"
                        })
                    ]
                }),
                showStudents && martialArts.map((i, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "collapse collapse-plus bg-gray-100 mb-5",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
                                type: "radio",
                                name: "my-accordion-3",
                                className: "w-full"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "collapse-title text-xl font-medium text-primary",
                                children: i.discipline
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                className: "collapse-content",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_StudentList__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                    studentList: i.students
                                })
                            })
                        ]
                    }, index))
            ]
        })
    });
};
/* harmony default export */ __webpack_exports__.Z = (InstructorMartialArts);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1852:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: function() { return /* binding */ NotificationBox; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7294);
/* harmony import */ var _layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2971);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__]);
_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
// https://stackoverflow.com/questions/73479439/how-to-trigger-an-custom-alert-component-in-a-different-component
//https://stackblitz.com/edit/react-ts-nv3cv2?file=ToggleAlert.tsx



function NotificationBox() {
    const [authState, setAuthState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_layout_AuthPage__WEBPACK_IMPORTED_MODULE_2__/* .AuthContext */ .V);
    const clearAlert = async (event)=>{
        setAuthState({
            ...authState,
            alertAvailable: false,
            alertMessage: "",
            alertNeedsSpinner: false
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: authState.alertAvailable && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md",
                    role: "alert",
                    children: [
                        authState.alertNeedsSpinner && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            className: "loading loading-bars mr-2 loading-xs"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                            dangerouslySetInnerHTML: {
                                __html: authState.alertMessage
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                            href: "#",
                            onClick: clearAlert,
                            className: "btn btn-sm btn-circle btn-ghost float-right",
                            children: "X"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "divider"
                })
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3280:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: function() { return /* binding */ sections_StudentList; }
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/flowbite-react/lib/esm/index.js + 204 modules
var esm = __webpack_require__(3569);
;// CONCATENATED MODULE: ./src/components/sections/StudentTile.js





// const propTypes = {
//     name: PropTypes.string,
//     rank: PropTypes.string,
//     martialArt: PropTypes.string,
//     certified: PropTypes.bool,
//     promotedDate: PropTypes.string,
// }
// const defaultProps = {
//     name: 'John Doe',
//     rank: 'White Belt',
//     martialArt: 'Jiu Jitsu',
//     certified: 'false',
//     promotedDate: '01/01/2021',
// }
const StudentTile = (param)=>{
    let { student, ...props } = param;
    let shortName = (address)=>{
        return address.substring(0, 5) + "..." + address.substring(address.length - 5, address.length);
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: "card w-50 shadow-xl",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("figure", {
                className: "bg-gray-100"
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "card-body",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                        className: "card-title",
                        children: shortName(student.publicKey)
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "text-primary",
                        children: student.rank
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ var sections_StudentTile = (StudentTile);

;// CONCATENATED MODULE: ./src/components/sections/StudentList.js





// const StudentType = PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     rank: PropTypes.string.isRequired,
//     promotedDate: PropTypes.string.isRequired,
//   });
// const propTypes = {
//     studentList: PropTypes.arrayOf(StudentType).isRequired,
// }
// const defaultProps = {
//     studentList: [],
// }
const StudentList = (param)=>{
    let { studentList, ...props } = param;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: "grid grid-cols-4 gap-4",
        children: studentList.map((student, index)=>/*#__PURE__*/ (0,jsx_runtime.jsx)(sections_StudentTile, {
                student: student
            }, index))
    });
};
/* harmony default export */ var sections_StudentList = (StudentList);


/***/ }),

/***/ 3508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9466);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_0__]);
o1js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const Authentication = {
    contractAddress: "B62qkDQqHBkiL6bXWh2RU81C1fBLQqQVK3CMVmW7DAq1yiAg2QPRtdC",
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
    bjjAddAddress: "B62qkDQqHBkiL6bXWh2RU81C1fBLQqQVK3CMVmW7DAq1yiAg2QPRtdC",
    /** @type {any} */ setBjjAddClient: function(client) {
        this.bjjAddClient = client;
    },
    bjjPromoteClient: null,
    bjjPromoteAddress: "B62qkDQqHBkiL6bXWh2RU81C1fBLQqQVK3CMVmW7DAq1yiAg2QPRtdC",
    /** @type {any} */ setBjjPromoteClient: function(client) {
        this.bjjPromoteClient = client;
    },
    /** @type {any} */ setZkClient: function(client) {
        this.zkClient = client;
    },
    /** @type {any} */ setContractsLoader: function(loader) {
        this.contractsLoader = loader;
    },
    /** @type {any} */ getContractsFromLoader: function() {
        return this.contractsLoader.contracts;
    },
    /** @type {boolean} */ loadSnarky: async function() {
        await this.zkClient.loado1js();
        await this.zkClient.setActiveInstanceToBerkeley();
        this.snarkyLoaded = true;
        return true;
    },
    /** @type {boolean} */ checkForWallet: async function() {
        const mina = window.mina;
        this.hasWallet = mina != null;
        return this.hasWallet;
    },
    /** @type {boolean} */ login: async function() {
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
            } else if (e.message == "please create or restore wallet first") {
                result.error = e.message;
                result.message = "Please create or restore a wallet first!";
            }
            return result;
        }
    },
    /** @type {boolean} */ doesAccountExist: async function() {
        const publicKey = o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh.fromBase58(this.address);
        const res = await this.zkClient.fetchAccount({
            publicKey: publicKey
        });
        console.log("does account exist", res);
        this.fundAccount = res.error != null;
        return !this.fundAccount;
    },
    /** @type {boolean} */ setupContracts: async function() {
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
        const zkappPublicKey = o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh.fromBase58(this.contractAddress);
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
    /** @type {boolean} */ setupBjjAddContracts: async function() {
        await this.bjjAddClient.loadContract();
        console.log("loaded bjjAddClient contract");
        await this.bjjAddClient.compileContract();
        console.log("compiled bjjAddClient contract");
        const zkappPublicKey = o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh.fromBase58(this.bjjAddAddress);
        await this.bjjAddClient.initZkappInstance(zkappPublicKey);
        console.log("initialized bjjAddClient zkapp instance");
        return true;
    },
    /** @type {boolean} */ setupBjjPromoteContracts: async function() {
        await this.bjjPromoteClient.loadContract();
        console.log("loaded bjjPromoteClient contract");
        await this.bjjPromoteClient.compileContract();
        console.log("compiled bjjPromoteClient contract");
        const zkappPublicKey1 = o1js__WEBPACK_IMPORTED_MODULE_0__/* .PublicKey */ .nh.fromBase58(this.bjjPromoteAddress);
        await this.bjjPromoteClient.initZkappInstance(zkappPublicKey1);
        console.log("initialized bjjPromoteClient zkapp instance");
        this.hasBeenSetup = true;
        //this.contractsLoader.loadAll();
        //this.hasBeenSetup = true;
        return true;
    },
    /** @type {any} */ fetchZkappAccount: async function() {
        await this.zkClient.fetchAccount({
            publicKey: this.contractAddress
        });
    },
    /** @type {any} */ getNum: async function() {
        if (this.hasBeenSetup) {
            //const zkappPublicKey = PublicKey.fromBase58('B62qqEme9EYMj3KC4vSXij2vAwt8qxLiKLsrHPprQeYXXmjTFUH16wF');
            await this.zkClient.fetchAccount({
                publicKey: this.contractAddress
            });
            const currentNum = await this.zkClient.getNum();
            console.log("current state:", currentNum.toString());
        } else {
            console.log("has not been setup");
        }
    },
    address: "",
    /** @type {string} */ getShortAddress: function() {
        return this.address.substring(0, 5) + "..." + this.address.substring(this.address.length - 5, this.address.length);
    }
};
/* harmony default export */ __webpack_exports__.Z = (Authentication);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2333:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const Snackbar = (text, duration)=>{
    const div = document.createElement("div");
    div.setAttribute("style", "-webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;animation: fadein 0.5s, fadeout 0.5s 2.5s;;min-width: 250px;margin-left: -125px; background-color: rgba(0, 0, 0, 0.257); color: #fff; text-align: center; border-radius: 2px; padding: 16px; position: fixed; z-index: 1; left: 50%;top: 70px;");
    const node = document.createTextNode(text);
    div.appendChild(node);
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(div);
    setTimeout(function() {
        body.removeChild(div);
    }, duration);
};
/* harmony default export */ __webpack_exports__.Z = (Snackbar);


/***/ }),

/***/ 3341:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: function() { return /* binding */ UserMartialArts; }
/* harmony export */ });
/* unused harmony export UserMartialArt */
class UserMartialArt {
}
class UserMartialArts {
    async getMartialArts(publicKey) {
        let martialArts = new Array();
        let disciples = [
            "BJJ",
            "Judo",
            "Karate"
        ];
        for (let disciple of disciples){
            let userMartialArt = await this.getMartialArt(publicKey, disciple);
            if (userMartialArt.hasMartialArt) {
                martialArts.push(userMartialArt);
            }
        }
        return martialArts;
    }
    async getMartialArt(publicKey, discipline) {
        //let backingStore = new FirebaseBackingStore(discipline);
        //let martialArt = await backingStore.get(instructorAddress);
        let practioner = null; //await this.getPractioner(backingStore, publicKey);
        if (practioner == null) {
            return {
                hasMartialArt: false,
                isInstructor: false,
                publicKey: publicKey,
                discipline: discipline,
                rank: "",
                instructor: "",
                students: [],
                verified: false
            };
        } else {
            // let students = await backingStore.getAllStudents(publicKey);
            return {
                hasMartialArt: true,
                isInstructor: false,
                publicKey: publicKey,
                discipline: discipline,
                rank: "",
                instructor: "",
                students: [],
                verified: false //practioner!.verified
            };
        }
    }
}


/***/ }),

/***/ 9556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: function() { return /* binding */ AllMaWorkerEventsClient; }
/* harmony export */ });
/* harmony import */ var o1js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9466);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([o1js__WEBPACK_IMPORTED_MODULE_0__]);
o1js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

class AllMaWorkerEventsClient {
    async revokeStudent(studentPublicKey, instructorPublicKey, discipline) {
        console.log("prove client", studentPublicKey, instructorPublicKey, discipline);
        const result = await this._call("revokeStudent", {
            studentPublicKey,
            instructorPublicKey,
            discipline
        });
        return result;
    }
    async prove(address, inquirer, discipline) {
        console.log("prove client", address, inquirer, discipline);
        const result = await this._call("prove", {
            address,
            inquirer,
            discipline
        });
        return result;
    }
    // ---------------------------------------------------------------------------------------
    loado1js() {
        return this._call("loado1js", {});
    }
    setupLocalBlockchain() {}
    setActiveInstanceToBerkeley() {
        return this._call("setActiveInstanceToBerkeley", {});
    }
    loadContract() {
        return this._call("loadContract", {});
    }
    compileContract() {
        return this._call("compileContract", {});
    }
    fetchAccount(param) {
        let { publicKey } = param;
        console.log("fetchAccount inside client", publicKey.toBase58());
        const result = this._call("fetchAccount", {
            publicKey58: publicKey.toBase58()
        });
        return result;
    }
    initZkappInstance(publicKey) {
        return this._call("initZkappInstance", {
            publicKey58: publicKey.toBase58()
        });
    }
    async getStorageRoot(discipline) {
        const result = await this._call("getStorageRoot", {
            discipline
        });
        return o1js__WEBPACK_IMPORTED_MODULE_0__/* .Field */ .gN.fromJSON(JSON.parse(result));
    }
    async setStorageRoot(root, discipline) {
        await this._call("setStorageRoot", {
            root,
            discipline
        });
    }
    async add(address, rank, discipline) {
        console.log("add client", address, rank);
        const result = await this._call("add", {
            address,
            rank,
            discipline
        });
        return result;
    }
    async updateBackingStore(discipline) {
        const result = await this._call("updateBackingStore", {
            discipline
        });
        return result;
    }
    async promoteStudent(studentPublicKey, rank, instructorPublicKey, discipline) {
        const result = await this._call("promoteStudent", {
            studentPublicKey,
            rank,
            instructorPublicKey,
            discipline
        });
        return result;
    }
    async proveYourRank(studentPublicKey, rank, instructorPublicKey, discipline) {
        const result = await this._call("proveYourRank", {
            studentPublicKey,
            instructorPublicKey,
            discipline
        });
        return result;
    }
    async proveUpdateTransaction() {
        await this._call("proveUpdateTransaction", {});
    }
    async sendTransaction() {
        let transactionJSON = await this.getTransactionJSON();
        let transactionFee = 0.1;
        const { hash } = await window.mina.sendTransaction({
            transaction: transactionJSON,
            feePayer: {
                fee: transactionFee,
                memo: ""
            }
        });
        const transactionLink = "https://berkeley.minaexplorer.com/transaction/".concat(hash);
        console.log("View transaction at ".concat(transactionLink));
        return hash;
    }
    async getTransactionJSON() {
        const result = await this._call("getTransactionJSON", {});
        return result;
    }
    _call(fn, args) {
        return new Promise((resolve, reject)=>{
            this.promises[this.nextId] = {
                resolve,
                reject
            };
            const message = {
                id: this.nextId,
                fn,
                args
            };
            this.worker.postMessage(message);
            this.nextId++;
        });
    }
    constructor(){
        this.worker = new Worker(__webpack_require__.tu(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(9), __webpack_require__.b)));
        this.promises = {};
        this.nextId = 0;
        this.worker.onmessage = (event)=>{
            this.promises[event.data.id].resolve(event.data.data);
            delete this.promises[event.data.id];
        };
    }
}


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.a(module, async function (__webpack_handle_async_dependencies__, __webpack_async_result__) { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Dashboard; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2971);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7294);
/* harmony import */ var _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3508);
/* harmony import */ var _components_sections_DashboardContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8120);
/* harmony import */ var _components_layout_DashboardHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6061);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_1__, _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__, _components_sections_DashboardContainer__WEBPACK_IMPORTED_MODULE_4__, _components_layout_DashboardHeader__WEBPACK_IMPORTED_MODULE_5__]);
([_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_1__, _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__, _components_sections_DashboardContainer__WEBPACK_IMPORTED_MODULE_4__, _components_layout_DashboardHeader__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






function Dashboard() {
    const [address, setAddress] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [showAddress, setShowAddress] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const showAddressModalRef = react__WEBPACK_IMPORTED_MODULE_2__.useRef(null);
    const showAddressModal = async ()=>{
        let tempAddress = _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.address ? _modules_Authentication__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.address : "No address loaded"; // Authentication.address;
        setAddress(tempAddress);
        setShowAddress(true);
        try {
            window.share_address_modal.showModal();
        } catch (error) {
            console.log(error);
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_layout_AuthPage__WEBPACK_IMPORTED_MODULE_1__/* .AuthPage */ .W, {
        validate: false,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_layout_DashboardHeader__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("main", {
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                    className: "rankproof-page",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "rankproof-content-wrap",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_sections_DashboardContainer__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                showDummyData: true,
                                dummyDataIsInstructor: true
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("footer", {
                                className: "bg-gray-100 dark:bg-gray-800",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                href: "#",
                                                className: "flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                        src: "/assets/images/logo.png",
                                                        className: "h-6 mr-3 sm:h-9",
                                                        alt: "RankProof Logo"
                                                    }),
                                                    "Whisper Key"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
                                                className: "block text-sm text-center text-gray-500 dark:text-gray-400",
                                                children: "\xa9 2021-2022 Whisper Key. All Rights Reserved."
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                                                className: "flex justify-center mt-5 space-x-5",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                                            href: "#",
                                                            className: "text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                                                className: "w-5 h-5",
                                                                fill: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                "aria-hidden": "true",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                                    fillRule: "evenodd",
                                                                    d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                                                                    clipRule: "evenodd"
                                                                })
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                                            href: "#",
                                                            className: "text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                                                className: "w-5 h-5",
                                                                fill: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                "aria-hidden": "true",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                                    fillRule: "evenodd",
                                                                    d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
                                                                    clipRule: "evenodd"
                                                                })
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                                            href: "#",
                                                            className: "text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                                                className: "w-5 h-5",
                                                                fill: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                "aria-hidden": "true",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                                    d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                                                })
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                                            href: "#",
                                                            className: "text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                                                className: "w-5 h-5",
                                                                fill: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                "aria-hidden": "true",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                                    fillRule: "evenodd",
                                                                    d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                                                                    clipRule: "evenodd"
                                                                })
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
                                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
                                                            href: "#",
                                                            className: "text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400",
                                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
                                                                className: "w-5 h-5",
                                                                fill: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                "aria-hidden": "true",
                                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
                                                                    fillRule: "evenodd",
                                                                    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z",
                                                                    clipRule: "evenodd"
                                                                })
                                                            })
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [674,566,556,445,664,602,774,888,179], function() { return __webpack_exec__(9637); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);