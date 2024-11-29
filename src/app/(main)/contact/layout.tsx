import { Metadata } from "next";
import ContactPage from "./page";

export const metadata: Metadata = {
	title: `Contact - ${process.env.ORGA_NAME}`,
};

export default function ContactLayout() {
	return <ContactPage />;
}
