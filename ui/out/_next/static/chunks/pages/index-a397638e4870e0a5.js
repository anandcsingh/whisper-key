(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[405],{

/***/ 9208:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


    (window.__NEXT_P = window.__NEXT_P || []).push([
      "/",
      function () {
        return __webpack_require__(2451);
      }
    ]);
    if(false) {}
  

/***/ }),

/***/ 2451:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Home; }
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./node_modules/next/head.js
var head = __webpack_require__(9008);
var head_default = /*#__PURE__*/__webpack_require__.n(head);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
;// CONCATENATED MODULE: ./src/components/layout/LandingPageHeader.tsx



const Header = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("nav", {
        className: "bg-gray-800",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("header", {
            className: "fixed w-full",
            children: /*#__PURE__*/ (0,jsx_runtime.jsx)("nav", {
                className: "border-gray-200 py-2.5 dark:bg-gray-900",
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: "flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("a", {
                            href: "/",
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
                                    src: "/assets/images/logo.png",
                                    className: "h-6 mr-3 sm:h-9",
                                    alt: "Whisper Key Logo"
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                    className: "self-center text-xl font-semibold whitespace-nowrap dark:text-white",
                                    children: "Whisper Key"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                            className: "flex items-center lg:order-2",
                            id: "mobile-menu-2",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)((link_default()), {
                                className: "inline-block py-2 px-4 text-sm leading-5 text-green-50 btn-primary hover:bg-indigo-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md float-right",
                                href: "/dashboard",
                                children: "Launch App"
                            })
                        })
                    ]
                })
            })
        })
    });
};
/* harmony default export */ var LandingPageHeader = (Header);

;// CONCATENATED MODULE: ./src/pages/index.page.tsx




