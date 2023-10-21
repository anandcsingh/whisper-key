import Add from "@/pages/add.page";
import LineagePage from "./LineagePage";
import LineageMap from "./LineageMap";
import Lineage from "@/pages/lineage.page";


const DashboardLineageHero = () => {

    return (
        <div>
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
                <h2 className="text-3xl font-bold sm:text-4xl">Find your Lineage</h2>
                <p className="mt-4 text-gray-600">
                    All Martial Artists can view their lineage going as far back as we have data for practitioners. All powered by the Mina blockchain and Zero-Knowledge Proofs.
                </p>

                <a className="mt-8 inline-block rounded btn-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                    href="#lineage_address_modal1">View Lineage</a>
            </div>

            <div className='modals-area'>
                <dialog className="modal" id="lineage_address_modal1">
                    <form method="dialog" className="modal-box bg-white w-11/12 max-w-5xl">
                        <div className="modal-action">
                            <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</a>
                        </div>
                        <LineagePage />
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>

        </div>
    );
}

export default DashboardLineageHero;