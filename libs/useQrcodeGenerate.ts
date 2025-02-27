import promptQR from 'promptpay-qr';
import QRCode from 'qrcode';

export const promptpayGenerate = async (promptpay: string, price: number) => {
    const promptPayQR = await promptQR(promptpay, { amount: price });
    const base64 = await QRCode.toDataURL(promptPayQR);
    console.log('complete');
    return base64;
}