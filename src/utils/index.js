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
                {value: '约书亚记',label:'约书亚记'},{value: '士师记',label:'士师记'},{value: '路得记',label:'路得记'},{value: '撒母耳记上',label:'撒母耳记上'},{value: '撒母耳记下',label:'撒母耳记下'},{value: '列王纪上',label:'列王纪上'},{value: '列王纪下',label:'列王纪下'},{value: '历代志上',label:'历代志上'},{value: '历代志下',label:'历代志下'},{value: '以斯拉记',label:'以斯拉记'},{value: '尼希米记',label:'尼希米记'},{value: '以斯帖记',label:'以斯帖记'}
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
                {value: '启示录', label:'启示录'}
            ]
        }
    ]
}

export const testments = () => {
    return {
        '创世记': ['创', 'Genesis', 'Gen', 'Gen', [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26]],
        '出埃及记': ['出', 'Exodus', 'Exod', 'Exod', [22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38]],
        '利未记': ['利', 'Leviticus', 'Lev', 'Lev', [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34]],
        '民数记': ['民', 'Numbers', 'Num', 'Num', [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34, 13]],
        '申命记': ['申', 'Deuteronomy', 'Deut', 'Deut', [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22, 21, 20, 23, 30, 25, 22, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12]],
        '约书亚记': ['书', 'Joshua', 'Josh', 'Josh', [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33]],
        '士师记': ['士', 'Judges', 'Judg', 'Judg', [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25]],
        '路得记': ['得', 'Ruth', 'Ruth', 'Ruth', [22, 23, 18, 22]],
        '撒母耳记上': ['撒上', 'I Samuel', '1Sam', '1Sam', [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 13]],
        '撒母耳记下': ['撒下', 'II Samuel', '2Sam', '2Sam', [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 33, 43, 26, 22, 51, 39, 25]],
        '列王纪上': ['王上', 'I Kings', '1Kgs', '1Kgs', [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 53]],
        '列王纪下': ['王下', 'II Kings', '2Kgs', '2Kgs', [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30]],
        '历代志上': ['代上', 'I Chronicles', '1Chr', '1Chr', [54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30]],
        '历代志下': ['代下', 'II Chronicles', '2Chr', '2Chr', [17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23]],
        '以斯拉记': ['拉', 'Ezra', 'Ezra', 'Ezra', [11, 70, 13, 24, 17, 22, 28, 36, 15, 44]],
        '尼希米记': ['尼', 'Nehemiah', 'Neh', 'Neh', [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31]],
        '以斯帖记': ['斯', 'Esther', 'Esth', 'Esth', [22, 23, 15, 17, 14, 14, 10, 17, 32, 3]],
        '约伯记': ['伯', 'Job', 'Job', 'Job', [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 24, 34, 17]],
        '诗篇': ['诗', 'Psalms', 'Ps', 'Ps', [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 10, 7, 12, 15, 21, 10, 20, 14, 9, 6]],
        '箴言': ['箴', 'Proverbs', 'Prov', 'Prov', [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31]],
        '传道书': ['传', 'Ecclesiastes', 'Eccl', 'Eccl', [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14]],
        '雅歌': ['歌', 'Song of Solomon', 'Song', 'Song', [17, 17, 11, 16, 16, 13, 13, 14]],
        '以赛亚书': ['赛', 'Isaiah', 'Isa', 'Isa', [31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 12, 25, 24]],
        '耶利米书': ['耶', 'Jeremiah', 'Jer', 'Jer', [19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34]],
        '耶利米哀歌': ['哀', 'Lamentations', 'Lam', 'Lam', [22, 22, 66, 22, 22]],
        '以西结书': ['结', 'Ezekiel', 'Ezek', 'Ezek', [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 49, 32, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35]],
        '但以理书': ['但', 'Daniel', 'Dan', 'Dan', [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13]],
        '何西阿书': ['何', 'Hosea', 'Hos', 'Hos', [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9]],
        '约珥书': ['珥', 'Joel', 'Joel', 'Joel', [20, 32, 21]],
        '阿摩司书': ['摩', 'Amos', 'Amos', 'Amos', [15, 16, 15, 13, 27, 14, 17, 14, 15]],
        '俄巴底亚书': ['俄', 'Obadiah', 'Obad', 'Obad', [21]],
        '约拿书': ['拿', 'Jonah', 'Jonah', 'Jonah', [17, 10, 10, 11]],
        '弥迦书': ['弥', 'Micah', 'Mic', 'Mic', [16, 13, 12, 13, 15, 16, 20]],
        '那鸿书': ['鸿', 'Nahum', 'Nah', 'Nah', [15, 13, 19]],
        '哈巴谷书': ['哈', 'Habakkuk', 'Hab', 'Hab', [17, 20, 19]],
        '西番雅书': ['番', 'Zephaniah', 'Zeph', 'Zeph', [18, 15, 20]],
        '哈该书': ['该', 'Haggai', 'Hag', 'Hag', [15, 23]],
        '撒迦利亚书': ['亚', 'Zechariah', 'Zech', 'Zech', [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21]],
        '玛拉基书': ['玛', 'Malachi', 'Mal', 'Mal', [14, 17, 18, 6]],
        '马太福音': ['太', 'Matthew', 'Matt', 'Matt', [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20]],
        '马可福音': ['可', 'Mark', 'Mark', 'Mark', [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20]],
        '路加福音': ['路', 'Luke', 'Luke', 'Luke', [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53]],
        '约翰福音': ['约', 'John', 'John', 'John', [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25]],
        '使徒行传': ['徒', 'Acts', 'Acts', 'Acts', [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31]],
        '罗马书': ['罗', 'Romans', 'Rom', 'Rom', [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27]],
        '哥林多前书': ['林前', 'I Corinthians', '1Cor', '1Cor', [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24]],
        '哥林多后书': ['林后', 'II Corinthians', '2Cor', '2Cor', [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14]],
        '加拉太书': ['加', 'Galatians', 'Gal', 'Gal', [24, 21, 29, 31, 26, 18]],
        '以弗所书': ['弗', 'Ephesians', 'Eph', 'Eph', [23, 22, 21, 32, 33, 24]],
        '腓立比书': ['腓', 'Philippians', 'Phil', 'Phil', [30, 30, 21, 23]],
        '歌罗西书': ['西', 'Colossians', 'Col', 'Col', [29, 23, 25, 18]],
        '帖撒罗尼迦前书': ['帖前', 'I Thessalonians', '1Thess', '1Thess', [10, 20, 13, 18, 28]],
        '帖撒罗尼迦后书': ['帖后', 'II Thessalonians', '2Thess', '2Thess', [12, 17, 18]],
        '提摩太前书': ['提前', 'I Timothy', '1Tim', '1Tim', [20, 15, 16, 16, 25, 21]],
        '提摩太后书': ['提后', 'II Timothy', '2Tim', '2Tim', [18, 26, 17, 22]],
        '提多书': ['多', 'Titus', 'Titus', 'Titus', [16, 15, 15]],
        '腓利门书': ['门', 'Philemon', 'Phlm', 'Phlm', [25]],
        '希伯来书': ['来', 'Hebrews', 'Heb', 'Heb', [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25]],
        '雅各书': ['雅', 'James', 'Jas', 'Jas', [27, 26, 18, 17, 20]],
        '彼得前书': ['彼前', 'I Peter', '1Pet', '1Pet', [25, 25, 22, 19, 14]],
        '彼得后书': ['彼后', 'II Peter', '2Pet', '2Pet', [21, 22, 18]],
        '约翰一书': ['约壹', 'I John', '1John', '1John', [10, 29, 24, 21, 21]],
        '约翰二书': ['约贰', 'II John', '2John', '2John', [13]],
        '约翰三书': ['约叁', 'III John', '3John', '3John', [14]],
        '犹大书': ['犹', 'Jude', 'Jude', 'Jude', [25]],
        '启示录': ['启', 'Revelation of John', 'Rev', 'Rev', [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21]],
    }
}


