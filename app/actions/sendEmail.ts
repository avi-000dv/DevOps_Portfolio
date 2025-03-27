'use server';

import { transporter } from '@/lib/email';

export type EmailInput = {
    name: string;
    email: string;
    message: string;
};

export const sendEmail = async ({ name, email, message }: EmailInput): Promise<{ success: boolean }> => {
    try {
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: 'Johnlayda92@gmail.com',
            subject: 'New Message from Porfolio',
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        return { success: true };
    } catch (error) {
        console.error('Email error:', error);
        return { success: false };
    }
};