function Home() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("title", {
                        children: "Whisper Key"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("link", {
                        rel: "icon",
                        href: "/assets/favicon.ico"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(LandingPageHeader, {}),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("main", {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("section", {
                            className: " dark:bg-gray-900",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "mr-auto place-self-center lg:col-span-7",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                                                className: "max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white",
                                                children: "Privacy enhanced Verifiable Credentials (VC) Hub"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                                                className: "max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400",
                                                children: [
                                                    "A platform where Verifiable Credential Issuers can create new types of credentials or reuse existing standards and issue them to owners with ease. Owners selectively disclose some or all the data in their Verifiable Credential with Verifiers via Zero Knowledge proofs while Verifiers obtain only the information needed. ",
                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                                                        href: "https://flowbite.com/docs/getting-started/introduction/",
                                                        className: "hover:underline",
                                                        children: "Flowbite Library"
                                                    }),
                                                    " and the ",
                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                                                        href: "https://flowbite.com/blocks/",
                                                        className: "hover:underline",
                                                        children: "Blocks System"
                                                    }),
                                                    "."
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                className: "space-y-4 sm:flex sm:space-y-0 sm:space-x-4",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("a", {
                                                        href: "https://github.com/anandcsingh/whisper-key",
                                                        className: "inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800",
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                                                                className: "w-4 h-4 mr-2 text-gray-500 dark:text-gray-400",
                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                viewBox: "0 0 496 512",
                                                                children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                                                                    d: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                                                })
                                                            }),
                                                            " View on GitHub"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)((link_default()), {
                                                        className: "inline-flex items-center justify-center w-full px-5 py-3 btn-primary text-sm font-medium text-center text-white-900 border border-indigo-200 rounded-lg sm:w-auto hover:bg-indigo-100 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white border-indigo-700 hover:bg-indigo-700 focus:ring-indigo-800",
                                                        //className="inline-flex items-center justify-center w-full px-5 py-3 text-sm text-green-50 btn-primary hover:bg-indigo-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg"
                                                        href: "/dashboard",
                                                        children: "Launch App"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                        className: "hidden lg:mt-0 lg:col-span-5 lg:flex",
                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
                                            src: "/assets/images/logo.png",
                                            alt: "credential image"
                                        })
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("section", {
                            className: "bg-gray-100 dark:bg-gray-800",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                className: "text-gray-500 sm:text-lg dark:text-gray-400",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                                                        className: "mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white",
                                                        children: "A web-based platform for creating Verifiable Credentials"
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                        className: "mb-8 font-light lg:text-xl",
                                                        children: " Below are some of the features of the platform, all powered by the Mina blockchain and Zero-Knowledge Proofs:"
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                                                        role: "list",
                                                        className: "pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700",
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                                                                className: "flex space-x-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                                                                        className: "flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400",
                                                                        fill: "currentColor",
                                                                        viewBox: "0 0 20 20",
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                                                                            fillRule: "evenodd",
                                                                            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                            clipRule: "evenodd"
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                                        className: "text-base font-medium leading-tight text-gray-900 dark:text-white",
                                                                        children: "As an Issuer based on user input automatically generate the definition of a credential and the supporting smart contract to create its proof"
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                                                                className: "flex space-x-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                                                                        className: "flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400",
                                                                        fill: "currentColor",
                                                                        viewBox: "0 0 20 20",
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                                                                            fillRule: "evenodd",
                                                                            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                            clipRule: "evenodd"
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                                        className: "text-base font-medium leading-tight text-gray-900 dark:text-white",
                                                                        children: "Search for existing credential types"
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                                                                className: "flex space-x-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                                                                        className: "flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400",
                                                                        fill: "currentColor",
                                                                        viewBox: "0 0 20 20",
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                                                                            fillRule: "evenodd",
                                                                            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                            clipRule: "evenodd"
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                                        className: "text-base font-medium leading-tight text-gray-900 dark:text-white",
                                                                        children: "Issue a Verifiable Credential to an Owner"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
                                                className: "hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex",
                                                src: "/assets/images/credentials1.png",
                                                alt: "credential test img"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
                                                className: "hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex",
                                                src: "/assets/images/credentials2.png",
                                                alt: "feature image 2"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                className: "text-gray-500 sm:text-lg dark:text-gray-400",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                                                        className: "mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white",
                                                        children: "All users can view their verified credentials"
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                        className: "mb-8 font-light lg:text-xl",
                                                        children: "Users have access to all verifiable credentials issued to them."
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                                                        role: "list",
                                                        className: "pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700",
                                                        children: [
                                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                                                                className: "flex space-x-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                                                                        className: "flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400",
                                                                        fill: "currentColor",
                                                                        viewBox: "0 0 20 20",
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                                                                            fillRule: "evenodd",
                                                                            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                            clipRule: "evenodd"
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                                        className: "text-base font-medium leading-tight text-gray-900 dark:text-white",
                                                                        children: "Share your verifiable credential via QR Code"
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                                                                className: "flex space-x-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                                                                        className: "flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400",
                                                                        fill: "currentColor",
                                                                        viewBox: "0 0 20 20",
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                                                                            fillRule: "evenodd",
                                                                            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                            clipRule: "evenodd"
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                                        className: "text-base font-medium leading-tight text-gray-900 dark:text-white",
                                                                        children: "View all credentials"
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                                                                className: "flex space-x-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                                                                        className: "flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400",
                                                                        fill: "currentColor",
                                                                        viewBox: "0 0 20 20",
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                                                                            fillRule: "evenodd",
                                                                            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                            clipRule: "evenodd"
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                                        className: "text-base font-medium leading-tight text-gray-900 dark:text-white",
                                                                        children: "Verify Fee"
                                                                    })
                                                                ]
                                                            }),
                                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("li", {
                                                                className: "flex space-x-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                                                                        className: "flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400",
                                                                        fill: "currentColor",
                                                                        viewBox: "0 0 20 20",
                                                                        xmlns: "http://www.w3.org/2000/svg",
                                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                                                                            fillRule: "evenodd",
                                                                            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                                                            clipRule: "evenodd"
                                                                        })
                                                                    }),
                                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                                                        className: "text-base font-medium leading-tight text-gray-900 dark:text-white",
                                                                        children: "Whisper Key zkApp UI"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                                        className: "font-light lg:text-xl",
                                                        children: "Written in TypeScript using the o1js library will run on the browser client generating a verifiable credential that will be issued by a certified issuer. "
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("section", {
                            className: " dark:bg-gray-900",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                className: "max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6",
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: "max-w-screen-sm mx-auto text-center",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("h2", {
                                            className: "mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white",
                                            children: "Start your free trial today"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                                            className: "mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg",
                                            children: "Enjoy using our platform and have data sovereignty with verifiable credentials issued as zk proofs by trusted parties using zk oracles "
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                                            href: "#",
                                            className: "text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800",
                                            children: "Free trial for 30 days"
                                        })
                                    ]
                                })
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("footer", {
                            className: "bg-gray-100 dark:bg-gray-800",
                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                                className: "max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10",
                                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("a", {
                                            href: "#",
                                            className: "flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
                                                    src: "/assets/images/logo.png",
                                                    className: "h-6 mr-3 sm:h-9",
                                                    alt: "RankProof Logo"
                                                }),
                                                "Whisper Key"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                                            className: "block text-sm text-center text-gray-500 dark:text-gray-400",
                                            children: "\xa9 2021-2022 RankProof™. All Rights Reserved."
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime.jsxs)("ul", {
                                            className: "flex justify-center mt-5 space-x-5",
                                            children: [
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                                                        href: "#",
                                                        className: "text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400",
                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                                                            className: "w-5 h-5",
                                                            fill: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            "aria-hidden": "true",
                                                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                                                                fillRule: "evenodd",
                                                                d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                                                                clipRule: "evenodd"
                                                            })
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                                                        href: "#",
                                                        className: "text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400",
                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                                                            className: "w-5 h-5",
                                                            fill: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            "aria-hidden": "true",
                                                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                                                                fillRule: "evenodd",
                                                                d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
                                                                clipRule: "evenodd"
                                                            })
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                                                        href: "#",
                                                        className: "text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400",
                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                                                            className: "w-5 h-5",
                                                            fill: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            "aria-hidden": "true",
                                                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                                                                d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                                            })
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                                                        href: "#",
                                                        className: "text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400",
                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                                                            className: "w-5 h-5",
                                                            fill: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            "aria-hidden": "true",
                                                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                                                                fillRule: "evenodd",
                                                                d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                                                                clipRule: "evenodd"
                                                            })
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,jsx_runtime.jsx)("li", {
                                                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("a", {
                                                        href: "#",
                                                        className: "text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400",
                                                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
                                                            className: "w-5 h-5",
                                                            fill: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            "aria-hidden": "true",
                                                            children: /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
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
        ]
    });
}


/***/ }),

/***/ 9008:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(4605)


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [664,774,888,179], function() { return __webpack_exec__(9208); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);