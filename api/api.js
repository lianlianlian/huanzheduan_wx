import { http, file} from './index.js';

export const init = (data) => http({ url: 'Index/init', ...data })          // 初始化
export const login = (data) => http({ url: 'client_login', ...data });      // 登录
export const register = (data) => http({ url: 'client_add', ...data });     // 注册 
export const loginOut = (data) => http({ url: 'client_loginout', ...data }); // 退出
export const userDetail = (data) => http({ url: 'client_get', ...data });    // 用户详情
export const updataUser = (data) => http({ url: 'client_save', ...data });   // 修改个人信息
export const sendCode = (data) => http({ url: 'code_get', ...data });        // 发送验证码
export const verifyCode = (data) => http({ url: 'code_verify', ...data });   // 验证码验证
export const updataUsername = (data) => http({ url: 'username_save', ...data });   // 账号修改
export const updataPassword = (data) => http({ url: 'password_save', ...data });  // 密码修改
export const clientVerifyCode = (data) => http({ url: 'client_verify', ...data });  // 用户验证 
export const resetPassword = (data) => http({ url: 'password_reset', ...data });   // 密码重设 先验证用户名，再验证随机码，最后调用重设密码
export const getUnreadNumber = (data) => http({ url: 'unread_get', ...data }); // 未读消息数
export const getNewsList = (data) => http({ url: 'notice_list', ...data }); // 通知列表
export const updataNews = (data) => http({ url: 'notice_saveoperate', ...data }); // 通知操作
export const getMyDoctor = (data) => http({ url: 'hospital_list', ...data }); // 我的医生
export const getAdList = (data) => http({ url: 'ad_list', ...data })         // 广告
export const getMsgList = (data) => http({ url: 'article_list', ...data })   // 文章列表
export const getMsgDetail = (data) => http({ url: 'article_get', ...data })  // 文章详情
export const updataMsg = (data) => http({ url: 'article_favor', ...data })   // 文章收藏
export const getVideoList = (data) => http({ url: 'video_list', ...data })   // 视频列表
export const getVideoDetail = (data) => http({ url: 'video_get', ...data })  // 视频详情
export const updataVideo = (data) => http({ url: 'video_favor', ...data })  // 视频收藏
export const getTribuneList = (data) => http({ url: 'blog_type_list', ...data })   // 论坛列表
export const getTribuneDetail = (data) => http({ url: 'blog_type_get', ...data })   // 论坛详情
export const updataTribuneList = (data) => http({ url: 'blog_type_favor', ...data })   // 关注论坛
export const getBlogList = (data) => http({ url: 'blog_list', ...data })   // 帖子列表
export const getBlogDetail = (data) => http({ url: 'blog_get', ...data })   // 帖子详情
export const updataBlogList = (data) => http({ url: 'blog_favor', ...data })   // 收藏帖子
export const addBlog = (data) => http({ url: 'blog_add', ...data })   // 发表帖子
export const getTypeList = (data) => http({ url: 'type_list', ...data })   // 分类列表
export const getCommentList = (data) => http({ url: 'comment_list', ...data })  // 评价列表
export const addComment = (data) => http({ url: 'comment_add', ...data })    // 添加评价
export const protocal = (data) => http({ url: 'webview/parm/protocal', ...data })  // 协议
export const aboutus = (data) => http({ url: 'webview/parm/aboutus', ...data })    // 关于我们
export const fileUp = (data) => file({ url: 'file_upload', ...data })    // 上传文件
// export const protocal = (data) => http({ url: 'webview/parm/protocal', ...data })