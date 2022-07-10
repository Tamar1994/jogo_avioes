
function start(){

    $("#inicio").hide();
    $("#gameover").remove();
    $("#vida").remove();
    $("#pontuacao").remove();

    $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame").append("<div id='inimigo1' class='anima2'></div");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame").append("<div id='disparo'></div>");
    $("#fundoGame").append("<div id='disparo2'></div>");
    $("#fundoGame").append("<div id='pontuacao'></div>");
    $("#fundoGame").append("<div id='vida'></div>");

    var statusDisparo = "hidden";
    var statusDisparo2 = "hidden";

    var jogo = {};

    var TECLA = {
        W: 87,
        S: 83,
        D: 68
    };

    var direcao = 1;

    var autorizarDisparo = 0;

    var pontuacao = 0;  

    var vida = 3;

    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
    });

    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    })


    jogo.pressionou = [];

    jogo.timer = setInterval(loop,30);

    function pararJogo(){
        window.clearInterval(jogo.timer);
        jogo.timer=null;

        $("#amigo").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#jogador").remove();
        $("#disparo").remove();
        $("#disparo2").remove();

        $("#fundoGame").append("<div id='gameover'><h1> GAME OVER </h1><p><button class='restart' onclick='start()'> REINICICAR</button></p></div>");
        
    
    }

    function loop(){
        movefundo();
        movejogador();
        moveinimigo1();
        moveinimigo2();
        moveamigo();
        disparoInimigo();

        if(statusDisparo=="visible"){
            moverDisparo();
        }

        if(statusDisparo2=="visible"){
            moverDisparo2();
        }

        colisao();
        atualizarPontuacao();
        
        if(vida==2){
            $("#vida").css("background-image", "url(/imgs/energia2.png)");
        } else if(vida==1){
            $("#vida").css("background-image", "url(/imgs/energia1.png)");
        } else if(vida==0){
            $("#vida").css("background-image", "url(/imgs/energia0.png")
            pararJogo();
        }
    }
    
    function movefundo(){

        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position", esquerda-1);
    }

    function moveinimigo1(){
        esquerdainimigo = parseInt($("#inimigo1").css("left"));

        if(esquerdainimigo>0){
            $("#inimigo1").css("left", esquerdainimigo-3);
        } else {
        $("#inimigo1").css("left", 689);
        var novaAltura = Math.floor(Math.random() * 371) + 70;
        $("#inimigo1").css("top", novaAltura);
        }

    }

    function moveinimigo2(){
        esquerdainimigo2 = parseInt($("#inimigo2").css("left"));

        if(esquerdainimigo2>0){
            $("#inimigo2").css("left", esquerdainimigo2-2);
        } else {
            $("#inimigo2").css("left", 775)
        }

    }

    function moveamigo(){
        esquerdaamigo = parseInt($("#amigo").css("left"));


        if(esquerdaamigo==10){
            direcao = 1;
        } 

        if(esquerdaamigo==500){
            direcao = 2;
        }

        if(direcao==1){
            $("#amigo").css("left", esquerdaamigo+1);
        }

        if(direcao==2){
            $("#amigo").css("left", esquerdaamigo-1);
        }
    }

    function moverDisparo(){
        
        esquerdaDisparo = parseInt($("#disparo").css("left"));

        if(esquerdaDisparo<900){
            $("#disparo").css("left", esquerdaDisparo+10);
        } else {
            $("#disparo").css("visibility", "hidden");
            $("#disparo").css("left", 200);
            statusDisparo = "hidden";
        }
        
    }

    function moverDisparo2(){
        quedaDisparo = parseInt($("#disparo2").css("top"));
        alturaTotal = parseInt($("#container").css("height"));


        quedaMax = alturaTotal - 200;

        if(quedaDisparo<quedaMax){
            $("#disparo2").css("top", quedaDisparo + 5);
        } else {
            $("#disparo2").css("top", 0);
            $("#disparo2").css("visibility", "hidden");
            statusDisparo2 = "hidden";
        }
    }

    function movejogador(){
        if(jogo.pressionou[TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            if(topo>10){
            $("#jogador").css("top", topo-10);
            }
        }

        if (jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            var divHeight = parseInt($("#container").css("height"));
            var maxHeight = divHeight - 200;
            if(maxHeight>topo){
            $("#jogador").css("top", topo+10);
            }
        }

        if (jogo.pressionou[TECLA.D]){


            //FUNÇÃO DISPARO            
            if(statusDisparo=="hidden"){
                
                var alturaDisparo = parseInt($("#jogador").css("top"));
                
                $("#disparo").css("top", alturaDisparo+41);
                $("#disparo").css("visibility", "visible");     
                statusDisparo = "visible";          
            } 

        }


    }

    function colisao() {

        var colisao1 = ($("#jogador").collision($("#inimigo1")));

        if(colisao1.length>0){
            
            $("#jogador").css("background-image", "url(/imgs/explosao.png)");
            $(".anima1").css("backgroud-image", "url(/imgs/explosao.png)");
            $(".anima1").css("animation", "play .3s steps(8) infinite");
            $(".anima1").css("-moz-animation", "play .3s steps(8) infinite");
            $(".anima1").css("-webkit-animation", "play .3s steps(8) infinite");
            $(".anima1").css("-o-animation", "play .3s steps(8) infinite");
            $(".anima1").css("-ms-animation", "play .3s steps(8) infinite");
            $("#inimigo1").css("left", 689);
            var novaAltura = Math.floor(Math.random() * 371) + 70;
            $("#inimigo1").css("top", novaAltura);
            $("#disparo").css("visibility", "hidden");
            $("#disparo").css("left", 200);
            statusDisparo = "hidden";
            vida = vida - 1;


            var delayInMilissencond = 2000;

            setTimeout(function(){
                $("#jogador").css("background-image", "url(/imgs/apache.png)");
                $(".anima1").css("backgroud-image", "url(/imgs/apache.png)");
                $(".anima1").css("animation", "play .5s steps(2) infinite");
                $(".anima1").css("-moz-animation", "play .5s steps(2) infinite");
                $(".anima1").css("-webkit-animation", "play .5s steps(2) infinite");
                $(".anima1").css("-o-animation", "play .5s steps(2) infinite");
                $(".anima1").css("-ms-animation", "play .5s steps(2) infinite");
            }, delayInMilissencond);
        }

        var colisao2 = ($("#disparo").collision($("#inimigo1")));

        if(colisao2.length>0){
            $("#inimigo1").css("left", 689);
            var novaAltura = Math.floor(Math.random() * 371) + 70;
            $("#inimigo1").css("top", novaAltura);
            $("#disparo").css("visibility", "hidden");
            $("#disparo").css("left", 200);
            statusDisparo = "hidden";
            pontuacao = pontuacao + 1;
        }

        var colisao3 = ($("#disparo").collision($("#inimigo2")));

        if(colisao3.length>0){
            $("#inimigo2").css("left", 775);
            $("#disparo").css("visibility", "hidden");
            $("#disparo").css("left", 200);
            statusDisparo = "hidden";
            pontuacao = pontuacao + 1;
        }

        var colisao4 = ($("#amigo").collision($("#inimigo2")));

        if(colisao4.length>0){
            $("#amigo").css("background-image", "url(/imgs/amigo_morte.png)");
            $(".anima3").css("backgroud-image", "url(/imgs/amigo_morte.png)");
            $(".anima3").css("animation", "play2 .5s steps(7) infinite");
            $(".anima3").css("-moz-animation", "play2 .5s steps(7) infinite");
            $(".anima3").css("-webkit-animation", "play2 .5s steps(7) infinite");
            $(".anima3").css("-o-animation", "play2 .5s steps(7) infinite");
            $(".anima3").css("-ms-animation", "play2 .5s steps(7) infinite");
            $("#inimigo2").css("left", 775);
            direcao = 0;
            vida = vida -1;

            var delayInMilissencond = 2000;

            setTimeout(function(){
                $("#amigo").css("background-image", "url(/imgs/amigo.png)");
                $(".anima3").css("backgroud-image", "url(/imgs/amigo.png)");
                $(".anima3").css("animation", "play2 .9s steps(12) infinite");
                $(".anima3").css("-moz-animation", "play2 .9s steps(12) infinite");
                $(".anima3").css("-webkit-animation", "play2 .9s steps(12) infinite");
                $(".anima3").css("-o-animation", "play2 .9s steps(12) infinite");
                $(".anima3").css("-ms-animation", "play2 .9s steps(12) infinite");
                $("#amigo").css("left", 10);
            }, delayInMilissencond);
        }

        var colisao4 = ($("#amigo").collision($("#inimigo1")));

        if(colisao4.length>0){
            $("#amigo").css("background-image", "url(/imgs/amigo_morte.png)");
            $(".anima3").css("backgroud-image", "url(/imgs/amigo_morte.png)");
            $(".anima3").css("animation", "play2 .5s steps(7) infinite");
            $(".anima3").css("-moz-animation", "play2 .5s steps(7) infinite");
            $(".anima3").css("-webkit-animation", "play2 .5s steps(7) infinite");
            $(".anima3").css("-o-animation", "play2 .5s steps(7) infinite");
            $(".anima3").css("-ms-animation", "play2 .5s steps(7) infinite");
            $("#inimigo1").css("left", 689);
            var novaAltura = Math.floor(Math.random() * 371) + 70;
            $("#inimigo1").css("top", novaAltura);
            direcao = 0;
            vida = vida - 1;

            var delayInMilissencond = 2000;

            setTimeout(function(){
                $("#amigo").css("background-image", "url(/imgs/amigo.png)");
                $(".anima3").css("backgroud-image", "url(/imgs/amigo.png)");
                $(".anima3").css("animation", "play2 .9s steps(12) infinite");
                $(".anima3").css("-moz-animation", "play2 .9s steps(12) infinite");
                $(".anima3").css("-webkit-animation", "play2 .9s steps(12) infinite");
                $(".anima3").css("-o-animation", "play2 .9s steps(12) infinite");
                $(".anima3").css("-ms-animation", "play2 .9s steps(12) infinite");
                $("#amigo").css("left", 10);
            }, delayInMilissencond);
        }

        var colisao5 = ($("#amigo").collision($("#disparo2")));

        if(colisao5.length>0){
            $("#amigo").css("background-image", "url(/imgs/amigo_morte.png)");
            $(".anima3").css("backgroud-image", "url(/imgs/amigo_morte.png)");
            $(".anima3").css("animation", "play2 .5s steps(7) infinite");
            $(".anima3").css("-moz-animation", "play2 .5s steps(7) infinite");
            $(".anima3").css("-webkit-animation", "play2 .5s steps(7) infinite");
            $(".anima3").css("-o-animation", "play2 .5s steps(7) infinite");
            $(".anima3").css("-ms-animation", "play2 .5s steps(7) infinite");
            $("#disparo2").css("top", 0);
            $("#disparo2").css("visibility", "hidden");
            statusDisparo2 = "hidden";
            direcao = 0;
            vida = vida - 1;

            var delayInMilissencond = 2000;

            setTimeout(function(){
                $("#amigo").css("background-image", "url(/imgs/amigo.png)");
                $(".anima3").css("backgroud-image", "url(/imgs/amigo.png)");
                $(".anima3").css("animation", "play2 .9s steps(12) infinite");
                $(".anima3").css("-moz-animation", "play2 .9s steps(12) infinite");
                $(".anima3").css("-webkit-animation", "play2 .9s steps(12) infinite");
                $(".anima3").css("-o-animation", "play2 .9s steps(12) infinite");
                $(".anima3").css("-ms-animation", "play2 .9s steps(12) infinite");
                $("#amigo").css("left", 10);
            }, delayInMilissencond);
        }



    }

    function disparoInimigo() {

        distanciaInimigo1 = parseInt($("#inimigo1").css("left"));

        distanciaAmigo = parseInt($("#amigo").css("left"));

        diferencaDistancia = (distanciaInimigo1+50) - distanciaAmigo;


        if(diferencaDistancia>-1&&diferencaDistancia<4){
            autorizarDisparo = 1;
        }

        if(autorizarDisparo==1){
            distanciaDisparo = parseInt($("#inimigo1").css("left"));
            alturaDisparoInimigo = parseInt($("#inimigo1").css("top"));

            $("#disparo2").css("left", distanciaDisparo+100);
            $("#disparo2").css("top", alturaDisparoInimigo+65);
            $("#disparo2").css("visibility", "visible");
            statusDisparo2 = "visible";
            autorizarDisparo = 0;
        }

    }

    function atualizarPontuacao() {

        $("#pontuacao").text(pontuacao);

    }

}

