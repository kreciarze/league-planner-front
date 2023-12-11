import "@/styles/globals.css";
import {useState} from "react";
import Navbar from "../../../components/navbar";
import Footer from "@/components/footer/Footer";
import useToken from "@/hooks/useToken/UseToken";
import {useRouter} from "next/router";
import useAddModel from "@/hooks/useAddModel";

function AddModel(){
    const token = useToken();
    const router = useRouter();
    const { navigation, recordCreator } = useAddModel(router.query.slug as string);

    const [itemName, setItemName] = useState<string>("");
    return (
        <>
            <Navbar token={token.current} navigation={navigation} getCurrentPage={"Strona główna"}/>
            <div className="hero min-h-screen bg-base-200">
                <div className="flex flex-col items-center lg:flex-row-reverse">
                    <div className="text-center lg:text-left mx-24">
                        <h1 className="text-5xl font-bold">Podaj nazwę swojej ligi!</h1>
                        <p className="py-6">Będziesz mógł zapisać do niej wszystkie legendy danego sportu i organizować mecze oraz turnieje!</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={async (e) => {
                            e.preventDefault();
                            await recordCreator(itemName, token.current);
                        }}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Nazwa ligi</span>
                                </label>
                                <input type="text" placeholder="Nazwa" className="input input-bordered" required onChange={
                                    (e) => {
                                        setItemName(e.target.value);
                                    }
                                }/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Opis ligi</span>
                                </label>
                                <textarea placeholder="Opis ligi" className="textarea h-24 textarea-bordered" required onChange={
                                    () => {}}/>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Dodaj</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default AddModel;

