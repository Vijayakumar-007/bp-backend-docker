export default class Validator {
    static isEmail(email) {
        const reg = /^[a-z]+([a-z0-9_.])*@[a-z]+(\.[a-z]{2,3})+$/i;
        return reg.test(email);
    }

    static isPasswordValid(string) {
        const reg = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
        return reg.test(string);
    }

    static isPhoneValid(phone) {
        const reg = /^\d{10}$/;
        return reg.test(phone);
    }

    static isOTPValid(otp) {
        const reg = /^\d{4}$/;
        return reg.test(otp);
    }

    static isTagValid(tag) {
        const reg = /^[A-Za-z0-9_]{2}$/;
        return reg.test(tag);
    }
    static isModificationFlagValid(modificationFlag) {
        const reg = /^[A-Za-z0-9_]{2}$/;
        return reg.test(modificationFlag);
    }
    static isCountryCodeValid(countryCode) {
        const reg = /^[A-Za-z]{2}$/;
        return reg.test(countryCode);
    }
}
