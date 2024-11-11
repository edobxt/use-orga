import Image from "next/image";

const Footer = () => {
    return (
        <div className="bg-black text-white flex flex-col justify-between items-center w-full py-8 gap-6">
            <div className="flex w-8/12 justify-around gap-10 font-bold">
                <p>ACCUEIL</p>
                <p>GALERIE</p>
                <p>CONTACT</p>
            </div>

            <Image src="/GS.png" alt="logo" width={100} height={100} />
        </div>
    )
};

export default Footer;
