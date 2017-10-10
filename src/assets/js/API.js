import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'http://192.168.100.37:8080/juzhang';//杨鹏
axios.defaults.baseURL = 'http://39.108.57.46/juzhang';//主服务器
// axios.defaults.baseURL = 'http://jx.tunnel.qydev.com/juzhang';//嘉欣

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

export default {

  //获取科目列表
  getSubjectList(params) {        
    return axios.post('/acctTitCjx/queryAcctTitList', params)        
  },
  //获取科目列表

  //获取摘要库数据
  getAbstractList(params) {
    return axios.post('/dsignCjx/queryDigestList', params)
  },
  //获取摘要库数据

  //新增摘要库数据
  addAbstractData(params) {
    return axios.post('/dsignCjx/addDigest', params)
  },
  //新增摘要库数据

  //编辑摘要库数据
  editAbstractData(params) {
    return axios.post('/dsignCjx/updateDigest', params)
  },
  //编辑摘要库数据

  //删除摘要库数据
  delAbstractData(params) {
    return axios.post('/dsignCjx/deleteDigest', params)
  },
  //删除摘要库数据

  //获取新凭证头信息
  getVoucherHeadInfo(params) {
    return axios.post('/acctVoucherCjx/queryNewAccvouch', params)
  },
  //获取新凭证头信息

  //获取凭证字列表
  getVoucherWordOptions(params) {
    return axios.post('/dsignCjx/queryDsignList', params)
  },
  //获取凭证字列表

  //保存凭证
  saveVoucher(params) {
    return axios.post('/acctVoucherCjx/saveAccvouch', params)
  },
  //保存凭证

  //获取辅助核算列表
  getAccountingList(params) {
    return axios.post('/assistCjx/queryAssistList', params)
  },
  //获取辅助核算列表

  //获取会计科目余额
  getBalance(params) {
    return axios.post('/acctBalanceCjx/queryAcctBalance', params)
  },
  //获取会计科目余额

  //保存凭证模板
  saveNewVoucherMod(params) {
    return axios.post('/templateCjx/saveAccvouchTemplate', params)
  },
  //保存凭证模板

  //获取凭证模板类别列表
  getModClassList(params) {
    return axios.post('templateCjx/queryDoctemType', params)
  },
  //获取凭证模板类别列表

  //获取凭证模板列表
  getModList(params) {
    return axios.post('/templateCjx/queryAccvouchTemplateList', params)
  },
  //获取凭证模板列表

  //获取凭证列表
  getVoucherList(params) {
    return axios.post('/acctVoucherCjx/queryAccvouchList', params)
  },
  //获取凭证列表

  //查询凭证
  getNowVoucher(params) {
    return axios.post('/acctVoucherCjx/queryAccvouch', params)
  },
  //查询凭证

  //删除模板
  delModListData(params) {
    return axios.post('/templateCjx/deleteAccvouchTemplate', params)
  },
  //删除模板

  //查询前后凭证
  getPrevNextVoucher(params) {
    return axios.post('/acctVoucherCjx/queryAroundVoucherUid', params)
  },
  //查询前后凭证

  //获取客户树
  getCustomerTree(params) {
    return axios.post('/CompanyYp/getYpCdList', params)
  },
  //获取客户树

  //获取客户列表
  getCustomerList(params) {
    return axios.post('/CompanyYp/getYpCompanyList', params)
  },
  //获取客户列表
  //-- lxd --//


  //xgw账薄接口
  //账簿全局
  getAcctBookPeriodAndCurrency(params) {
    return axios.post('/acctBookCjx/getAcctBookPeriodAndCurrency', params)
  },
  //账簿全局
  //获取会计期间和币种
  getPeriodsCurrencysList(params) {
    return axios.post('/acctBookCjx/getAcctBookPeriodAndCurrency', params)
  },
  //获取会计期间和币种

  //默认数据获取部分科目树
  getDetailAcctCodeList(params) {
    return axios.post('/acctBookCjx/getDetailAcctCode', params)
  },
  //默认数据获取部分科目树 

  // 明细账科目信息
  getDetailAcctContent(params) {
    return axios.post('/acctBookCjx/getDetailAcctContent', params)
  },
  // 明细账科目信息

  //获取总账内容
  getTotalAcctContent(params) {
    return axios.post('/acctBookCjx/getTotalAcctContent', params)
  },
  //获取总账内容

  //获取凭证汇总信息
  getVouchTotalContent(params) {
    return axios.post('/acctBookCjx/getVouchTotalContent', params)
  },
  //获取凭证汇总信息


  //科目余额表数据
  getBalanceTotalContent(params) {
    return axios.post('/acctBookCjx/getBalanceTotalContent', params)
  },
  //科目余额表数据


  //获取数量金额科目编码
  getNumVouchCode(params) {
    return axios.post('/acctBookCjx/getNumVouchCode', params)
  },
  //获取数量金额科目编码

  //获取数量金额科目内容
  getNumVouchContent(params) {
    return axios.post('/acctBookCjx/getNumVouchContent', params)
  },
  //获取数量金额科目内容

  //获取数量金额总账内容
  getNumVouchTotal(params) {
    return axios.post('/acctBookCjx/getNumVouchTotal', params)
  },
  //获取数量金额总账内容

  //获取核算项目余额表内容
  getAssistBalance(params) {
    return axios.post('/acctBookCjx/getAssistBalance', params)
  },
  //获取核算项目余额表内容

  //获取核算项目明细账编码
  getAssistDetailCode(params) {
    return axios.post('/acctBookCjx/getAssistDetailCode', params)
  },
  //获取核算项目明细账编码

  //获取核算项目明细账内容
  getAssistDetailContent(params) {
    return axios.post('/acctBookCjx/getAssistDetailContent', params)
  },
  //获取核算项目明细账内容

  //1.固定资产类别
  //固定资产类别查询
  getFatypesList(params) {
    return axios.post('/fatypesSmx/getFatypesList', params)
  },
  //增加固定资产类别
  getAddFatypes(params) {
    return axios.post('/fatypesSmx/addFatypes', params)
  },
  //查询折旧方法
  getFaMethodList(params) {
    return axios.post('/fatypesSmx/getFaMethodList', params)
  },
  //修改类别
  getUpdateFatypes(params) {
    return axios.post('/fatypesSmx/updateFatypes', params)
  },
  //删除类别
  getDeleteFatypes(params) {
    return axios.post('/fatypesSmx/deleteFatypes', params)
  },
  //1.固定资产类别

  //2.固定资产增减方式
  //查询增减方式列表
  getFaOriginsList(params) {
    return axios.post('/faoriginsSmx/getFaOriginsList', params)
  },
  //新增固定资产增加方式
  addFaOrigins(params) {
    return axios.post('/faoriginsSmx/addFaOrigins', params)
  },
  //新增固定资产减少方式
  addFaOriginsj(params) {
    return axios.post('/faoriginsSmx/addFaOriginsj', params)
  },
  //修改新增固定资产增减方式
  updateFaOrigins(params) {
    return axios.post('/faoriginsSmx/updateFaOrigins', params)
  },
  //删除固定资产增减方式
  deleteFaOrigins(params) {
    return axios.post('/faoriginsSmx/deleteFaOrigins', params)
  },
  //2.固定资产增减方式

  //3.固定资产卡片
  //查询卡片列表
  getFaFixassetsListXgw(params) {
    return axios.post('/faFixassetsSmx/getFaFixassetsList', params)
  },
  //增加卡片
  getAddFaFixassetsXgw(params) {
    return axios.post('/faFixassetsSmx/addFaFixassets', params)
  },
  //删除卡片
  getDeleteFaFixassetsXgw(params) {
    return axios.post('/faFixassetsSmx/deleteFaFixassets', params)
  },
  //修改固定资产状态
  updateFaFixassetsStatus(params) {
    return axios.post('/faFixassetsSmx/updateFaFixassetsStatus', params)
  },
  //修改固定资产
  updateFaFixassets(params) {
    return axios.post('/faFixassetsSmx/updateFaFixassets', params)
  },
  //查询固定资产卡片的月折旧
  getFaMonthDepr(params) {
    return axios.post('/faFixassetsSmx/getFaMonthDepr', params)
  },
  //查询固定资产卡片的期初累计折旧
  getFambDepr(params) {
    return axios.post('/faFixassetsSmx/getFambDepr', params)
  },
  //查询固定资产卡片的期初净值
  getFambNetvalue(params) {
    return axios.post('/faFixassetsSmx/getFambNetvalue', params)
  },
  //查询固定资产卡片的预计残值
  getFasalvage(params) {
    return axios.post('/faFixassetsSmx/getFasalvage', params)
  },
  //3.固定资产卡片

  //4.固定资产卡片减少
  //查询固定资产卡片减少
  getFaReduceListXgw(params) {
    return axios.post('faReduceSmx/getFaReduceList', params)
  },
  //新增固定资产卡片减少
  addFaReduceXgw(params) {
    return axios.post('/faReduceSmx/addFaReduce', params)
  },
  //修改固定资产卡片减少
  updateFaReduceXgw(params) {
    return axios.post('/faReduceSmx/updateFaReduce', params)
  },
  //删除固定资产卡片减少
  deleteFaReduceXgw(params) {
    return axios.post('/faReduceSmx/deleteFaReduce', params)
  },
  //4.固定资产卡片减少

  //5.固定资产卡片变动
  //查询固定资产变动清单
  getFaChangeList(params) {
    return axios.post('/fachangeSmx/getFaChangeList', params)
  },
  //查询固定资产变动单编码
  getFaChangeCodeXgw(params) {
    return axios.post('/fachangeSmx/getFaChangeCode', params)
  },
  //新增固定资产变动单据
  addFaChangeXgw(params) {
    return axios.post('/fachangeSmx/addFaChange', params)
  },
  //删除
  deleteChangeXgw(params) {
    return axios.post('/fachangeSmx/deleteChange', params)
  },
  //根据id查询固定资产变动单详情
  getFaChangeDetailsXgw(params) {
    return axios.post('/fachangeSmx/getFaChangeDetails', params)
  },
  //5.固定资产卡片变动

  //工资项目信息
  //新增工资项目信息
  addYpSalaryItem(params) {
    return axios.post('/salaryYp/addYpSalaryItem', params)
  },
  //删除工资项目信息
  deleteYpSalaryItem(params) {
    return axios.post('/salaryYp/deleteYpSalaryItem', params)
  },
  //停用工资项目
  updateYpSalaryItemTy(params) {
    return axios.post('/salaryYp/updateYpSalaryItemTy', params)
  },
  //启用工资项目
  updateYpSalaryItemQy(params) {
    return axios.post('/salaryYp/updateYpSalaryItemQy', params)
  },
  //根据会计年度查询所有的工资项目
  selectYpSalaryItem(params) {
    return axios.post('/salaryYp/selectYpSalaryItem', params)
  },
  //查询需要匹配的工资项目(启用的工资项目)
  selectYpQyWaite(params) {
    return axios.post('/salaryYp/selectYpQyWaite', params)
  },
  //工资模板下载
  getSalaryExcelTemplate(params) {
    return axios.get('/salaryYp/getSalaryExcelTemplate', params)
  },
  //接收匹配好的Excel数据写入数据
  saveYpExcel(params) {
    return axios.get('/salaryYp/saveYpExcel', params)
  },
  //根据会计期间查询工资信息报表
  getYpWaReport(params) {
    return axios.post('/salaryYp/getYpWaReport', params)
  },
  //报表
  //1.资产负载表
  //获得报表单个/全部公式
  getReportFormula(params) {
    return axios.post('/reportFormCjx/getReportFormula', params)
  },
  //设置公式
  setReportFormula(params) {
    return axios.post('/reportFormCjx/setReportFormula', params)
  },
  //查询公式计算结果
  getFormulaSum(params) {
    return axios.post('/reportFormCjx/getFormulaSum', params)
  },
  //得到资产负债表或利润表信息
  getReportForm(params) {
    return axios.post('/reportFormCjx/getReportForm', params)
  },

  //结账
  checkoutAcctBook(params) {
    return axios.post('/acctBookCjx/checkoutAcctBook', params)
  },

  // mk
  //获取凭证字列表
  getVoucherWord(params) {
    return axios.post('dsignSmx/getDsignList', params)
  },
  //获取凭证字列表

  //获取凭证字排序号
  getSignCode(params) {
    return axios.post('dsignSmx/getSignSeq', params)
  },
  //获取凭证字排序号

  //获取科目列表
  getAccount(params) {
    return axios.post('accountingSubjectSmx/getAccountingSubjectList', params)
  },
  //获取科目列表

  //新增科目数据
  addAccountData(params) {
    return axios.post('/accountingSubjectSmx/addAccountingSubject', params)
  },
  //新增科目数据

  //编辑科目数据
  updateAccountingSubject(params) {
    return axios.post('/accountingSubjectSmx/updateAccountingSubject', params)
  },
  //编辑科目数据

  // 获取币别列表
  getCurrency(params) {
    return axios.post('currencySmx/getCurrencyList', params)
  },
  // 获取币别列表

  // 获取客户列表
  getCustomer(params) {
    return axios.post('customerYp/getcusallList', params)
  },
  // 获取客户列表

  // 获取供应商列表
  getProvider(params) {
    return axios.post('vendorYp/getvenallList', params)
  },
  // 获取供应商列表

  // 获取职员列表
  getEmployee(params) {
    return axios.post('personnelYp/getperallList', params)
  },
  // 获取职员列表

  // 获取项目列表
  getSubject(params) {
    return axios.post('auxitemYp/getitemallList', params)
  },
  // 获取项目列表

  // 获取部门列表
  getDepartment(params) {
    return axios.post('departmentYp/getdepallList', params)
  },
  // 获取部门列表

  // 修改部门状态
  changeDepSta(params) {
    return axios.post('departmentYp/updateDepartmentDis', params)
  },
  // 修改部门状态

  // 修改存货状态
  changeInvSta(params) {
    return axios.post('inventoryYp/updateInventoryDis', params)
  },
  // 修改存货状态

  // 获取存货列表
  getInventory(params) {
    return axios.post('inventoryYp/getinvallList', params)
  },
  // 获取存货列表

  // 修改客户状态
  changeCusSta(params) {
    return axios.post('customerYp/updateCustomerDis', params)
  },
  // 修改客户状态


  // 获取客户编码
  getCustomerCode(params) {
    return axios.post('customerYp/getcode', params)
  },
  // 获取客户编码

  // 获取供应商编码
  getVendorCode(params) {
    return axios.post('vendorYp/getcode', params)
  },
  // 获取供应商编码

  // 修改供应商状态
  changeProSta(params) {
    return axios.post('vendorYp/updateVendorDis', params)
  },
  // 修改供应商状态

  // 获取职员编码
  getPersonnelCode(params) {
    return axios.post('personnelYp/getcode', params)
  },
  // 获取职员编码

  // 修改职员状态
  changePerSta(params) {
    return axios.post('personnelYp/updatePersonnelDis', params)
  },
  // 修改职员状态

  // 获取部门编码
  getDepartmentCode(params) {
    return axios.post('departmentYp/getcode', params)
  },
  // 获取部门编码

  // 获取资金账户编码
  getBankCode(params) {
    return axios.post('bankAccountYp/getcode', params)
  },
  // 获取资金账户编码

  // 获取项目编码
  getItemCode(params) {
    return axios.post('auxitemYp/getcode', params)
  },
  // 获取项目编码

  // 修改项目状态
  changeItemSta(params) {
    return axios.post('auxitemYp/updateAuxitemDis', params)
  },
  // 修改项目状态

  // 获取被投资单位编码
  getInvesteeCode(params) {
    return axios.post('investeeYp/getcode', params)
  },
  // 获取被投资单位编码

  // 修改被投资单位状态
  changeInvesteeSta(params) {
    return axios.post('investeeYp/updateInvsteeDis', params)
  },
  // 修改被投资单位状态

  // 获取投资单位编码
  getInvestorCode(params) {
    return axios.post('investorYp/getcode', params)
  },
  // 获取投资单位编码

  // 获取存货编码
  getInventoryCode(params) {
    return axios.post('inventoryYp/getcode', params)
  },
  // 获取存货编码

  // 获取投资单位列表
  getInvenstor(params) {
    return axios.post('investorYp/getiorallList', params)
  },
  // 获取投资单位列表

  // 修改投资单位状态
  changeInvestorSta(params) {
    return axios.post('investorYp/updateInvestorDis', params)
  },
  // 修改投资单位状态

  // 获取被投资人列表
  getIeeallList(params) {
    return axios.post('investeeYp/getieeallList', params)
  },
  // 获取被投资人列表

  // 获取资金账户列表
  getAllList(params) {
    return axios.post('bankAccountYp/getAllList', params)
  },
  // 获取资金账户列表

  // 修改资金账户状态
  changeBankSta(params) {
    return axios.post('bankAccountYp/updateBankAccountDis', params)
  },
  // 修改资金账户状态

  //新增币别数据
  addCurrencyData(params) {
    return axios.post('/currencySmx/addCurrency', params)
  },
  //新增币别数据

  //删除币别数据
  delCurrencyData(params) {
    return axios.post('currencySmx/deleteCurrency', params)
  },
  //删除币别数据

  //编辑币别数据
  editCurrencyData(params) {
    return axios.post('/currencySmx/updateCurrency', params)
  },
  //编辑币别数据


  //删除凭证字数据
  delcertificateData(params) {
    return axios.post('/dsignSmx/deleteDsign', params)
  },
  //删除凭证字数据

  //删除科目数据
  delaccountData(params) {
    return axios.post('accountingSubjectSmx/deleteAccountingSubject', params)
  },
  //删除科目数据

  //删除客户数据
  delcustomerData(params) {
    return axios.post('customerYp/delcustomer', params)
  },
  //删除客户数据

  //新增客户数据
  addCustomerData(params) {
    return axios.post('/customerYp/addcustomer', params)
  },
  //新增客户数据

  //新增供应商数据
  addProviderData(params) {
    return axios.post('/vendorYp/addvendor', params)
  },
  //新增供应商数据

  //删除客户数据
  delProviderData(params) {
    return axios.post('vendorYp/delvendor', params)
  },
  //删除客户数据

  //新增职员数据
  addpersonnelData(params) {
    return axios.post('/personnelYp/addpersonnel', params)
  },
  //新增职员数据

  //删除职员数据
  delpersonData(params) {
    return axios.post('personnelYp/delpersonnel', params)
  },
  //删除职员数据

  //新增项目数据
  addsubjectData(params) {
    return axios.post('/auxitemYp/addauxitem', params)
  },
  //新增项目数据

  //删除项目数据
  delsubjectData(params) {
    return axios.post('auxitemYp/delauxitem', params)
  },
  //删除项目数据

  //新增部门数据
  adddepartmentData(params) {
    return axios.post('/departmentYp/adddepartment', params)
  },
  //新增部门数据

  //删除部门数据
  deldepartmentData(params) {
    return axios.post('departmentYp/deldepartment', params)
  },
  //删除部门数据

  //新增存货数据
  addInventoryData(params) {
    return axios.post('/inventoryYp/addinventory', params)
  },
  //新增存货数据
  //删除存货数据
  delinventoryData(params) {
    return axios.post('inventoryYp/delinventory', params)
  },
  //删除存货数据

  //新增投资单位数据
  addInvestorData(params) {
    return axios.post('/investorYp/addInvestor', params)
  },
  //新增投资单位数据
  //删除投资单位
  delInvestorData(params) {
    return axios.post('investorYp/delInvestor', params)
  },
  //删除投资单位

  //新增被投资单位数据
  addInvesteeData(params) {
    return axios.post('/investeeYp/addInvestee', params)
  },
  //新增被投资单位数据

  //删除被投资单位
  delinvesteeData(params) {
    return axios.post('investeeYp/delInvestee', params)
  },
  //删除被投资单位

  //新增资金账户数据
  addBankAccountData(params) {
    return axios.post('/bankAccountYp/addBankAccount', params)
  },
  //新增资金账户数据

  //删除资金账户
  delbankAccountData(params) {
    return axios.post('bankAccountYp/deleteBankAccount', params)
  },
  //删除资金账户

  //新增凭证字数据
  addcertificateData(params) {
    return axios.post('/dsignSmx/addDsign', params)
  },
  //新增凭证字数据

  //编辑凭证字数据
  editDsignData(params) {
    return axios.post('/dsignSmx/updateDsign', params)
  },
  //编辑凭证字数据

  //编辑客户数据
  editcustomerData(params) {
    return axios.post('/customerYp/updcustomer', params)
  },
  //编辑客户数据

  //编辑客户数据
  editproviderData(params) {
    return axios.post('/vendorYp/updvendor', params)
  },
  //编辑客户数据

  //编辑职员数据
  editpersonnelData(params) {
    return axios.post('/personnelYp/updpersonnel', params)
  },
  //编辑职员数据

  //编辑部门数据
  editdepartmentData(params) {
    return axios.post('/departmentYp/updateDepartment', params)
  },
  //编辑部门数据

  //编辑项目数据
  editsubData(params) {
    return axios.post('/auxitemYp/updauxitem', params)
  },
  //编辑项目数据

  //编辑存货数据
  editInvData(params) {
    return axios.post('/inventoryYp/updinventory', params)
  },
  //编辑存货数据

  //编辑投资单位
  editInvestorData(params) {
    return axios.post('/investorYp/updInvestor', params)
  },
  //编辑投资单位

  //编辑被投资单位
  editRecData(params) {
    return axios.post('/investeeYp/updInvestee', params)
  },
  //编辑被投资单位

  //编辑资金账户
  editbankAccountData(params) {
    return axios.post('/bankAccountYp/updateBankAccount', params)
  },
  //编辑资金账户

  // 获取期初余额列表
  getBeginningBalanceList(params) {
    return axios.post('beginningBalanceSmx/getBeginningBalanceList', params)
  },
  // 获取期初余额列表

  // 查询科目是否选用辅助核算
  getBaccountList(params) {
    return axios.post('/beginningBalanceSmx/getBAccountSList', params)
  },
  // 查询科目是否选用辅助核算

  // 根据id删除辅助核算
  delAuxData(params) {
    return axios.post('/beginningBalanceSmx/deleteBeginningBalance', params)
  },
  // 查询id删除辅助核算

  // 辅助核算
  addBeginningBalance(params) {
    return axios.post('beginningBalanceSmx/addBeginningBalance', params)
  },
  // 辅助核算

  // 批量保存期初余额
  addBeginningBalances(params) {
    return axios.post('beginningBalanceSmx/addBeginningBalances', params)
  },
  // 批量保存期初余额
  // mk
}
