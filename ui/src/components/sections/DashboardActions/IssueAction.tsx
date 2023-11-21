import { useEffect, useState, useContext, Component, ChangeEvent } from "react";
import { DashboardActionsProps } from "./DashboardActions";
import React from "react";
import Authentication from "@/modules/Authentication";
import { CredentialMetadata, CredentialField } from '../../../modules/CredentialMetadata';
import CredentialForm from '../CredentialForm';
import QRCodeCreator from "@/components/QRCodeCreator";

const IssueAction: React.FC<DashboardActionsProps> = ({ isInstructor }) => {

  const [selectedCredential, setSelectedCredential] = useState<CredentialMetadata | null>(null);
    const [credentialMetaDataList, setCredentialMetaDataList] = useState<CredentialMetadata[]>([]);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedCredentialObject = credentialMetaDataList.find(vc => vc.name === selectedValue);
        selectedCredentialObject!.issuer = Authentication.address;
        // Do something with the selectedCredentialObject, such as updating state
        setSelectedCredential(selectedCredentialObject || null);
    };

    useEffect(() => {
        // This will log the updated value after the state has been successfully updated
        console.log(selectedCredential?.name);
    }, [selectedCredential]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const credsApi = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/created/${Authentication.address}`;

                console.log('credsAPi: ', credsApi)
                if(!credsApi){
                    throw new Error('API URL not defined in environment variables.');
                }    
                let result = [];
                try      {
                const response = await fetch(credsApi);
                 result = await response.json();
            } catch (error) {
                console.error('Error trying to fetch Credential Metadata', error);
            }

                let creds : CredentialMetadata[] = result as CredentialMetadata[];
 let passport = {
        name: "DummyPassportCredential",
        owner: "3e42",
        fields:[
            {  description: "", name: "number", type: "CircuitString"},
            { description: "", name: "expiryDate", type: "CircuitString"},
            { description: "", name: "unique", type: "Field"},
            { description: "", name: "address", type: "PublicKey"},
            { description: "", name: "name", type: "CircuitString"}
        ]
    } as CredentialMetadata;
    creds.push(passport);
                setCredentialMetaDataList(creds);
            } catch (error) {
                console.error('Error trying to fetch Credential Metadata', error);
            }
        }
        fetchData();
    }, []);

  return (
    <div>
      <a
        className="cursor-pointer block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
        href="#svg_issue_credential_modal"
      >

        <span className="inline-block rounded-lg bg-gray-50 p-3">
          {/* <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#652dc5" viewBox="0 0 16 20"> */}
            {/* <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" /> */}
            {/* <path d="M54.1076508,14.717124c-0.0053024-0.0955-0.0237999-0.1876001-0.0559006-0.2779007 c-0.0102005-0.0284996-0.0171013-0.0567999-0.0298004-0.0840998c-0.0480995-0.1046-0.1090012-0.2038994-0.1932983-0.2884998 c0,0-3.4248009-3.4394999-6.8535004-6.8759999c-1.7139015-1.7188001-3.4297028-3.4356-4.7187996-4.7227001 c-0.9531021-0.9511001-1.5810013-1.5781001-2.0234032-1.9677001c-0.006897-0.0098-0.0136986-0.0186-0.0205002-0.0284 c-0.0009995-0.0019-0.0019989-0.0029-0.0029984-0.0048l-0.0078011,0.0058c-0.6213989-0.5415-0.8670006-0.6004-1.1478996-0.4306 l-26.0746994,0.0009c-1.7079992,0-3.0977001,1.3907001-3.0977001,3.0996001v50.5655022 c0,0.8661995,0.3369007,1.6805992,0.9522009,2.2967987c0.6053991,0.6026001,1.4413996,0.9482994,2.2928991,0.9482994h13.1513996 c0.5527,0,1-0.4473,1-1c0-0.5527992-0.4473-1-1-1H13.1264496c-0.3270998,0-0.6483994-0.1338005-0.8799-0.3633003 c-0.2323999-0.232399-0.3652-0.5536995-0.3652-0.8817978V3.1427238c0-0.6064,0.4922009-1.0996001,1.0977001-1.0996001 l25.4626007-0.0009c0.0377007,2.2823002-0.0049019,8.6077995-0.0485992,12.7186995 c-0.002903,0.2676001,0.1016006,0.5244007,0.2891006,0.7139006c0.1875,0.1904001,0.4442978,0.2967997,0.7108994,0.2967997 h12.7255974v38.0997009c0,0.2851028-0.1152,0.5634003-0.3173981,0.7656021 c-0.2041016,0.2040977-0.4756012,0.3163986-0.7645988,0.3163986h-0.455101c-0.5527,0-1,0.4472008-1,1c0,0.5527,0.4473,1,1,1 h0.455101c0.8241997,0,1.5985985-0.3213005,2.1796989-0.9033012c0.5732002-0.5732994,0.902298-1.3671989,0.902298-2.1786995 V14.7716236C54.1186485,14.7523241,54.1087494,14.7362242,54.1076508,14.717124z M40.4038506,13.7716236 C40.45755,8.5080242,40.4741516,5.380024,40.4585495,3.4992237c2.3398018,2.3340001,6.6297989,6.6346998,10.2538986,10.2723999 H40.4038506z"></path> <path d="M46.4301491,49.4289246c-0.0370979-0.1273003-0.0993004-0.2401009-0.1764984-0.3384018 c1.4456978-1.7341003,2.3171997-3.9636993,2.3171997-6.3979988c0-5.5228004-4.4771996-10-10-10c-5.5228996,0-10,4.4771996-10,10 c0,2.5708008,0.9783993,4.9075012,2.5725002,6.6790009L27.7680492,60.942524 c-0.1103001,0.3779984,0.0117016,0.7862015,0.3116016,1.0419998c0.299799,0.2549019,0.7206993,0.3086014,1.0770988,0.1416016 l3.4014015-1.6162033l2.1376991,3.0996017c0.1884003,0.2734985,0.4980011,0.4326973,0.8232002,0.4326973 c0.0565987,0,0.1133003-0.0048981,0.169899-0.0146942c0.3848-0.0664024,0.6953011-0.3496017,0.7959023-0.7266045 l2.2945976-8.5613976l2.2943001,8.5613976c0.1006012,0.3760033,0.410202,0.6592026,0.7938995,0.7266045 c0.0577011,0.0097961,0.1152992,0.0146942,0.1719017,0.0146942c0.3241997,0,0.6319008-0.157299,0.8213005-0.4296989 l2.1436005-3.0839996l3.3993988,1.5996017c0.3554001,0.1660004,0.7753983,0.1102982,1.0760994-0.1455002 c0.2989006-0.2549019,0.4199982-0.6621017,0.3096008-1.0401001L46.4301491,49.4289246z M38.5708504,34.5973244 c4.4636993,0,8.0951996,3.6315002,8.0951996,8.0951996c0,4.4637985-3.6315002,8.0952988-8.0951996,8.0952988 c-4.4637985,0-8.0953007-3.6315002-8.0953007-8.0952988C30.4755497,38.2288246,34.1070518,34.5973244,38.5708504,34.5973244z M35.1137505,60.692524l-1.3925018-2.0185013c-0.2792969-0.4043007-0.809597-0.5478973-1.2519989-0.3359985l-2.1571999,1.024498 l2.4841995-8.5150986c1.3003006,0.9225998,2.8286018,1.5391998,4.4862022,1.7528992L35.1137505,60.692524z M45.0913506,58.3586235 c-0.4424019-0.2080994-0.9687996-0.0654984-1.2471008,0.3348999l-1.3964996,2.0088005l-2.1875992-8.1632004 c1.6489983-0.2812004,3.1576996-0.9631996,4.4260979-1.9464989l2.5623016,8.781601L45.0913506,58.3586235z"></path> <path d="M38.5708504,47.692524c2.7613983,0,5-2.2384987,5-5c0-2.7613983-2.2386017-5-5-5c-2.7614021,0-5,2.2386017-5,5 C33.5708504,45.4540253,35.8094482,47.692524,38.5708504,47.692524z M38.5708504,39.692524c1.6542015,0,3,1.3457985,3,3 c0,1.6543007-1.3457985,3-3,3c-1.6543007,0-3-1.3456993-3-3C35.5708504,41.0383224,36.9165497,39.692524,38.5708504,39.692524z" /> */}
          {/* </svg> */}
          <svg fill="#652dc5" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
            <path d="M54.1076508,14.717124c-0.0053024-0.0955-0.0237999-0.1876001-0.0559006-0.2779007 c-0.0102005-0.0284996-0.0171013-0.0567999-0.0298004-0.0840998c-0.0480995-0.1046-0.1090012-0.2038994-0.1932983-0.2884998 c0,0-3.4248009-3.4394999-6.8535004-6.8759999c-1.7139015-1.7188001-3.4297028-3.4356-4.7187996-4.7227001 c-0.9531021-0.9511001-1.5810013-1.5781001-2.0234032-1.9677001c-0.006897-0.0098-0.0136986-0.0186-0.0205002-0.0284 c-0.0009995-0.0019-0.0019989-0.0029-0.0029984-0.0048l-0.0078011,0.0058c-0.6213989-0.5415-0.8670006-0.6004-1.1478996-0.4306 l-26.0746994,0.0009c-1.7079992,0-3.0977001,1.3907001-3.0977001,3.0996001v50.5655022 c0,0.8661995,0.3369007,1.6805992,0.9522009,2.2967987c0.6053991,0.6026001,1.4413996,0.9482994,2.2928991,0.9482994h13.1513996 c0.5527,0,1-0.4473,1-1c0-0.5527992-0.4473-1-1-1H13.1264496c-0.3270998,0-0.6483994-0.1338005-0.8799-0.3633003 c-0.2323999-0.232399-0.3652-0.5536995-0.3652-0.8817978V3.1427238c0-0.6064,0.4922009-1.0996001,1.0977001-1.0996001 l25.4626007-0.0009c0.0377007,2.2823002-0.0049019,8.6077995-0.0485992,12.7186995 c-0.002903,0.2676001,0.1016006,0.5244007,0.2891006,0.7139006c0.1875,0.1904001,0.4442978,0.2967997,0.7108994,0.2967997 h12.7255974v38.0997009c0,0.2851028-0.1152,0.5634003-0.3173981,0.7656021 c-0.2041016,0.2040977-0.4756012,0.3163986-0.7645988,0.3163986h-0.455101c-0.5527,0-1,0.4472008-1,1c0,0.5527,0.4473,1,1,1 h0.455101c0.8241997,0,1.5985985-0.3213005,2.1796989-0.9033012c0.5732002-0.5732994,0.902298-1.3671989,0.902298-2.1786995 V14.7716236C54.1186485,14.7523241,54.1087494,14.7362242,54.1076508,14.717124z M40.4038506,13.7716236 C40.45755,8.5080242,40.4741516,5.380024,40.4585495,3.4992237c2.3398018,2.3340001,6.6297989,6.6346998,10.2538986,10.2723999 H40.4038506z"></path> <path d="M46.4301491,49.4289246c-0.0370979-0.1273003-0.0993004-0.2401009-0.1764984-0.3384018 c1.4456978-1.7341003,2.3171997-3.9636993,2.3171997-6.3979988c0-5.5228004-4.4771996-10-10-10c-5.5228996,0-10,4.4771996-10,10 c0,2.5708008,0.9783993,4.9075012,2.5725002,6.6790009L27.7680492,60.942524 c-0.1103001,0.3779984,0.0117016,0.7862015,0.3116016,1.0419998c0.299799,0.2549019,0.7206993,0.3086014,1.0770988,0.1416016 l3.4014015-1.6162033l2.1376991,3.0996017c0.1884003,0.2734985,0.4980011,0.4326973,0.8232002,0.4326973 c0.0565987,0,0.1133003-0.0048981,0.169899-0.0146942c0.3848-0.0664024,0.6953011-0.3496017,0.7959023-0.7266045 l2.2945976-8.5613976l2.2943001,8.5613976c0.1006012,0.3760033,0.410202,0.6592026,0.7938995,0.7266045 c0.0577011,0.0097961,0.1152992,0.0146942,0.1719017,0.0146942c0.3241997,0,0.6319008-0.157299,0.8213005-0.4296989 l2.1436005-3.0839996l3.3993988,1.5996017c0.3554001,0.1660004,0.7753983,0.1102982,1.0760994-0.1455002 c0.2989006-0.2549019,0.4199982-0.6621017,0.3096008-1.0401001L46.4301491,49.4289246z M38.5708504,34.5973244 c4.4636993,0,8.0951996,3.6315002,8.0951996,8.0951996c0,4.4637985-3.6315002,8.0952988-8.0951996,8.0952988 c-4.4637985,0-8.0953007-3.6315002-8.0953007-8.0952988C30.4755497,38.2288246,34.1070518,34.5973244,38.5708504,34.5973244z M35.1137505,60.692524l-1.3925018-2.0185013c-0.2792969-0.4043007-0.809597-0.5478973-1.2519989-0.3359985l-2.1571999,1.024498 l2.4841995-8.5150986c1.3003006,0.9225998,2.8286018,1.5391998,4.4862022,1.7528992L35.1137505,60.692524z M45.0913506,58.3586235 c-0.4424019-0.2080994-0.9687996-0.0654984-1.2471008,0.3348999l-1.3964996,2.0088005l-2.1875992-8.1632004 c1.6489983-0.2812004,3.1576996-0.9631996,4.4260979-1.9464989l2.5623016,8.781601L45.0913506,58.3586235z"></path> <path d="M38.5708504,47.692524c2.7613983,0,5-2.2384987,5-5c0-2.7613983-2.2386017-5-5-5c-2.7614021,0-5,2.2386017-5,5 C33.5708504,45.4540253,35.8094482,47.692524,38.5708504,47.692524z M38.5708504,39.692524c1.6542015,0,3,1.3457985,3,3 c0,1.6543007-1.3457985,3-3,3c-1.6543007,0-3-1.3456993-3-3C35.5708504,41.0383224,36.9165497,39.692524,38.5708504,39.692524z"></path>
          </svg>
        </span>

        <h2 className="mt-2 font-bold">Issue VC</h2>

        <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
          Issue a verifiable credential to a user.
        </p>
      </a>

      {/* <div className='modals-area'>
        <dialog className="modal" id="share_address_modal">
          <form method="dialog" className="modal-box ">
            <div className="modal-action">
              <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</a>
            </div>
            <QRCodeCreator address={address} />
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div> */}
      <div className='modals-area'>
        <dialog className="modal" id="svg_issue_credential_modal">
            <div className="modal-box w-11/12 max-w-5xl">
                <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                    <div className="modal-action">
                        <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</a>
                    </div>
                    <div>
                      <h2 className='text-2xl font-bold sm:text-2xl'>Choose a Verifiable Credential</h2>
                      <div className="form-control">
                          <label className="label">
                              <span className="text-base label-text vc-fieldName"></span>
                          </label>
                          <select className="select select-bordered w-full max-w-xs"
                              onChange={handleSelectChange}>
                                  <option>Select a Credential</option>
                              {credentialMetaDataList.map((vc, index) => (
                                  <option key={vc.name}>{vc.name}</option>
                              ))};
                          </select>
                      </div>
                        
                    </div>
                </form>
                <br />
                <div className="modal-box w-11/12 max-w-5xl">
                    {selectedCredential !== null && (<CredentialForm credentialMetadata={selectedCredential}></CredentialForm>)}
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
      </div>




      {/* <dialog className="modal" id="share_address_modal">
                    <form method="dialog" className="modal-box w-1/2 max-w-5xl">

                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      {showAddress && <QRCodeCreator address={address} />}

                    </form>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog> */}
    </div>
  );
}
export default IssueAction;