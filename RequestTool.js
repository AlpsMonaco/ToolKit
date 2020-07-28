//通用的请求工具
//动态添加post表单数据
//动态添加header
//get/post请求

window.preload.Session.loadHistorySession().finally(() => {
    var RequestTool = new Vue({
        el: '#RequestTool',

        created: function () {
            if (!window.preload.Session.session.contentType) {
                this.ContentType = this.ContentTypeList[0]
            } else {
                this.ContentType = window.preload.Session.session.contentType
            }

            if (!window.preload.Session.session.method) {
                this.method = this.methodList[0]
            } else {
                this.method = window.preload.Session.session.method
            }
        },
        mounted() {
            document.body.style.display = 'inline'
        },

        data: {
            url: '',
            method: '',
            ContentType: '',
            response: '',
            isPreserveResponse: false,

            methodList: ['GET', 'POST'],
            ContentTypeList: ['application/json', 'application/x-www-form-urlencoded',],

            addContentType: false,
            // showFormList: false,
            // showJsonArea: false,
            // showContentType: false,

            customizedContentType: '',

            formList: [],
            jsonInput: ""
        },

        computed: {
            showFormList: function () {
                if (this.method == 'GET' || this.ContentType != 'application/x-www-form-urlencoded') {
                    return false
                }

                return true
            },

            showJsonArea: function () {
                if (this.method == 'GET' || this.ContentType != 'application/json') {
                    return false
                }

                return true
            },

            showContentType: function () {
                return this.method != 'GET'
            }
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
                    console.log(error)
                    return
                }

                if (!data) {
                    return
                }

                this.jsonInput = JSON.stringify(data, null, 4)
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
                window.preload.Session.session.contentType = this.ContentType
                window.preload.Session.session.method = this.method
                window.preload.Session.updateSessionHistory()

                this.prepareUrl()

                this.getAxios().then(
                    response => this.printResponse((response.data))
                ).catch(
                    error => { this.printResponse('err'); console.log(error) }
                )
            },

            prepareUrl: function () {
                if (this.url.indexOf('http') != 0) {
                    this.url = 'http://' + this.url
                }
            },

            printResponse: function (msg) {
                if (this.isPreserveResponse) {
                    msg = this.response + '<br>' + msg
                }

                this.response = msg
            }
        }
    })

})