export const testments2   = [
    {
        index: 1,
        name: '创世记',
        simpleName: '创',
        enName: 'Genesis',
        enSimpleName: 'Gen',
        verseList: [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 2,
        name: '出埃及记',
        simpleName: '出',
        enName: 'Exodus',
        enSimpleName: 'Exod',
        verseList: [22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 3,
        name: '利未记',
        simpleName: '利',
        enName: 'Leviticus',
        enSimpleName: 'Lev',
        verseList: [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 4,
        name: '民数记',
        simpleName: '民',
        enName: 'Numbers',
        enSimpleName: 'Num',
        verseList: [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34, 13],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 5,
        name: '申命记',
        simpleName: '申',
        enName: 'Deuteronomy',
        enSimpleName: 'Deut',
        verseList: [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22, 21, 20, 23, 30, 25, 22, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 6,
        name: '约书亚记',
        simpleName: '书',
        enName: 'Joshua',
        enSimpleName: 'Josh',
        verseList: [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 7,
        name: '士师记',
        simpleName: '士',
        enName: 'Judges',
        enSimpleName: 'Judg',
        verseList: [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 8,
        name: '路得记',
        simpleName: '得',
        enName: 'Ruth',
        enSimpleName: 'Ruth',
        verseList: [22, 23, 18, 22],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 9,
        name: '撒母耳记上',
        simpleName: '撒上',
        enName: 'I Samuel',
        enSimpleName: '1Sam',
        verseList: [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 13],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 10,
        name: '撒母耳记下',
        simpleName: '撒下',
        enName: 'II Samuel',
        enSimpleName: '2Sam',
        verseList: [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 33, 43, 26, 22, 51, 39, 25],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 11,
        name: '列王记上',
        simpleName: '王上',
        enName: 'I Kings',
        enSimpleName: '1Kgs',
        verseList: [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 53],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 12,
        name: '列王记下',
        simpleName: '王下',
        enName: 'II Kings',
        enSimpleName: '2Kgs',
        verseList: [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 13,
        name: '历代记上',
        simpleName: '代上',
        enName: 'I Chronicles',
        enSimpleName: '1Chr',
        verseList: [54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 14,
        name: '历代记下',
        simpleName: '代下',
        enName: 'II Chronicles',
        enSimpleName: '2Chr',
        verseList: [17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 15,
        name: '以斯拉记',
        simpleName: '拉',
        enName: 'Ezra',
        enSimpleName: 'Ezra',
        verseList: [11, 70, 13, 24, 17, 22, 28, 36, 15, 44],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 16,
        name: '尼希米记',
        simpleName: '尼',
        enName: 'Nehemiah',
        enSimpleName: 'Neh',
        verseList: [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 17,
        name: '以斯帖记',
        simpleName: '斯',
        enName: 'Esther',
        enSimpleName: 'Esth',
        verseList: [22, 23, 15, 17, 14, 14, 10, 17, 32, 3],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 18,
        name: '约伯记',
        simpleName: '伯',
        enName: 'Job',
        enSimpleName: 'Job',
        verseList: [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 24, 34, 17],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 19,
        name: '诗篇',
        simpleName: '诗',
        enName: 'Psalms',
        enSimpleName: 'Ps',
        verseList: [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 10, 7, 12, 15, 21, 10, 20, 14, 9, 6],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 20,
        name: '箴言',
        simpleName: '箴',
        enName: 'Proverbs',
        enSimpleName: 'Prov',
        verseList: [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 21,
        name: '传道书',
        simpleName: '传',
        enName: 'Ecclesiastes',
        enSimpleName: 'Eccl',
        verseList: [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 22,
        name: '雅歌',
        simpleName: '歌',
        enName: 'Song of Solomon',
        enSimpleName: 'Song',
        verseList: [17, 17, 11, 16, 16, 13, 13, 14],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 23,
        name: '以赛亚书',
        simpleName: '赛',
        enName: 'Isaiah',
        enSimpleName: 'Isa',
        verseList: [31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 12, 25, 24],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 24,
        name: '耶利米书',
        simpleName: '耶',
        enName: 'Jeremiah',
        enSimpleName: 'Jer',
        verseList: [19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 25,
        name: '耶利米哀歌',
        simpleName: '哀',
        enName: 'Lamentations',
        enSimpleName: 'Lam',
        verseList: [22, 22, 66, 22, 22],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 26,
        name: '以西结书',
        simpleName: '结',
        enName: 'Ezekiel',
        enSimpleName: 'Ezek',
        verseList: [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 49, 32, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 27,
        name: '但以理书',
        simpleName: '但',
        enName: 'Daniel',
        enSimpleName: 'Dan',
        verseList: [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 28,
        name: '何西阿书',
        simpleName: '何',
        enName: 'Hosea',
        enSimpleName: 'Hos',
        verseList: [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 29,
        name: '约珥书',
        simpleName: '珥',
        enName: 'Joel',
        enSimpleName: 'Joel',
        verseList: [20, 32, 21],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 30,
        name: '阿摩司书',
        simpleName: '摩',
        enName: 'Amos',
        enSimpleName: 'Amos',
        verseList: [15, 16, 15, 13, 27, 14, 17, 14, 15],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 31,
        name: '俄巴底亚书',
        simpleName: '俄',
        enName: 'Obadiah',
        enSimpleName: 'Obad',
        verseList: [21],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 32,
        name: '约拿书',
        simpleName: '拿',
        enName: 'Jonah',
        enSimpleName: 'Jonah',
        verseList: [17, 10, 10, 11],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 33,
        name: '弥迦书',
        simpleName: '弥',
        enName: 'Micah',
        enSimpleName: 'Mic',
        verseList: [16, 13, 12, 13, 15, 16, 20],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 34,
        name: '那鸿书',
        simpleName: '鸿',
        enName: 'Nahum',
        enSimpleName: 'Nah',
        verseList: [15, 13, 19],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 35,
        name: '哈巴谷书',
        simpleName: '哈',
        enName: 'Habakkuk',
        enSimpleName: 'Hab',
        verseList: [17, 20, 19],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 36,
        name: '西番雅书',
        simpleName: '番',
        enName: 'Zephaniah',
        enSimpleName: 'Zeph',
        verseList: [18, 15, 20],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 37,
        name: '哈该书',
        simpleName: '该',
        enName: 'Haggai',
        enSimpleName: 'Hag',
        verseList: [15, 23],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 38,
        name: '撒迦利亚书',
        simpleName: '亚',
        enName: 'Zechariah',
        enSimpleName: 'Zech',
        verseList: [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 39,
        name: '玛拉基书',
        simpleName: '玛',
        enName: 'Malachi',
        enSimpleName: 'Mal',
        verseList: [14, 17, 18, 6],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 40,
        name: '马太福音',
        simpleName: '太',
        enName: 'Matthew',
        enSimpleName: 'Matt',
        verseList: [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 41,
        name: '马可福音',
        simpleName: '可',
        enName: 'Mark',
        enSimpleName: 'Mark',
        verseList: [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 42,
        name: '路加福音',
        simpleName: '路',
        enName: 'Luke',
        enSimpleName: 'Luke',
        verseList: [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 43,
        name: '约翰福音',
        simpleName: '约',
        enName: 'John',
        enSimpleName: 'John',
        verseList: [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 44,
        name: '使徒行传',
        simpleName: '徒',
        enName: 'Acts',
        enSimpleName: 'Acts',
        verseList: [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 45,
        name: '罗马书',
        simpleName: '罗',
        enName: 'Romans',
        enSimpleName: 'Rom',
        verseList: [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 46,
        name: '哥林多前书',
        simpleName: '林前',
        enName: 'I Corinthians',
        enSimpleName: '1Cor',
        verseList: [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 47,
        name: '哥林多后书',
        simpleName: '林后',
        enName: 'II Corinthians',
        enSimpleName: '2Cor',
        verseList: [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 48,
        name: '加拉太书',
        simpleName: '加',
        enName: 'Galatians',
        enSimpleName: 'Gal',
        verseList: [24, 21, 29, 31, 26, 18],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 49,
        name: '以弗所书',
        simpleName: '弗',
        enName: 'Ephesians',
        enSimpleName: 'Eph',
        verseList: [23, 22, 21, 32, 33, 24],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 50,
        name: '腓立比书',
        simpleName: '腓',
        enName: 'Philippians',
        enSimpleName: 'Phil',
        verseList: [30, 30, 21, 23],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 51,
        name: '歌罗西书',
        simpleName: '西',
        enName: 'Colossians',
        enSimpleName: 'Col',
        verseList: [29, 23, 25, 18],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 52,
        name: '帖撒罗尼迦前书',
        simpleName: '帖前',
        enName: 'I Thessalonians',
        enSimpleName: '1Thess',
        verseList: [10, 20, 13, 18, 28],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 53,
        name: '帖撒罗尼迦后书',
        simpleName: '帖后',
        enName: 'II Thessalonians',
        enSimpleName: '2Thess',
        verseList: [12, 17, 18],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 54,
        name: '提摩太前书',
        simpleName: '提前',
        enName: 'I Timothy',
        enSimpleName: '1Tim',
        verseList: [20, 15, 16, 16, 25, 21],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 55,
        name: '提摩太后书',
        simpleName: '提后',
        enName: 'II Timothy',
        enSimpleName: '2Tim',
        verseList: [18, 26, 17, 22],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 56,
        name: '提多书',
        simpleName: '多',
        enName: 'Titus',
        enSimpleName: 'Titus',
        verseList: [16, 15, 15],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 57,
        name: '腓利门书',
        simpleName: '门',
        enName: 'Philemon',
        enSimpleName: 'Phlm',
        verseList: [25],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 58,
        name: '希伯来书',
        simpleName: '来',
        enName: 'Hebrews',
        enSimpleName: 'Heb',
        verseList: [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 59,
        name: '雅各书',
        simpleName: '雅',
        enName: 'James',
        enSimpleName: 'Jas',
        verseList: [27, 26, 18, 17, 20],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 60,
        name: '彼得前书',
        simpleName: '彼前',
        enName: 'I Peter',
        enSimpleName: '1Pet',
        verseList: [25, 25, 22, 19, 14],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 61,
        name: '彼得后书',
        simpleName: '彼后',
        enName: 'II Peter',
        enSimpleName: '2Pet',
        verseList: [21, 22, 18],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 62,
        name: '约翰一书',
        simpleName: '约壹',
        enName: 'I John',
        enSimpleName: '1John',
        verseList: [10, 29, 24, 21, 21],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 63,
        name: '约翰二书',
        simpleName: '约贰',
        enName: 'II John',
        enSimpleName: '2John',
        verseList: [13],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 64,
        name: '约翰三书',
        simpleName: '约叁',
        enName: 'III John',
        enSimpleName: '3John',
        verseList: [14],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 65,
        name: '犹大书',
        simpleName: '犹',
        enName: 'Jude',
        enSimpleName: 'Jude',
        verseList: [25],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    },
    {
        index: 66,
        name: '启示录',
        simpleName: '启',
        enName: 'Revelation of John',
        enSimpleName: 'Rev',
        verseList: [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21],
        chapterOffset:0,
        verseOffset: 0,
        offsetList: []
    }
]
export const findBook = name => {
    return testments2.find(bk => bk.name === name)
}

export const findBookBySimpleName = name => {
    return testments2.find(bk => bk.simpleName === name)
}
export const updateBookOffset = () => {
    let bookTotalLen = 0
    let totalChapterOffset = 0
    for(const book of testments2){
        if(book.offsetList.length===0){
            book.verseOffset = bookTotalLen
            book.chapterOffset = totalChapterOffset
            totalChapterOffset += book.verseList.length
            let totalLen = 0
            for(const len of book.verseList){
                book.offsetList.push(totalLen+bookTotalLen)
                totalLen += len
            }
            bookTotalLen += totalLen
        }
    }
}

export function getVerseIndex(bookName, chapter, verse) {
    const book = findBook(bookName)
    updateBookOffset()
    return book.offsetList[chapter-1]+verse
}

export function getChapterIndex(bookName, chapter) {
    updateBookOffset()
    // console.log(bookName)
    const book = findBook(bookName)
    return book.chapterOffset + chapter
}
