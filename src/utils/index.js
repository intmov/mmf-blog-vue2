import Vue from 'vue'
import ls from 'store2'

export const inBrowser = typeof window !== 'undefined'

export const ua = () => {
    const userAgentInfo = inBrowser ? navigator.userAgent : ''
    const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod']
    let flag = 'PC'
    for (let vv = 0; vv < Agents.length; vv++) {
        if (userAgentInfo.indexOf(Agents[vv]) > 0) {
            flag = Agents[vv]
            break
        }
    }
    return flag
}

export const ssp = path => {
    if (!inBrowser) return
    const clientHeight = document.documentElement.clientHeight,
        scrollTop = ls.get(path)
    if (scrollTop) {
        Vue.nextTick().then(() => {
            if (document.body.clientHeight >= scrollTop + clientHeight) {
                window.scrollTo(0, scrollTop)
            }
            ls.remove(path)
        })
    }
}

export const strlen = str => {
    let charCode = -1
    const len = str.length
    let realLength = 0
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) realLength += 1
        else realLength += 2
    }
    return realLength
}

export var selectDate=''

export const bookOptions= () => {
    return [
        {
            value: "摩西五经",
            label: '摩西五经',
            children: [
                {
                    value:'创世记',
                    label:'创世记'
                },
                {
                    value:'出埃及记',
                    label:'出埃及记'
                },
                {
                    value:'利未记',
                    label:'利未记'
                },
                {
                    value:'民数记',
                    label:'民数记'
                },
                {
                    value:'申命记',
                    label:'申命记'
                }
            ]
        },
        {
            value: '历史书',
            label: '历史书',
            children: [
                {value: '约书亚记',label:'约书亚记'},{value: '士师记',label:'士师记'},{value: '路得记',label:'路得记'},{value: '撒母耳记上',label:'撒母耳记上'},{value: '撒母耳记下',label:'撒母耳记下'},{value: '列王记上',label:'列王记上'},{value: '列王记下',label:'列王记下'},{value: '历代记上',label:'历代记上'},{value: '历代记下',label:'历代记下'},{value: '以斯拉记',label:'以斯拉记'},{value: '尼希米记',label:'尼希米记'},{value: '以斯帖记',label:'以斯帖记'}
            ]
        },
        {
            value: '诗歌智慧书',
            label: '诗歌智慧书',
            children: [
                {value: '约伯记',label:'约伯记'},{value: '诗篇',label:'诗篇'},{value: '箴言',label:'箴言'},{value: '传道书',label:'传道书'},{value: '雅歌',label:'雅歌'}
            ]
        },
        {
            value: '先知书',
            label: '先知书',
            children: [
                {value: '以赛亚书',label:'以赛亚书'},{value: '耶利米书',label:'耶利米书'},{value: '耶利米哀歌',label:'耶利米哀歌'},{value: '以西结书',label:'以西结书'},{value: '但以理书',label:'但以理书'},{value: '何西阿书',label:'何西阿书'},{value: '约珥书',label:'约珥书'},{value: '阿摩司书',label:'阿摩司书'},{value: '俄巴底亚书',label:'俄巴底亚书'},{value: '约拿书',label:'约拿书'},{value: '弥迦书',label:'弥迦书'},{value: '那鸿书',label:'那鸿书'},{value: '哈巴谷书',label:'哈巴谷书'},{value: '西番雅书',label:'西番雅书'},{value: '哈该书',label:'哈该书'},{value: '撒迦利亚书',label:'撒迦利亚书'},{value: '玛拉基书',label:'玛拉基书'}
            ],
            chapter: [],
            verse:[]
        },
        {
            value: '福音书',
            label: '福音书',
            children: [
                {value: '马太福音',label:'马太福音'},{value: '马可福音',label:'马可福音'},{value: '路加福音',label:'路加福音'},{value: '约翰福音',label:'约翰福音'}
            ],
            chapter: [],
            verse:[]
        },
        {
            value: '教会历史',
            label: '教会历史',
            children: [
                {value: '使徒行传',label:'使徒行传'}
            ],
            chapter: [],
            verse:[]
        },
        {
            value: '保罗书信',
            label: '保罗书信',
            children: [
                {value: '罗马书',label:'罗马书'},{value: '哥林多前书',label:'哥林多前书'},{value: '哥林多后书',label:'哥林多后书'},{value: '加拉太书',label:'加拉太书'},{value: '以弗所书',label:'以弗所书'},{value: '腓立比书',label:'腓立比书'},{value: '歌罗西书',label:'歌罗西书'},{value: '帖撒罗尼迦前书',label:'帖撒罗尼迦前书'},{value: '帖撒罗尼迦后书',label:'帖撒罗尼迦后书'},{value: '提摩太前书',label:'提摩太前书'},{value: '提摩太后书',label:'提摩太后书'},{value: '提多书',label:'提多书'},{value: '腓利门书',label:'腓利门书'}
            ],
            chapter: [],
            verse:[]
        },
        {
            value: '其他书信',
            label: '其他书信',
            children: [
                {value: '希伯来书',label:'希伯来书'},{value: '雅各书',label:'雅各书'},{value: '彼得前书',label:'彼得前书'},{value: '彼得后书',label:'彼得后书'},{value: '约翰一书',label:'约翰一书'},{value: '约翰二书',label:'约翰二书'},{value: '约翰三书',label:'约翰三书'},{value: '犹大书',label:'犹大书'}
            ],
            chapter: [],
            verse:[]
        },
        {
            value: '启示录',
            label: '启示录',
            children: [
                {label:'启示录'}
            ]
        }
    ]
}