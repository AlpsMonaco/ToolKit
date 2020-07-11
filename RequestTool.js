var test = () => {
    window.Bridge.p()
}

//通用的请求工具
//动态添加post表单数据
//动态添加header
//get/post请求

var RequestTool = new Vue({
    el: '#RequestTool',

    created: function () {
        this.method = this.methodList[0]
        this.ContentType = this.ContentTypeList[0]
    },

    data: {
        url: '',
        method: '',
        ContentType: '',
        response: '',
        isPreserveResponse: false,

        methodList: ['POST', 'GET'],
        ContentTypeList: ['application/json', 'application/x-www-form-urlencoded',],

        showFormList: false,
        showJsonArea: false,
        addContentType: false,
        showContentType: false,

        customizedContentType: '',

        formList: [],
        jsonInput: ""
    },

    watch: {
        method: function (selectedMethod) {
            if (selectedMethod == 'GET') {
                this.hideFormArea()
                this.showContentType = false
                return
            }

            this.switchFormAreaByContentType(this.ContentType)
            this.showContentType = true
        },

        ContentType: function (selectedContentType) {
            this.switchFormAreaByContentType(selectedContentType)
        },
    },

    methods: {
        cancelAddContentType: function () {
            this.customizedContentType = ''
            this.addContentType = false
        },

        confirmAddContentType: function () {
            if (this.customizedContentType == '') {
                return
            }

            this.ContentTypeList.pop()
            this.ContentTypeList.push(this.customizedContentType)
            this.ContentTypeList.push("自定义")
            this.ContentType = this.customizedContentType

            this.cancelAddContentType()
        },

        addFormList: function () {
            this.formList.push(
                { key: "", value: "" }
            )
        },

        popFormList: function (position) {
            position = parseInt(position)
            this.formList.splice(position, 1)
        },

        formatJsonInput: function () {
            var data
            var f = (str) => {
                eval(`
                data = `+ str + `
                `)
            }

            try {
                f(this.jsonInput)
            } catch (error) {
                return
            }

            if (!data) {
                return
            }

            this.jsonInput = JSON.stringify(data, null, 4)
        },

        hideFormArea: function () {
            this.showFormList = false
            this.showJsonArea = false
        },

        switchFormAreaByContentType: function (selectedContentType) {
            this.hideFormArea()
            if (selectedContentType == '自定义') {
                this.addContentType = true
            } else if (selectedContentType == "application/json") {
                this.showJsonArea = true
            } else if (selectedContentType == "application/x-www-form-urlencoded") {
                this.showFormList = true
            } else {
                this.showFormList = true
            }
        },

        getParam: function () {
            if (this.ContentType == 'application/json') {
                var result = {}

                try {
                    result = JSON.parse(this.jsonInput)
                } catch (error) {
                    console.log(error)
                }

                return result

            } else {
                var postParam = new URLSearchParams()
                for (var v of this.formList) {
                    if (v.key != "") {
                        postParam.set(v.key, v.value)
                    }
                }

                return postParam
            }
        },

        getAxios: function () {
            if (this.method == 'GET') {
                return axios.get(this.url)
            } else {
                var param = this.getParam()
                return axios.post(this.url, param)
            }
        },

        requestWithAxios: function () {
            this.getAxios().then(
                response => this.printResponse(response.data)
            ).catch(
                error => { this.printResponse('err'); console.log(error) }
            )
        },

        printResponse: function (msg) {
            if (this.isPreserveResponse) {
                msg = this.response + '<br>' + msg
            }

            this.response = msg
        }
    }
})