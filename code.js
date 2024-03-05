fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(async function(json){
        
        //Creacion de filas y columnas con class para bootstrap
        for (let i = 0; i < 3; i++){

            let row = document.createElement("div");
            row.className = "row";
            row.id = "row" + i;
            document.getElementById("container").appendChild(row);

            for(let x = 0; x < 4; x++){

                let col = document.createElement("div");
                col.className = "col";
                col.id = "col" + x;
                document.getElementById("row"+i).appendChild(col);
            }
        }

        //Añadir informacion en las columnas
        for (let i = 0; i < 3; i++){
            let elementChild = document.getElementById("row" + i);
            for(const child of elementChild.children){

                let random = Math.floor(Math.random() * 20); //Numero aleatorio capado a 20 porque la API esta capada en 20 resultados.

                //Foto del Pokemon
                let img = document.createElement("img");

                //Al usar await podemos hacer otra call en la API para recoger más datos que nos interesen desde otra ruta de la misma
                //Y a su vez esperará a que termine antes de seguir por lo que esta segunda call termina antes que la primera.
                let src = await fetch(json.results[random].url).
                                    then(response2 => response2.json()).
                                    then(function(json2){
                                        let src = [json2.sprites.front_default, json2.sprites.back_default];//Array que guarda imagenes de frente y espaldas
                                        return src;
                                    });

                //Imagen del pokemon.
                img.src = src[0];
                child.appendChild(img);

                //Nombre del pokemon.
                let text = document.createElement("p");
                let pokeName = document.createTextNode(json.results[random].name);
                text.appendChild(pokeName);
                child.appendChild(text);

                //Slider donde se muestran las imágenes de espalda.
                let slide = document.createElement("swiper-slide");
            
                let imgBack = document.createElement("img");
                imgBack.src = src[1];
                slide.appendChild(imgBack);
                document.getElementById("slider").appendChild(slide);

            }
        }
      });