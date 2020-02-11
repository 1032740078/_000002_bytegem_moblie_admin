import Vue from 'vue'

/** 全局过滤器
 * const dataFormat = this.$options.filters['dataFormat']
 * */

// 时间过滤器 调用实例：yyyy-MM-dd或者yyyy-MM-dd hh:mm:ss进行格式
Vue.filter('dataFormat', function (value, fmt) {
    let getDate = new Date(value);
    let o = {
        'M+': getDate.getMonth() + 1,
        'd+': getDate.getDate(),
        'h+': getDate.getHours(),
        'm+': getDate.getMinutes(),
        's+': getDate.getSeconds(),
        'q+': Math.floor((getDate.getMonth() + 3) / 3),
        'S': getDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt;
});

// 学历格式化
Vue.filter('users_education', function (value) {
    //0小学,1 初中,2 高中,3 大学,4 研究生,5 博士
    switch (value) {
        case 0:
            return '小学'
        case 1:
            return '初中'
        case 2:
            return '高中'
        case 3:
            return '大学'
        case 4:
            return '研究生'
        case 5:
            return '博士'
        default:
            return '无'
    }
});

// 学历要求
Vue.filter('educational_requirements', function (value) {
    //学历要求1小学以上2初中以上3高中/中专以上4大学/大专以上
    switch (value) {
        case null:
            return '无'
        case 0:
            return '无'
        case 1:
            return '小学以上'
        case 2:
            return '初中以上'
        case 3:
            return '高中/中专以上'
        case 4:
            return '大学/大专以上'
    }
});

// 性别格式化
Vue.filter('userSex', function (value) {
    switch (value) {
        case 1:
            return '男'
        case 2:
            return '女'
        default:
            return '无'
    }
});

// 在职状态格式化
Vue.filter('workingState', function (value) {
    switch (value) {
        case 1:
            return '在职'
        case 2:
            return '调岗'
        case 3:
            return '离职'
    }
});

// 岗位性质格式化
Vue.filter('detailsType', function (value) {
    const detailsType = ['无', '正式工', '小时工（临时工）', '学生工', '兼职','技能培训']
    return detailsType[value]
});

// 岗位性质格式化
Vue.filter('officersState', function (value) {
    const detailsType = ['无', '在职', '申请离职', '离职中', '离职']
    return detailsType[value]
});

// 报名状态
Vue.filter('enrollState', function (value) {
    //报名状态1申请中2邀请3通过4入职5拒绝
    const detailsType = ['无', '申请中', '邀请中', '已通过', '入职', '拒绝', '已离职']
    return detailsType[value]
});

// 预支申请
Vue.filter('advanceState', function (value) {
    const detailsType = ['无', '申请中', '通过', '拒绝']
    return detailsType[value]
});

// 发放状态1未发放2线上发放成功3线上发放失败4线下发放成功5线下发放失败
Vue.filter('issuanceState', function (value) {
    const detailsType = ['无', '未发放', '线上发放成功', '线上发放失败', '线下发放成功', '线下发放失败', '线下发放中']
    return detailsType[value]
});

// 审核状态
Vue.filter('auditState', function (value) {
    // 审核状态1审核中2审核失败3审核成功
    switch (value) {
        case 1:
            return '审核中'
        case 3:
            return '审核成功'
        case 2:
            return '审核失败'
    }
});

// 审核状态2
Vue.filter('auditState2', function (value) {
    // 审核状态1审核中2审核失败3审核成功
    switch (value) {
        case 1:
            return '审核中'
        case 2:
            return '审核成功'
        case 3:
            return '审核失败'
    }
});
// 饮食格式化
Vue.filter('detailsDiet', function (value) {
    const type = ['无', '自理', '补贴', '包吃', ]
    return type[Number(value)] || '无'
});

// 住房格式化
Vue.filter('housing', function (value) {
    //住房1自理2补贴
    const type = ['无', '自理', '补贴','其他','包住',]
    return type[Number(value)] || '无'
});


//交通状态交通1自理2补贴3班车
Vue.filter('traffic', function (value) {
    const type = ['无', '自理', '补贴', '班车']
    return type[Number(value)] || '无'
});

// 转成Number
Vue.filter('toNumber', function (value) {
    return Number(value)
});

// 金额转换(分转元)
Vue.filter('money', function (value) {
    value = String(value)
    if (value.length > 2) {
        value = value.slice(0, value.length - 2) + '.' + value[value.length - 2] + value[value.length - 1]
    } else if (value.length === 2) {
        value = '0.' + value[value.length - 2] + value[value.length - 1]
    } else if (value.length === 1) {
        value = '0.0' + value[value.length - 1]
    } else {
        value = '0.00'
    }
    return value
});

//角色
Vue.filter('role', function (value) {
    const type = ['游客', '普通用户', '员工', '代理', '业务员', '企业', '总公司']
    return type[Number(value)] || '无'
});

//提现状态
Vue.filter('withdrawalstate', function (value) {
    const type = ['无', '申请中', '通过', '拒绝',]
    return type[Number(value)] || '无'
});

