var app = new Vue({
    el:'#app',
    data: {
        title: "from city to city: ",
        startingZip:'',
        endingZip:'',
        endingCity:'',
        startingCity:''
    },
    watch: {
        startingZip: function(){
            this.startingCity = ''
            if(this.startingZip.length > 4){
                this.lookupApi()
                //call API
            }
        }
    },
    methods:{
        lookupApi:_.debounce(function(){
            var app = this
            app.startingCity="searching ...."
            axios.get('http://ziptasticapi.com/' + app.startingZip)
                .then(function(response){
                    app.startingCity = response.data.city + ',' + response.data.state
                })
                .catch(function(error) {
                    app.startingCity = "invalid zip code"
                })
        },500)//wait 1/2second
    },
    computed:{
    }
})