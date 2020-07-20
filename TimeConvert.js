//时间转换
//时间戳/日期相互转换

var TimeConvert = new Vue({
    el: '#TimeConvert',

    data: {
        inputTime: '',
        convertResult: "&nbsp",
        timeInterval: null,
        isComputed: true
    },

    created: function () {
        this.ticker()
    },

    methods: {
        setConvertResult: function (msg) {
            this.convertResult = msg
        },

        convertTime: function () {
            var inputTime = this.inputTime
            if (this.isDateTimeFormat()) {
                var result = this.convertDateToTimstamp(this.inputTime)

                if (!result) {
                    this.setConvertResult("请输入正确的时间格式!")
                } else {
                    this.setConvertResult(result)
                }
            } else {
                inputTime = parseInt(inputTime)
                if (!inputTime) {
                    this.setConvertResult("请输入正确的时间格式!")
                } else {
                    this.setConvertResult(this.convertTimestampToDate(inputTime))
                }
            }
        },

        isDateTimeFormat: function () {
            var inputTime = this.inputTime

            if (inputTime.indexOf('-') == -1) {
                return false
            }

            if (inputTime.indexOf(':') == -1) {
                return false
            }

            return true
        },

        convertDateToTimstamp: function (dateStr) {
            var date = new Date(dateStr)
            if (date < 0) {
                return false
            }

            var ts = date.getTime()

            if (!ts) {
                return false
            } else {
                return parseInt(ts / 1000)
            }
        },

        convertTimestampToDate: function (ts) {
            if (ts < 10000000000) {
                ts = ts * 1000
            }

            var date = new Date(ts)
            var YYYY = date.getFullYear()
            var MM = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
            var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
            var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
            var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

            return YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss
        },

        getCurrentTimestamp: function () {
            var date = new Date()
            return parseInt(date.getTime() / 1000)
        },

        selectInputTimeAll: function (e) {
            e.toElement.select()
            clearInterval(this.timeInterval)
        },

        ticker: function () {
            this.timeInterval = setInterval(() => {
                this.inputTime = this.convertTimestampToDate(this.getCurrentTimestamp())
                this.convertTime()
            }, 500)
        }
    }
})