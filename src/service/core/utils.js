import moment from "moment";
import axios from "axios";
import * as constants from "../../config/constants";
import {config} from "../../config/config";
import {FileType} from '../../enum/common.enum';

export default class Utils {

    static getFormattedDate(date) {
        if (!date) {
            return ''
        }
        return moment(date).format('MMM D YYYY, h:mm A');
    }

    static getFormattedDate2(date) {
        if (!date) {
            return ''
        }
        return moment(date).format('DD-MM-YYYY h:mm A');
    }

    static getFormattedDate3(date) {
        if (!date) {
            return ''
        }
        return moment(date).format('DD MMM YYYY');
    }

    /**
     * @author Vijayakumar
     * 
     * To format the date to date and month in 2 digit and separator will be customizable as require while using
     * Example: 01-12-1991 or 01/12/1991
     * 
     * @param {*} date 
     * @param {*} separator 
     * @returns String
     */
    static formatTwoDigitMonth(date, separator = "-") {
        if (!date) {
            return '';
        }
        
        return moment(date).format(`DD${separator}MM${separator}YYYY`);
    }

    static getFormattedDateCalendar(date) {
        if (!date) {
            return ''
        }
        return moment(date).format('MMM D YYYY');
    }

    static getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    static getVersion() {
        const v = config.version;
        return `${v.majorRevision}.${v.minorRevision}.${v.bugFixes}`
    }

    static getFormattedAddress(residentDetails) {
        return [residentDetails.address1,
            residentDetails.address2,
            residentDetails.cityOrTown,
            residentDetails.countyOrState,
            residentDetails.claimedCountry?.text,
            residentDetails.postCode].filter(Boolean).join(", ")
    }
}
