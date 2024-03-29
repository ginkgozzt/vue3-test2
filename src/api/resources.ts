
import request from '../utils/request'
export const getResourcesData = async () => {
  let res = await request({url:'/aos/resources',isError: false})
  let items = res?.data?.items || [];
  let arr: Array<any> = [];
  for (const type of items) {
    const url = `/aos/resources/${type}/objects`;
    let res = await request({url,isError: false})
    let items = res?.data?.items || [];
    items.map((val: any) => {
      try {
        val.archive_content = JSON.parse(val.archive_content);
      } catch (err) {}
    });
    arr.push(...items);
  }
  let obj:any = {};
  for (const item of arr) {
    const derivedData = getWholedData(item);
    obj[item.name] = {
      ...derivedData,
    };
  }
  function getWholedData(item: any) {
    const archive_content = item.archive_content || {};
    let { properties, ...ortherProperty } = archive_content;
    const derived_from = archive_content.derived_from;
    let naxtItem = arr.find((val) => val.name === derived_from);
    if (naxtItem) {
      naxtItem = JSON.parse(JSON.stringify(naxtItem));
      const derivedData = getWholedData(naxtItem);
      if (derivedData) {
        properties = Object.assign(derivedData.properties, properties);
        ortherProperty = Object.assign(derivedData, ortherProperty);
      }
    }
    return {
      ...ortherProperty,
      properties,
    };
  }
  window.localStorage.setItem("aosResourcesData", JSON.stringify(obj));
  return obj
}
export const getTemplateData = async() =>{
  let res = await request({url:'/aos/templates?filter_by=name:contains:zzt',isError: false});
  let items = res?.data?.items || [];
  console.log(items,'items,aaaaa');
  let arr:Array<any> = [];
  return arr;
  

}