import { adminUrls } from '../../config/urlConfig'
import { HTTP } from '../core/http.service'

export class BenepayUserService {
  
    static uploadSettlementFile = async (req) => {
        // const result = await HTTP.post("https://ki6f28zlli.execute-api.eu-west-2.amazonaws.com/dev/v2/uploadSettlement", {name: "name"} )
        const result = await HTTP.post(adminUrls.uploadSettlementFile, req )
        if (result.status == 200) {
          return result;
        }
        return undefined;
    }

    static getFromProvidedResult = async (req) => {
        const result = await HTTP.post(adminUrls.getFromProvidedResult, req )  
        if (result.status == 200) {
          return result;
        }
        return undefined;
    }

    static getGeneratedByBenepayResult = async (req) => {
      const result = await HTTP.post(adminUrls.getGeneratedByBenepayResult, req )  
      if (result.status == 200) {
        return result;
      }
      return undefined;
    }

    static downloadFromSettlementFile = async (fileId) => {
      const url = `${adminUrls.downloadFromSettlementFile}/${fileId}`
      const result = await HTTP.get(url)
      if (result.status == 200) {
        return result;
      }
      return undefined;
    }

    static downloadGeneratedByBenepayFile = async (fileId) => {
      const url = `${adminUrls.downloadGeneratedByBenepayFile}/${fileId}`
      const result = await HTTP.get(url)
      if (result.status == 200) {
        return result;
      }
      return undefined;
    }

    static getAllMerchants = async() => {
      const url = `${adminUrls.getAllMerchants}`
      const result = await HTTP.get(url)
      if (result.status == 200) {
        return result;
      }
      return undefined;
    }

    static getMerchants = async () => {
        const result = await HTTP.get(adminUrls.getMerchants);
        console.log("results",result)
        if (result.data) {
            return result;
        }
        return undefined;

    }

    static getAllProviders = async (fileId) => {
      const url = `${adminUrls.getAllProviders}`
      const result = await HTTP.get(url)
      if (result.status == 200) {
        return result;
      }
      return undefined;
    }
    
}