import QRCode from "qrcode";

const getVerificationUrl = (verificationCode) => {
  const baseUrl = process.env.APP_BASE_URL || "http://localhost:5000";

  return `${baseUrl}/v1/verify/${verificationCode}`;
};

const generateQRCode = async (verificationCode) => {
  const verificationUrl = getVerificationUrl(verificationCode);

  const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 500,
  });

  return {
    verificationUrl,
    qrDataUrl,
  };
};

const generateQRCodeBuffer = async (verificationCode) => {
  const verificationUrl = getVerificationUrl(verificationCode);

  return QRCode.toBuffer(verificationUrl, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 500,
    type: "png",
  });
};

export { generateQRCode, generateQRCodeBuffer, getVerificationUrl };
