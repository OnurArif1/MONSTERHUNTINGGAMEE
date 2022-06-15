new Vue
(
    {
    el : "#app",
    data : {
        player_heal : 100,
        monster_heal : 100,
        logs : [],/*burada bir tane özellik ekledik ve method fonk içindeki fonksiyonlara impelemente ettik*/
        game_is_on : false,
        attack_multiple : 10,
        special_attack_multiple : 25,
        heal_up_multiple : 20,
        monster_attack_multiple : 25,
        log_text : 
        {
            attack : "OYUNCU ATAĞI :",
            special_attack : "ÖZEL OYUNCU ATAĞI : ",
            monster_attack : "CANAVAR ATAĞI : ",
            heal_up : "İLK YARDIM",
            give_up : "OYUNCU PES ETTİ!!!"
        },
        counter_attack:0,
        counter_special_attack:0,
        counter_first_aid:0,
        counter_giv_up:0
    },
    methods : 
    {
        start_game : function()/*game_is_on tıklandığında zaman yeni oyun başlasın*/
        {
            this.game_is_on = true;
        },
        attack : function()
        {
            var point = Math.ceil(Math.random() * this.attack_multiple);/*burada canavarın canını azaltmak istedik.Buradaki ceil özelliği bir int değer olmasını sağlar*/
            this.monster_heal-=point;/*bu kodla da canavarın canı düşer*/
            this.add_to_log({ turn : "p", text : this.log_text.attack + point})/*burada oyuncun naptığını ekrana basan kod*/
            this.monster_attack();/*canavara daha fazla zarar vermek için 25 yapptık*/
        },
        special_attack : function()
        {
            var point = Math.ceil(Math.random() * this.special_attack_multiple);/*burada canavarın canını azaltmak istedik.Buradaki ceil özelliği bir int değer olmasını sağlar*/
            this.monster_heal-=point;/*bu kodla da canavarın canı düşer*/
            this.add_to_log({ turn : "p", text : this.log_text.special_attack + point })/*burada oyuncun naptığını ekrana basan kod*/
            this.monster_attack();
        },
        heal_up : function()
        {
            var point = Math.ceil(Math.random() * this.heal_up_multiple);/*burada canavarın canını azaltmak istedik.Buradaki ceil özelliği bir int değer olmasını sağlar*/
            this.player_heal+=point;/*bu canımız artar*/
            this.add_to_log({ turn : "p", text : this.log_text.heal_up + point})/*burada oyuncun naptığını ekrana basan kod*/
            this.monster_attack();
        },
        give_up: function()
        {
            this.player_heal = 0;
            this.add_to_log({ turn : "p", text : this.log_text.give_up})/*burada oyuncun naptığını ekrana basan kod*/
        },
        monster_attack : function()
        {
            var point = Math.ceil(Math.random() * this.monster_attack_multiple);/*burada bizim canımızı azaltmak istedik.Buradaki ceil özelliği bir int değer olmasını sağlar*/
            this.player_heal-=point;/*bu kodla da bizim canımız düşer*/
            this.add_to_log({ turn : "m", text : this.log_text.monster_attack + point})
        },
        add_to_log : function(log)
        {
            this.logs.push(log);
        }
    },
    watch : 
    {
        player_heal : function(value)/*burada da % gösteren barın 0-100 arasında olması için yazılan kod*/
        {
            if(value <= 0)/*burada confirm özelliği sayesinde bşr mesaj illettik*/
            {
                this.player_heal = 0;
                if(confirm("Oyunu KAYBETTİN. Tekrar denemek ister misin?"))
                {
                    this.player_heal = 100;/*burada da kimin kazanıp kimin kaybettiğini belişrttik*/
                    this.monster_heal = 100;
                    this.logs = [];
                }
            } else if(value >= 100) {
                this.player_heal = 100
            }
        },
        monster_heal : function(value)
        {
            if(value <= 0)
            {
                this.monster_heal = 0;
                if(confirm("Oyunu KAZANDIN. Tekrar denemek ister misin?"))
                {
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = [];
                }
                /*canavarın can alma durumu olmadığı için diğer fonkisyonu yazmadık*/
            }
        }
    },
    computed : 
    {
        player_progress : function()
        {
            return
            {
                width : this.player_heal + "%"
            }
        },
        monster_progress : function()
        {
            return 
            {
                width : this.monster_heal + "%"
            }
        }
    }
})