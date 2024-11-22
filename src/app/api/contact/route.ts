import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const formData = await request.formData();

	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const subject = formData.get("subject") as string;
	const message = formData.get("message") as string;

	const transporter = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: Number(process.env.MAIL_PORT),
		secure: true,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASSWORD,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	const mailOptions = {
		from: process.env.MAIL_USER,
		to: "gs.events@gmail.com",
		subject: `GSevents - ${subject}`,
		html: `<p>Nom: ${name}</p><p>Email: ${email}</p><p>Sujet: ${subject}</p><p>Message: ${message}</p>`,
	};

	try {
		await transporter.sendMail(mailOptions);
		return NextResponse.json({ message: "Email envoyé avec succès" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Erreur lors de l'envoi de l'email" }, { status: 500 });
	}
}
