import "@/styles/globals.css";
import Navbar from "../../components/navbar";
import HeroSection from "../../components/heroSection";
import Footer from "@/components/footer/Footer";
import DescriptionSection from "../../components/descriptionSection";
import useToken from "@/hooks/useToken/UseToken";
import {leagueNavigation} from "@/components/navbar/navigationObjects";

function HomeView () {
    const token = useToken();

    return (
        <div className={"bg-gray-900"}>
            <Navbar token={token.current} navigation={leagueNavigation} getCurrentPage={"Strona główna"}/>
            <HeroSection/>
            <DescriptionSection />
            <Footer/>
        </div>
    )
}

export default HomeView;

