import Image from "next/image";
const Nav = () => {
	return (
        <div className="w-full flex flex-col gap-10 justify-center items-center py-14 bg-gradient-to-b from-[#040c72] to-[#000]">
            <Image src="/GS.png" alt="logo" width={70} height={70} />
            <div className="text-white font-light flex flex-row gap-10">
                <p className="border-b-2">ACCEUIL</p>
                <p>GALERIE</p>
                <p>CONTACT</p>
            </div>
        </div>
    );
};

export default Nav;
