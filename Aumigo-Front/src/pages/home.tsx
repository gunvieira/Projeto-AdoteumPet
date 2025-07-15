import Header from "@/components/myui/Header/Header.tsx";
import Banner from "@/components/myui/Banner/Banner.tsx";
import Footer from "@/components/myui/Footer/Footer";
import ConhecaSeuPet from "@/components/myui/Banner/ConhecaSeuPet.tsx";

export default function Home() {
    return (
        <>
            <Header/>
            <Banner/>
            <ConhecaSeuPet/>
            <Footer/>
        </>
    );
}
