interface TaxResponse {
  itemTaxResponse: ItemTaxResponse[]
  hooks: Hook[]
}

interface ItemTaxResponse {
  id: string
  taxes: Tax[]
}

interface Tax {
  name: string
  value: number
}

interface Hook {
  major: number
  url: string
}

interface TaxRates {
  State: string
  ZipCode: number
  TaxRegionName: string
  EstimatedCombinedRate: number
  StateRate: number
  EstimatedCountyRate: number
  EstimatedCityRate: number
  EstimatedSpecialRate: number
  RiskLevel: number
}