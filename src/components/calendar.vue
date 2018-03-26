<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{date_top}}</li>
        <li @click="NextMonth">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="tag in text_top">
          <div>
            {{tag}}
          </div>
        </div>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(item,index) in list" @click="clickDay(item,index)">
          <div>
            <li v-bind:class="{ wh_is_today: item.is_today,
                                        wh_is_selected: item.is_selected,
                                        wh_is_mark:item.is_mark,
                                        wh_next_day_show:(isHideOtherday&&item.next_day_show)||item.other_month||item.agoDayHide}">
              {{item.id}}</li>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="babel" type="text/babel">
import moment from 'moment/moment.js'

export default {
    name: 'calendar',
    data() {
        return {
            text_top: ['一', '二', '三', '四', '五', '六', '日'],
            my_data: [],
            list: [],
            date_top: ''
        }
    },
    props: {
        markArray: { default: '[]' },
        agoDayHide: { default: '0' },
        isHideOtherday: { default: false }
    },
    created() {
        this.my_data = new Date()
    },
    methods: {
        clickDay(item, index) {
            if (item.other_month) {
                //item.other_month < 0 ? this.PreMonth() : this.NextMonth()
            } else {
                if (!(this.isHideOtherday && item.next_day_show) && !item.agoDayHide) {
                    this.$emit('choseDay', item.date)
                    for (var i = 0;i < this.list.length;i++) {
                        if (i === index) {
                            this.list[i].is_selected = true
                        } else {
                            this.list[i].is_selected = false
                        }
                    }
                }
            }
        },
        ChoseMonth(date) {
            this.my_data = new Date(date)
            this.$emit('changeMonth', this.dateformat(this.my_data))
            this.getlist(this.my_data)
        },
        PreMonth() {
            this.my_data = this.getPreMonth(this.my_data)
            this.$emit('changeMonth', this.dateformat(this.my_data))
            this.getlist(this.my_data)
        },
        NextMonth() {
            this.my_data = this.getNextMonth(this.my_data)
            this.$emit('changeMonth', this.dateformat(this.my_data))
            this.getlist(this.my_data)
        },

        getPreMonth(date) {
            const t2 = moment(date).subtract(1,'months').format("YYYY-MM-DD")
            return new Date(t2)
        },

        getNextMonth(date) {
            const t2 = moment(date).add(1,'months').format("YYYY-MM-DD")
            return new Date(t2)
        },
        getDaysInOneMonth(date) {
            //通过获取下月面0号的日期可以知道这个月有多少天
            var getyear = date.getFullYear()
            var getmonth = date.getMonth() + 1
            getmonth = parseInt(getmonth, 10)
            var d = new Date(getyear, getmonth, 0)
            return d.getDate()
        },
        getMonthweek(date) {
            //获取本月第一天是星期几，然后在去向前空几个
            var getyear = date.getFullYear()
            var getmonth = date.getMonth() + 1
            var date_one = new Date(getyear + '/' + getmonth + '/1')
            return date_one.getDay() === 0 ? 6 : date_one.getDay() - 1
        },
        getlist(date) {
            //渲染出来当前list
            var mygetMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
            this.date_top = date.getFullYear() + '年' + mygetMonth + '月'
            var array = []
            for (let i = 0;i < this.getDaysInOneMonth(date);i++) {
                if (
                    this.dateformat(new Date()) ===
                    this.dateformat(new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (i + 1)))
                ) {
                    array = array.concat({
                        //如果当前这天是今天 is_today是true
                        id: i + 1,
                        date: moment([date.getFullYear() , date.getMonth(), i + 1]).format("YYYY-MM-DD"),
                        is_today: true,
                        is_mark: this.markArray.indexOf(i + 1) >= 0,
                        is_selected: true,
                        agoDayHide: new Date(`${date.getFullYear()}-${mygetMonth}-${i + 1}`).getTime() < this.agoDayHide * 1,
                        next_day_show:
                            new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (i + 1)).getTime() -
                                new Date().getTime() >  0
                    })
                    this.$emit(
                        'isToday',
                        this.dateformat(new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (i + 1)))
                    )
                } else {
                    array = array.concat({
                        id: i + 1,
                        date: moment([date.getFullYear() , date.getMonth(), i + 1]).format("YYYY-MM-DD"),
                        is_today: false,
                        is_mark: this.markArray.indexOf(i + 1) >= 0,
                        is_selected: false,
                        agoDayHide: new Date(`${date.getFullYear()}-${mygetMonth}-${i + 1}`).getTime() < this.agoDayHide * 1,
                        next_day_show:
                            new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + (i + 1)).getTime() -
                                new Date().getTime() > 0
                    })
                }
            }
            var array2 = []
            var num = this.getDaysInOneMonth(this.getPreMonth(date)) - this.getMonthweek(date) + 1
            for (var i = 0;i < this.getMonthweek(date);i++) {
                array2 = array2.concat({ other_month: -1, id: num + i })
            }
            array = array2.concat(array)
            var length_ = 7 - array.length % 7
            if (length_ < 7) {
                for (let i = 0;i < length_; i++) {
                    array.push({ other_month: 1, id: i + 1 })
                }
            }
            this.list = array
        },
        dateformat(date) {
            return moment(date).format("YYYY-MM-DD")
        }
    },
    mounted() {
        this.getlist(this.my_data)
    },
    watch: {
        markArray(val, oldVal) {
            var list = this.list
            for (var i = 0;i < list.length;i++) {
                list[i].is_mark = false
                if (list[i].date) {
                    for (var n = 0;n < val.length;n++) {
                        if (list[i].id === val[n]) {
                            list[i].is_mark = true
                        }
                    }
                }
            }
            this.list = list
        }
    }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.wh_container {
  max-width: 600px;
  margin: auto;
}
li {
  list-style-type: none;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', STHeiti, 'Microsoft Yahei', Tahoma,
    Simsun, sans-serif;
  background-color: white ;
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}
.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
  height: 15%;
  line-height: 15%;
}

.wh_content_item {
  font-size: 15px;
  width: 13.4%;
  padding-bottom: 10.14%;
  text-align: center;
  color: #222;
  position: relative;
}
.wh_content_item div {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wh_top_changge {
  display: flex;
}

.wh_top_changge li {
  display: flex;
  color: #111;
  font-size: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
}

.wh_top_changge .wh_content_li {
  flex: 2.5;
}

.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #111;
  border-left: 2px solid #111;
  transform: rotate(-45deg);
}

.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #111;
  border-right: 2px solid #111;
  transform: rotate(45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}
.wh_is_today {
  width: 34px;
  height: 34px;
  line-height: 34px;
  margin: auto;
  background-color: #fff;
  border-radius: 100px;
  color: #111;
  border: 2px solid #00ADB5;
  text-align: center;
}

.wh_is_selected {
  width: 34px;
  height: 34px;
  line-height: 34px;
  margin: auto;
  border-radius: 100px;
  background-color: #eee;
  color: #111;
  border: 1px solid #00ADB5;
  text-align: center;
}

.wh_is_mark {
  width: 34px;
  height: 34px;
  line-height: 34px;
  margin: auto;
  border-radius: 100px;
  border: 1px solid #00ADB5;
  color: #00ADB5;
  z-index: 2;
}
.wh_next_day_show {
  color: #bfbfbf;
}
</style>
