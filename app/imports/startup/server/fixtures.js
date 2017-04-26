import { Meteor } from 'meteor/meteor';
import { Products } from '../../api/products/products.js';

Meteor.startup(() => {
  if (Products.find().count() === 0) {
    Products.insert({
      id: "5236547251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/547/251/5236547251_2_6_2.jpg?t=1490117526108",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-corta-gr%C3%A1fico-(colecci%C3%B3n-marc-m%C3%A1rquez)-c29070p500234616.html#251",
      price: "12,99"
    });

    Products.insert({
      id: "5236541800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/541/800/5236541800_2_6_2.jpg?t=1490096298935",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-corta-gr%C3%A1fico-(colecci%C3%B3n-marc-m%C3%A1rquez)-c29070p500234606.html#800",
      price: "12,99"
    });

    Products.insert({
      id: "5236542824_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/542/824/5236542824_2_6_2.jpg?t=1490096373288",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-corta-gr%C3%A1fico-(colecci%C3%B3n-marc-m%C3%A1rquez)-c29070p500234608.html#824",
      price: "12,99"
    });

    Products.insert({
      id: "5236543800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/543/800/5236543800_2_6_2.jpg?t=1490096450255",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-corta-gr%C3%A1fico-(colecci%C3%B3n-marc-m%C3%A1rquez)-c29070p500234610.html#800",
      price: "12,99"
    });

    Products.insert({
      id: "5236544251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/544/251/5236544251_2_6_2.jpg?t=1490096517446",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-corta-gr%C3%A1fico-(colecci%C3%B3n-marc-m%C3%A1rquez)-c29070p500234612.html#251",
      price: "12,99"
    });

    Products.insert({
      id: "5236546800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/546/800/5236546800_2_6_2.jpg?t=1490698525519",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-corta-gr%C3%A1fico-(colecci%C3%B3n-marc-m%C3%A1rquez)-c29070p500234614.html#800",
      price: "12,99"
    });

    Products.insert({
      id: "5201545250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5201/545/250/5201545250_2_6_2.jpg?t=1490803735444",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/polo-basico-colores-c29070p500101006.html#250",
      price: "9,99"
    });

    Products.insert({
      id: "5201545800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5201/545/800/5201545800_2_6_2.jpg?t=1490803735444",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/polo-basico-colores-c29070p500101006.html#800",
      price: "9,99"
    });

    Products.insert({
      id: "5236524623_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/524/623/5236524623_2_6_2.jpg?t=1490714583314",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-franjas-estructura-colores-c29070p500202019.html#623",
      price: "12,99"
    });

    Products.insert({
      id: "5236558401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/558/401/5236558401_2_6_2.jpg?t=1490785273580",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-bolsillo-estampado-rayas-c29070p500242549.html#401",
      price: "9,99"
    });

    Products.insert({
      id: "5236524707_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/524/707/5236524707_2_6_2.jpg?t=1490714583314",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-franjas-estructura-colores-c29070p500202019.html#707",
      price: "12,99"
    });

    Products.insert({
      id: "5236525251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/525/251/5236525251_2_6_2.jpg?t=1489676423941",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-raya-fina-manga-doblada-c29070p500210518.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5201545401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5201/545/401/5201545401_2_6_2.jpg?t=1490803735444",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/polo-basico-colores-c29070p500101006.html#401",
      price: "9,99"
    });

    Products.insert({
      id: "5236538622_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/538/622/5236538622_2_6_2.jpg?t=1490024223769",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-texto---high-risk-c29070p500227153.html#622",
      price: "9,99"
    });

    Products.insert({
      id: "5236521800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/521/800/5236521800_2_6_2.jpg?t=1490283129511",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampada-spray-c29070p500202011.html#800",
      price: "12,99"
    });

    Products.insert({
      id: "5236521250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/521/250/5236521250_2_6_2.jpg?t=1490283129511",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampada-spray-c29070p500202011.html#250",
      price: "12,99"
    });

    Products.insert({
      id: "5236552800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/552/800/5236552800_2_6_2.jpg?t=1490179363232",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-esampada-rayas-c29070p500253056.html#800",
      price: "12,99"
    });

    Products.insert({
      id: "5236552251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/552/251/5236552251_2_6_2.jpg?t=1490179363232",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-esampada-rayas-c29070p500253056.html#251",
      price: "12,99"
    });

    Products.insert({
      id: "5201509305_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5201/509/305/5201509305_2_6_2.jpg?t=1490024167046",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/polo-rayas-color-mostaza-c29070p500227140.html#305",
      price: "14,99"
    });

    Products.insert({
      id: "5236551251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/551/251/5236551251_2_6_2.jpg?t=1490868164388",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-franja-estampada-c29070p500242551.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5236562622_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/562/622/5236562622_2_6_2.jpg?t=1490881533169",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camisa-rosa-print-fotogr%C3%A1fico-c29070p500263521.html#622",
      price: "9,99"
    });

    Products.insert({
      id: "5236549251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/549/251/5236549251_2_6_2.jpg?t=1490798425014",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-texto-manga-corta-c29070p500242547.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5201508501_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5201/508/501/5201508501_2_6_2.jpg?t=1490183748414",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/polo-rayas-color-verde-botella-c29070p500227138.html#501",
      price: "14,99"
    });

    Products.insert({
      id: "5236517506_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/517/506/5236517506_2_6_2.jpg?t=1490176765634",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-kaki-estampada-c29070p500197011.html#506",
      price: "9,99"
    });

    Products.insert({
      id: "5236520401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/520/401/5236520401_2_6_2.jpg?t=1489510639643",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-azul-raya-fina-c29070p500197014.html#401",
      price: "9,99"
    });

    Products.insert({
      id: "5236519250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/519/250/5236519250_2_6_2.jpg?t=1490117382206",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-rayas-c29070p500197013.html#250",
      price: "9,99"
    });

    Products.insert({
      id: "5236518305_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/518/305/5236518305_2_6_2.jpg?t=1489510490047",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-mostaza-estampada-c29070p500197012.html#305",
      price: "9,99"
    });

    Products.insert({
      id: "5236537251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/537/251/5236537251_2_6_2.jpg?t=1490289700373",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampada-allover-c29070p500227150.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5236537401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/537/401/5236537401_2_6_2.jpg?t=1490289700373",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampada-allover-c29070p500227150.html#401",
      price: "9,99"
    });

    Products.insert({
      id: "5237528800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/528/800/5237528800_2_6_2.jpg?t=1489742069890",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampada-manzana-c29070p500035121.html#800",
      price: "7,99"
    });

    Products.insert({
      id: "5236539800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/539/800/5236539800_2_6_2.jpg?t=1490024281547",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-darkmetal-negra-c29070p500227155.html#800",
      price: "9,99"
    });

    Products.insert({
      id: "5236516800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/516/800/5236516800_2_6_2.jpg?t=1489510340849",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-fit-hombro-pasado-c29070p500197010.html#800",
      price: "9,99"
    });

    Products.insert({
      id: "5201506250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5201/506/250/5201506250_2_6_2.jpg?t=1489147498707",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/polo-blanco-print-all-over-c29070p500217003.html#250",
      price: "14,99"
    });

    Products.insert({
      id: "5236530401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/530/401/5236530401_2_6_2.jpg?t=1488539856510",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-rayas-bolsillo-estampado-c29070p500218520.html#401",
      price: "9,99"
    });

    Products.insert({
      id: "5236531250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/531/250/5236531250_2_6_2.jpg?t=1488994108057",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-blanca-estampada-bolsillo-c29070p500218521.html#250",
      price: "9,99"
    });

    Products.insert({
      id: "5236513400_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/513/400/5236513400_2_6_2.jpg?t=1489147258198",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-corta-rayas-efecto-tie-dye-c29070p500194015.html#400",
      price: "9,99"
    });

    Products.insert({
      id: "5236513609_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/513/609/5236513609_2_6_2.jpg?t=1489147258198",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-corta-rayas-efecto-tie-dye-c29070p500194015.html#609",
      price: "9,99"
    });

    Products.insert({
      id: "5236523251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/523/251/5236523251_2_6_2.jpg?t=1487336290499",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-rayas-gruesas-c29070p500202014.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5201505401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5201/505/401/5201505401_2_6_2.jpg?t=1489145983071",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/polo-azul-marino-estampado-c29070p500217002.html#401",
      price: "14,99"
    });

    Products.insert({
      id: "5237529250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/529/250/5237529250_2_6_2.jpg?t=1488470576627",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampada-bicicleta-c29070p500035122.html#250",
      price: "7,99"
    });

    Products.insert({
      id: "5236523531_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/523/531/5236523531_2_6_2.jpg?t=1487336290499",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-rayas-gruesas-c29070p500202014.html#531",
      price: "9,99"
    });

    Products.insert({
      id: "5237527250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/527/250/5237527250_2_6_2.jpg?t=1488470376570",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampada-raton-queso-c29070p500035120.html#250",
      price: "7,99"
    });

    Products.insert({
      id: "5237594251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/594/251/5237594251_2_6_2.jpg?t=1487861373076",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-rect%C3%A1ngulo-a-rayas-c29070p500169007.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5237526800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/526/800/5237526800_2_6_2.jpg?t=1488553436388",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampada-pez-globo-c29070p500035119.html#800",
      price: "7,99"
    });

    Products.insert({
      id: "5236500828_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/500/828/5236500828_2_6_2.jpg?t=1488962502497",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-paneles-bolsillo-c29070p500178010.html#828",
      price: "9,99"
    });

    Products.insert({
      id: "5236516250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/516/250/5236516250_2_6_2.jpg?t=1489510340849",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-fit-hombro-pasado-c29070p500197010.html#250",
      price: "9,99"
    });

    Products.insert({
      id: "5237592401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/592/401/5237592401_2_6_2.jpg?t=1487862993723",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-circulo-a-rayas-c29070p500169005.html#401",
      price: "9,99"
    });

    Products.insert({
      id: "5236500251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/500/251/5236500251_2_6_2.jpg?t=1488962502497",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-paneles-bolsillo-c29070p500178010.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5237579401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/579/401/02/5237579401_2_6_2.jpg?t=1488387216365",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-jacquard-marinera-c29070p500129531.html#401s02",
      price: "9,99"
    });

    Products.insert({
      id: "5237579251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/579/251/02/5237579251_2_6_2.jpg?t=1488387216365",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-jacquard-marinera-c29070p500129531.html#251s02",
      price: "9,99"
    });

    Products.insert({
      id: "5236528251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/528/251/5236528251_2_6_2.jpg?t=1489067976230",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-bolsillo-estampado-c29070p500218518.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5237565505_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/565/505/5237565505_2_6_2.jpg?t=1487864231385",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-fotogr%C3%A1fico-tokyo-c29070p500101025.html#505",
      price: "9,99"
    });

    Products.insert({
      id: "5237566251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/566/251/5237566251_2_6_2.jpg?t=1489160659942",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-fotogr%C3%A1fico-par%C3%ADs-c29070p500101026.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5237563807_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/563/807/5237563807_2_6_2.jpg?t=1487757901918",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-fotogr%C3%A1fico-berl%C3%ADn-c29070p500101023.html#807",
      price: "9,99"
    });

    Products.insert({
      id: "5236532401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/532/401/5236532401_2_6_2.jpg?t=1487867334376",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-allover-bolsillo-a-contraste-c29070p500218522.html#401",
      price: "9,99"
    });

    Products.insert({
      id: "5236529251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/529/251/5236529251_2_6_2.jpg?t=1488474419717",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-rayas-bolsillo-estampado-c29070p500218519.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5237564746_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/564/746/5237564746_2_6_2.jpg?t=1487764813256",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-fotogr%C3%A1gico-estatua-libertad-c29070p500101024.html#746",
      price: "9,99"
    });

    Products.insert({
      id: "5237595250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/595/250/5237595250_2_6_2.jpg?t=1486744154960",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-paneles-rayas-c29070p500169008.html#250",
      price: "9,99"
    });

    Products.insert({
      id: "5237537821_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/537/821/5237537821_2_6_2.jpg?t=1488447965958",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-bolsillo-pecho-c29070p500050509.html#821",
      price: "9,99"
    });

    Products.insert({
      id: "5237530251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/530/251/5237530251_2_6_2.jpg?t=1487246901265",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-contraste-bolsillo-y-mangas-c29070p500035123.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5236501737_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/501/737/5236501737_2_6_2.jpg?t=1487334812926",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-corta-edici%C3%B3n-limitada-c29070p500189022.html#737",
      price: "9,99"
    });

    Products.insert({
      id: "5237537251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/537/251/5237537251_2_6_2.jpg?t=1488447965958",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-bolsillo-pecho-c29070p500050509.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5237537807_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/537/807/5237537807_2_6_2.jpg?t=1488447965958",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-bolsillo-pecho-c29070p500050509.html#807",
      price: "9,99"
    });

    Products.insert({
      id: "5237530824_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/530/824/5237530824_2_6_2.jpg?t=1487246901265",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-contraste-bolsillo-y-mangas-c29070p500035123.html#824",
      price: "9,99"
    });

    Products.insert({
      id: "5237562982_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/562/982/5237562982_2_6_2.jpg?t=1487343407806",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-paisaje-c29070p500101017.html#982",
      price: "7,99"
    });

    Products.insert({
      id: "5237561401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/561/401/5237561401_2_6_2.jpg?t=1487594297744",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-redondo-c29070p500101015.html#401",
      price: "7,99"
    });

    Products.insert({
      id: "5237560251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/560/251/5237560251_2_6_2.jpg?t=1487343317378",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-avi%C3%B3n-c29070p500101014.html#251",
      price: "7,99"
    });

    Products.insert({
      id: "5237710250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/710/250/5237710250_2_6_2.jpg?t=1487169826352",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampado-tigres-y-hojas-c29070p500122018.html#250",
      price: "9,99"
    });

    Products.insert({
      id: "5237711827_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/711/827/5237711827_2_6_2.jpg?t=1488448132312",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampado-tenis-c29070p500122019.html#827",
      price: "9,99"
    });

    Products.insert({
      id: "5237712800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/712/800/5237712800_2_6_2.jpg?t=1488448297832",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampado-n%C3%A1utico-c29070p500122020.html#800",
      price: "9,99"
    });

    Products.insert({
      id: "5237713401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/713/401/5237713401_2_6_2.jpg?t=1488464878114",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampado-all-over-c29070p500122021.html#401",
      price: "9,99"
    });

    Products.insert({
      id: "5237714250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/714/250/5237714250_2_6_2.jpg?t=1488464171935",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampado-all-over-c29070p500122022.html#250",
      price: "9,99"
    });

    Products.insert({
      id: "5236503305_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/503/305/5236503305_2_6_2.jpg?t=1487334070591",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-rayas-c29070p500193002.html#305",
      price: "12,99"
    });

    Products.insert({
      id: "5237595401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/595/401/5237595401_2_6_2.jpg?t=1486744154960",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-paneles-rayas-c29070p500169008.html#401",
      price: "9,99"
    });

    Products.insert({
      id: "5236503401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/503/401/5236503401_2_6_2.jpg?t=1487334070591",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-rayas-c29070p500193002.html#401",
      price: "12,99"
    });

    Products.insert({
      id: "5237599250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/599/250/5237599250_2_6_2.jpg?t=1486720314554",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampada-tigre-c29070p500189021.html#250",
      price: "9,99"
    });

    Products.insert({
      id: "5236501615_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5236/501/615/5236501615_2_6_2.jpg?t=1487334812926",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-corta-edici%C3%B3n-limitada-c29070p500189022.html#615",
      price: "9,99"
    });

    Products.insert({
      id: "5237522250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/522/250/5237522250_2_6_2.jpg?t=1487176848238",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-blanca-c29070p500034650.html#250",
      price: "9,99"
    });

    Products.insert({
      id: "5237524800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/524/800/5237524800_2_6_2.jpg?t=1486567201790",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-%60into-the-wild%C2%B4-c29070p500034652.html#800",
      price: "9,99"
    });

    Products.insert({
      id: "5237558405_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/558/405/5237558405_2_6_2.jpg?t=1487688360998",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-indigo-rayas-finas-c29070p500101012.html#405",
      price: "12,99"
    });

    Products.insert({
      id: "5237523800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/523/800/5237523800_2_6_2.jpg?t=1488447719136",
      productUrl: "phttps://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-negra-c29070p500034651.html#800roductUrl",
      price: "9,99"
    });

    Products.insert({
      id: "5237525827_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/525/827/5237525827_2_6_2.jpg?t=1487853050209",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-gris-c29070p500034653.html#827",
      price: "9,99"
    });

    Products.insert({
      id: "5237556251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/556/251/5237556251_2_6_2.jpg?t=1485872266571",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-indigo-rayas-y-print-c29070p500101010.html#251",
      price: "12,99"
    });

    Products.insert({
      id: "5237557405_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/557/405/5237557405_2_6_2.jpg?t=1488212911743",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-indigo-rayas-c29070p500101011.html#405",
      price: "12,99"
    });

    Products.insert({
      id: "5237514250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/514/250/5237514250_2_6_2.jpg?t=1485968142875",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-figuras-en-miniatura-c29070p500034505.html#250",
      price: "7,99"
    });

    Products.insert({
      id: "5237570800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/570/800/5237570800_2_6_2.jpg?t=1485964803616",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-cuello-cruzado-c29070p500096522.html#800",
      price: "9,99"
    });

    Products.insert({
      id: "5237584800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/584/800/5237584800_2_6_2.jpg?t=1490867422268",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-negra-c29070p500140015.html#800",
      price: "12,99"
    });

    Products.insert({
      id: "5237585250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/585/250/5237585250_2_6_2.jpg?t=1486111262829",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-bolsillo-textos-c29070p500140018.html#250",
      price: "12,99"
    });

    Products.insert({
      id: "5237513800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/513/800/5237513800_2_6_2.jpg?t=1486391579054",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-gr%C3%A1fica-frontal-c29070p500034504.html#800",
      price: "7,99"
    });

    Products.insert({
      id: "5237578827_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/578/827/5237578827_2_6_2.jpg?t=1486484977801",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-bandas-texturas-c29070p500129528.html#827",
      price: "12,99"
    });

    Products.insert({
      id: "5237554800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/554/800/5237554800_2_6_2.jpg?t=1485963407157",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-paris-c29070p500057005.html#800",
      price: "9,99"
    });

    Products.insert({
      id: "5237555251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/555/251/5237555251_2_6_2.jpg?t=1485511788202",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-london-c29070p500057006.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5237553824_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/553/824/5237553824_2_6_2.jpg?t=1485526285471",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-tokyo-c29070p500057004.html#824",
      price: "9,99"
    });

    Products.insert({
      id: "5202503600_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5202/503/600/5202503600_2_6_2.jpg?t=1483433664754",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/polo-b%C3%A1sico-piqu%C3%A9-c29070p500087530.html#600",
      price: "9,99"
    });

    Products.insert({
      id: "5237570505_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/570/505/5237570505_2_6_2.jpg?t=1485964803616",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-cuello-cruzado-c29070p500096522.html#505",
      price: "9,99"
    });

    Products.insert({
      id: "5237591800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/591/800/5237591800_2_6_2.jpg?t=1485968250825",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-bolsillo-contraste-c29070p500129545.html#800",
      price: "12,99"
    });

    Products.insert({
      id: "5237576800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/576/800/5237576800_2_6_2.jpg?t=1482341686726",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-pull-%26-bear-c29070p500119037.html#800",
      price: "9,99"
    });

    Products.insert({
      id: "5237575812_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/575/812/5237575812_2_6_2.jpg?t=1485278295277",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estructura-tipo-felpa-c29070p500108054.html#812",
      price: "15,99"
    });

    Products.insert({
      id: "5237574813_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/574/813/5237574813_2_6_2.jpg?t=1485526437547",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estructura-negra-bolsillo-c29070p500108053.html#813",
      price: "12,99"
    });

    Products.insert({
      id: "5237573811_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/573/811/5237573811_2_6_2.jpg?t=1485526362345",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estructura-bolsillo-c29070p500108052.html#811",
      price: "12,99"
    });

    Products.insert({
      id: "5237569800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/569/800/5237569800_2_6_2.jpg?t=1485278099877",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-raya-efecto-tie-dye-c29070p500108039.html#800",
      price: "9,99"
    });

    Products.insert({
      id: "5237531251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/531/251/5237531251_2_6_2.jpg?t=1485256020849",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-corta-print-roses-c29070p500035157.html#251",
      price: "12,99"
    });

    Products.insert({
      id: "5237569251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/569/251/5237569251_2_6_2.jpg?t=1485278099877",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-raya-efecto-tie-dye-c29070p500108039.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5237583250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/583/250/5237583250_2_6_2.jpg?t=1484909212608",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-delantero-c29070p500140003.html#250",
      price: "9,99"
    });

    Products.insert({
      id: "5237552251_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/552/251/5237552251_2_6_2.jpg?t=1485968179727",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-new-york-c29070p500057003.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "5237587250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/587/250/5237587250_2_6_2.jpg?t=1485345673747",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-texto-frontal-c29070p500154009.html#250",
      price: "12,99"
    });

    Products.insert({
      id: "5237532800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/532/800/5237532800_2_6_2.jpg?t=1482249105661",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-misfits-c29070p500035192.html#800",
      price: "14,99"
    });

    Products.insert({
      id: "5237508401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/508/401/5237508401_2_6_2.jpg?t=1482750997716",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-print-geometrico-c29070p500034114.html#401",
      price: "9,99"
    });

    Products.insert({
      id: "5237535251_2_4_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/535/251/5237535251_2_4_2.jpg?t=1481805137930",
      productUrl: "productUrl",
      price: "9,99"
    });

    Products.insert({
      id: "5237536800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/536/800/5237536800_2_6_2.jpg?t=1481805272209",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampada-manga-corta-c29070p500054003.html#800",
      price: "9,99"
    });

    Products.insert({
      id: "5237516250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/516/250/5237516250_2_6_2.jpg?t=1481121201280",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampada-manga-corta-c29070p500034507.html#250",
      price: "9,99"
    });

    Products.insert({
      id: "5237516800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/516/800/5237516800_2_6_2.jpg?t=1481121201280",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-estampada-manga-corta-c29070p500034507.html#800",
      price: "9,99"
    });

    Products.insert({
      id: "5237538250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/538/250/5237538250_2_6_2.jpg?t=1483542402675",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-volkswagen-c29070p500054007.html#250",
      price: "9,09"
    });

    Products.insert({
      id: "5237551800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/551/800/5237551800_2_6_2.jpg?t=1480085144811",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-felpa-c29070p500054023.html#800",
      price: "12,99"
    });

    Products.insert({
      id: "9244505506_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9244/505/506/9244505506_2_6_2.jpg?t=1480964602726",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-b%C3%A1sica-manga-corta-c29070p500034249.html#506",
      price: "7,99"
    });

    Products.insert({
      id: "5237545250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/545/250/5237545250_2_6_2.jpg?t=1483011213112",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-star-wars-c29070p500054016.html#250",
      price: "12,99"
    });

    Products.insert({
      id: "9244504506_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9244/504/506/9244504506_2_6_2.jpg?t=1480964497754",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-b%C3%A1sica-cuello-pico-c29070p500034250.html#506",
      price: "4,99"
    });

    Products.insert({
      id: "9237556251_2_4_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9237/556/251/9237556251_2_4_2.jpg?t=1480964950821",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-bolsillo-contraste-c29070p500120014.html#251",
      price: "9,99"
    });

    Products.insert({
      id: "9237554250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9237/554/250/9237554250_2_6_2.jpg?t=1490786092803",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-hombro-pasado-bajo-desigual-c29070p500122073.html#250",
      price: "7,99"
    });

    Products.insert({
      id: "5202503526_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5202/503/526/5202503526_2_6_2.jpg?t=1483433664754",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/polo-b%C3%A1sico-piqu%C3%A9-c29070p500087530.html#526",
      price: "9,99"
    });

    Products.insert({
      id: "9242553250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9242/553/250/9242553250_2_6_2.jpg?t=1480972071188",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-b%C3%A1sica-manga-corta-c29070p500034248.html#250",
      price: "7,99"
    });

    Products.insert({
      id: "9243511250_2_4_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9243/511/250/9243511250_2_4_2.jpg?t=1480964366187",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-rangl%C3%A1n-bolsillo-c29070p500034251.html#250",
      price: "9,99"
    });

    Products.insert({
      id: "9239524250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9239/524/250/9239524250_2_6_2.jpg?t=1480964274928",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-fitting-estrecho-c29070p500034252.html#250",
      price: "7,99"
    });

    Products.insert({
      id: "5202503250_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5202/503/250/5202503250_2_6_2.jpg?t=1483433664754",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/polo-b%C3%A1sico-piqu%C3%A9-c29070p500087530.html#250",
      price: "9,99"
    });

    Products.insert({
      id: "5240501401_2_4_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5240/501/401/5240501401_2_4_2.jpg?t=1480963740807",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-b%C3%A1sica-cuello-pico-c29070p500034247.html#401",
      price: "4,99"
    });

    Products.insert({
      id: "5237537623_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5237/537/623/5237537623_2_6_2.jpg?t=1488447965958",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-bolsillo-pecho-c29070p500050509.html#623",
      price: "9,99"
    });

    Products.insert({
      id: "9242553828_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9242/553/828/9242553828_2_6_2.jpg?t=1480972071188",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-b%C3%A1sica-manga-corta-c29070p500034248.html#828",
      price: "7,99"
    });

    Products.insert({
      id: "9242553609_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9242/553/609/9242553609_2_6_2.jpg?t=1480972071188",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-b%C3%A1sica-manga-corta-c29070p500034248.html#609",
      price: "7,99"
    });

    Products.insert({
      id: "9242553800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9242/553/800/9242553800_2_6_2.jpg?t=1480972071188",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-b%C3%A1sica-manga-corta-c29070p500034248.html#800",
      price: "7,99"
    });

    Products.insert({
      id: "9242553712_2_2_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9242/553/712/9242553712_2_2_2.jpg?t=1480972071188",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-b%C3%A1sica-manga-corta-c29070p500034248.html#712",
      price: "7,99"
    });

    Products.insert({
      id: "9237554403_2_4_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9237/554/403/9237554403_2_4_2.jpg?t=1490786092803",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-hombro-pasado-bajo-desigual-c29070p500122073.html#403",
      price: "7,99"
    });

    Products.insert({
      id: "5238527505_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5238/527/505/5238527505_2_6_2.jpg?t=1490786092803",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-hombro-pasado-bajo-desigual-c29070p500122073.html#505",
      price: "7,99"
    });

    Products.insert({
      id: "9237554800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9237/554/800/9237554800_2_6_2.jpg?t=1490786092803",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-hombro-pasado-bajo-desigual-c29070p500122073.html#800",
      price: "7,99"
    });

    Products.insert({
      id: "5238527611_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5238/527/611/5238527611_2_6_2.jpg?t=1490786092803",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-hombro-pasado-bajo-desigual-c29070p500122073.html#611",
      price: "7,99"
    });

    Products.insert({
      id: "9244504507_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9244/504/507/9244504507_2_6_2.jpg?t=1480964497754",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-b%C3%A1sica-cuello-pico-c29070p500034250.html#507",
      price: "4,99"
    });

    Products.insert({
      id: "9244504700_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9244/504/700/9244504700_2_6_2.jpg?t=1480964497754",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-b%C3%A1sica-cuello-pico-c29070p500034250.html#700",
      price: "4,99"
    });

    Products.insert({
      id: "5239566423_2_4_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/5239/566/423/5239566423_2_4_2.jpg?t=1489676974749",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-b%C3%A1sica-cuello-pico-c29070p500087533.html#423",
      price: "4,99"
    });

    Products.insert({
      id: "9243511828_2_2_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9243/511/828/9243511828_2_2_2.jpg?t=1480964366187",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-rangl%C3%A1n-bolsillo-c29070p500034251.html#828",
      price: "9,99"
    });

    Products.insert({
      id: "9243511800_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9243/511/800/9243511800_2_6_2.jpg?t=1480964366187",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-rangl%C3%A1n-bolsillo-c29070p500034251.html#800",
      price: "9,99"
    });

    Products.insert({
      id: "9243511401_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9243/511/401/9243511401_2_6_2.jpg?t=1480964366187",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-manga-rangl%C3%A1n-bolsillo-c29070p500034251.html#401",
      price: "9,99"
    });

    Products.insert({
      id: "9244505507_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9244/505/507/9244505507_2_6_2.jpg?t=1480964602726",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-b%C3%A1sica-manga-corta-c29070p500034249.html#507",
      price: "7,99"
    });

    Products.insert({
      id: "9244505700_2_6_2",
      imageUrl: "https://static.pullandbear.net/2/photos/2017/V/0/2/p/9244/505/700/9244505700_2_6_2.jpg?t=1480964602726",
      productUrl: "https://www.pullandbear.com/es/hombre/ropa/camisetas/camiseta-b%C3%A1sica-manga-corta-c29070p500034249.html#700",
      price: "7,99"
    });
  }
});
