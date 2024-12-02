import { Resend } from "resend";

const resend = new Resend(process.env.REACT_APP_API_URL);

export const senVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/new-verification?token=${token}`;

  await resend.emails.send({
    from: "admin@footballhub.es",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">Click here</a> to confirm email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_APP_URL}/new-password?token=${token}`;

  await resend.emails.send({
    from: "admin@footballhub.es",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${confirmLink}">Click here</a> to reset your password.</p>`,
  });
};

export const sendContactPageForm = async (values: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  await resend.emails.send({
    from: "info@footballhub.es",
    to: "laszloscheers@gmail.com",
    subject: "Contact form message",
    html: `
    <h1>Contact Form Submission</h1>
    <p><strong>Name:</strong> ${values.name}</p>
    <p><strong>Email:</strong> ${values.email}</p>
    <p><strong>Phone:</strong> ${values.phone}</p>
    <p><strong>Message:</strong></p>
    <p>${values.message}</p>
  `,
  });
};
