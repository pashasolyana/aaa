import { instance } from '../../api/interceptor'
import { makeQuery, nullify } from '../../utils/helpers/string.helpers'

export const OtherService = {
  async getTarrifes() {
    const query = makeQuery({
      uid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: 0,
      userName: "string",
      password: "string",
      dateReg: "2023-04-03T19:26:04.547Z",
      groupName: "string",
      marketPvz: 0,
      clientVersion: "string",
      companyCode: "string",
      paymentType: 0
    })

    const response = await instance.post(
      '/gen/tarifflist' + query
    )

    return response.data
  },
  async postCalcone(DataQuery = {}) {
    const response = await instance.post(
      'http://81.200.152.89/api/base/calcone', DataQuery
    )

    return response.data
  },
  async getCities(search?: string) {
    console.log(search,'1111111')
    let query = makeQuery({
      search: nullify(search)
    })
    const response = await instance.get(
      'http://81.200.152.89/api/base/findCities' + query
    )

    console.log(response.data, '111111')

    return response.data
  },

  async getRealProv() {
    const response = await instance.get(
      '/gen/getrealprov'
    )

    return response.data
  },
  async getCountryList(id: string) {
    const response = await instance.get(
      `/gen/countrylist`
    )

    return response.data
  },
  async createDelivery(createdekiveryDto = {}) {
    const response = await instance.post(
      '/gen/createdelivery', createdekiveryDto = {}
    )

    return response.data
  },
  async postPrecreateDelivery(createdekiveryDto = {}) {
    const response = await instance.post(
      '/gen/precreatedelivery', createdekiveryDto
    )

    return response.data
  },
  async ugetListDelivery(createdekiveryDto = {}) {
    const response = await instance.post(
      '/gen/getlistdelivery',
      createdekiveryDto
    )

    return response.data
  },
  async getnotscanparcel(createdekiveryDto = {}) {
    const response = await instance.post(
      '/gen/getnotscanparcel',
      createdekiveryDto
    )

    return response.data
  },
  async getlistdelivery_mobile(createdekiveryDto = {}) {
    const response = await instance.post(
      '/gen/getlistdelivery_mobile',
      createdekiveryDto
    )

    return response.data
  },
  async getdeliveryinfo(createdekiveryDto = {}) {
    const response = await instance.post(
      '/gen/getdeliveryinfo',
      createdekiveryDto
    )

    return response.data
  },
  async cancelparcel(createdekiveryDto = {}) {
    const response = await instance.post(
      '/gen/cancelparcel',
      createdekiveryDto
    )

    return response.data
  },
  async getlabel(createdekiveryDto = {}) {
    const response = await instance.post(
      '/gen/getlabel',
      createdekiveryDto
    )

    return response.data
  },
  async getStatus(number: any) {
    const response = await instance.get(`http://81.200.152.89/api/base/getstatusforparcelsimple/${number}`)

    return response.data
  },
  async getAllCities() {
    const response = await instance.get('http://81.200.152.89/api/base/city')

    return response.data
  },
}
