import crypto from "crypto";

const generateVerificationCode = () => {
    const randomPart = crypto
        .randomBytes(10)
        .toString("hex")
        .toUpperCase();

    return `PA-${randomPart}`;
};

const generateUniqueCodes = (quantity) => {
    const codes = new Set();

    while (codes.size < quantity) {
        codes.add(
            generateVerificationCode()
        );
    }

    return [...codes];
};

export {
    generateVerificationCode,
    generateUniqueCodes
};