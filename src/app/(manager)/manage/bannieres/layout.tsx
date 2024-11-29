import ManageBannieres from "./page";

export const metadata = {
	title: `Bannières - Gestion | ${process.env.ORGA_NAME}`,
};

export default function ManageBannieresLayout() {
	return <ManageBannieres />;
}
