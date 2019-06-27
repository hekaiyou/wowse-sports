// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  // console.log 的内容可以在云开发云函数调用日志查看
  console.log(event)
  console.log(context)

  // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()

  // 获取 cloud 数据库对象
  const db = cloud.database()

  const binding = await db.collection('binding').where({
    // 通过当前用户 openid 查找
    _openid: wxContext.OPENID
  }).get()

  if (binding.data.length == 0) {
    console.log('数据集合 binding 中不存在该用户记录')

    try {
      await db.collection('binding').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _openid: wxContext.OPENID,
          create: new Date().toLocaleString(),
          schedule: []
        }
      })
      console.log('在数据集合 binding 创建新记录')
    } catch (e) {
      console.error(e)
    }
  }

  return {
    code: 0,
    msg: '请求成功',
    data: binding.data[0]['schedule'],
  }
}