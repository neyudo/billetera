const search = document.getElementById('search')
const matchList = document.getElementById('match-list')


//JSON online en la web
const api_url = 'https://tokens.pancakeswap.finance/pancakeswap-extended.json'
const buscadatos = async  precios => {
    const response = await fetch(api_url);
    const datos = await response.json();
    /*
    var resul = [];
    resul.push(Object.values(datos.tokens));
    console.log(datos);
    */
    let matches = datos.tokens.filter(dato =>{
        const regex = new RegExp(`^${precios}`, 'gi');
        return dato.symbol.match(regex) /*|| dato.price.match(regex)*/;

    });
    console.log(matches);

    // creo una constante que me da los Match
    const piru = matches.map(match => `
    ${match.address}`);
    console.log(piru);
    //funcion en la que encadeno los match con la api 
    function coincidir() 
    {
        for (let index = 0; index < piru.length; index++) {
            const element = piru[index];
            var url = "https://api.pancakeswap.info/api/v2/tokens" + "/" + element;
            url = url.replace(/(\r\n|\n|\r|"| )/gm, "");
            console.log(url);

            async function cargarCripto() 
            {
                const rep = await fetch(url);
                const datitos = await rep.json();
                console.log(datitos.data);

            }
            cargarCripto()

        }
        
        
    }
    coincidir()

    
};

search.addEventListener('input', () => buscadatos(search.value));
