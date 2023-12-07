import {useEffect, useRef} from "react";
import "@/styles/globals.css";
import Link from "next/link";
import Navbar from "@/components/navbar";
import CtaSection from "@/components/ctaSection";
import Footer from "@/components/footer/Footer";
import DescriptionSection from "../../components/descriptionSection";
function Home () {
    let token = useRef<string | null>(null);
    useEffect(() => {
        token.current = document.cookie.split('; ').find(row => row.startsWith('token'))?.split('=')[1] || null;
        if(!token || token.current === null) {
            window.location.href = '/login';
        }
    }, [token]);



    return (
        <div className={"bg-gray-900"}>
            <Navbar token={token.current}/>
            <CtaSection/>
            <DescriptionSection />
            <Footer/>
        </div>
    )
}

export default Home;

