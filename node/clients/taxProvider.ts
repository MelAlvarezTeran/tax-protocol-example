import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'
import { sampleRates } from '../utils/sampleTaxRates'

export class TaxProvider extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    // The first argument is the base URl of your provider API endpoint
    super('baseURL', ctx, options)
  }

  public getTaxInformation(orderInformation: CheckoutRequest) {
    const taxRate = sampleRates.find(({ ZipCode }) => JSON.stringify(ZipCode) === orderInformation.shippingDestination.postalCode)

    let taxRes: ItemTaxResponse[] 
    
    if (taxRate !== undefined) {
      taxRes =  orderInformation.items.map((item) => {
          return {
            'id': item.id,
            'taxes': [
              {  
                'name': `Region ${taxRate.TaxRegionName} - State Tax`,  
                'description': `Region ${taxRate.TaxRegionName} - State Tax`,  
                'rate': taxRate.StateRate,  
                'value': (item.itemPrice*taxRate.StateRate)*item.quantity,  
                'jurisCode': 'jurisCode',  
                'jurisType': 'jurisType',  
                'jurisName': 'jurisName',  
              },
              {  
                'name': `Region ${taxRate.TaxRegionName} - County Tax`,  
                'description': `Region Tax ${taxRate.TaxRegionName} - County Tax`,  
                'rate': taxRate.EstimatedCountyRate,  
                'value': (item.itemPrice*taxRate.EstimatedCountyRate)*item.quantity,  
                'jurisCode': 'jurisCode',  
                'jurisType': 'jurisType',  
                'jurisName': 'jurisName',  
              },
              {  
                'name': `Region ${taxRate.TaxRegionName} - City Tax`,  
                'description': `Region Tax ${taxRate.TaxRegionName} - City Tax`,  
                'rate': taxRate.EstimatedCityRate,  
                'value': (item.itemPrice*taxRate.EstimatedCityRate)*item.quantity,  
                'jurisCode': 'jurisCode',  
                'jurisType': 'jurisType',  
                'jurisName': 'jurisName',  
              },
              {  
                'name': `Region ${taxRate.TaxRegionName} - Special Rate`,  
                'description': `Region Tax ${taxRate.TaxRegionName} - Special Rate`,  
                'rate': taxRate.EstimatedSpecialRate,  
                'value': (item.itemPrice*taxRate.EstimatedSpecialRate)*item.quantity,  
                'jurisCode': 'jurisCode',  
                'jurisType': 'jurisType',  
                'jurisName': 'jurisName',  
              },
            ],
          }
      })

    } else {
      taxRes = []
    }
    

    return taxRes
  }
}