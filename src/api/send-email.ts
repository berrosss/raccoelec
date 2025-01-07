// filepath: /Users/abdoberros/projects/JS/raccoelec/pages/api/send-email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { formData } = req.body;

  // Create a transporter
   const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, 
    port: Number(process.env.SMTP_PORT), 
    secure: process.env.SMTP_SECURE === 'true', 
    auth: {
      user: process.env.SMTP_USER, 
      pass: process.env.SMTP_PASS,
    },
  } as nodemailer.TransportOptions);

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "barah.abderahim@gmail.com",
    subject: 'New Form Submission',
    html: `
      <h4>Ma demande</h4>
      <ul>
        <li>Votre Besoin: <strong>${formData.need}</strong></li>
        <li>Bénéficiaire: <strong>${formData.beneficiare}</strong></li>
        <li>Nom & Prenom: <strong>${formData.name} ${formData.prenom}</strong></li>
        <li>Email: <strong>${formData.email}</strong></li>
        <li>Téléphone: <strong>${formData.phone}</strong></li>
      </ul>
      <h4>Mon Project</h4>
      <ul>
        <li>Le type de site souhaitez-vous raccorder: <strong>${formData.type}</strong></li>
        <li>${formData.autreType}</li>
      </ul>
      <h4>Mon Planning</h4>
      <ul>
        <li>Où se situe votre projet: <strong>${formData.codePostal}, ${formData.commune}, ${formData.cadastral}, ${formData.voie}, ${formData.facultatif}</strong></li>
        <li>Votre terrain est viabilisé?: <strong>${formData.viabilise}</strong></li>
        <li>Puissance maximale (en kVA)?: <strong>${formData.puissance}</strong></li>
        <li>Les portes extérieures et fenêtres de mon local est: <strong>${formData.portes}</strong></li>
        <li>Echéance souhaiter que le raccordement soit effectué: <strong>${formData.echeance}</strong></li>
        <li>Autorisation d'urbanisme: <strong>${formData.autorisation}</strong></li>
      </ul>
    `,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
};