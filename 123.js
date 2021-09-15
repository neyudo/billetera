const search = document.getElementById('search')
const matchList = document.getElementById('match-list')


//JSON online en la web
const api_url = 'https://api.pancakeswap.info/api/v2/tokens'
const buscadatos = async  precios => {
    const response = await fetch('https://api.pancakeswap.info/api/v2/tokens');



    const datos = await response.json();
    var resul = [];
    resul.push(Object.values(datos.data));

    let matches = resul[0].filter(dato =>{
        const regex = new RegExp(`^${precios}`, 'gi');
        return dato.symbol.match(regex) /*|| dato.price.match(regex)*/;
    });
    if(precios.length === 0 )
    {
        matches = [];
        matchList.innerHTML = '';
    }
    outputHtml(matches);
};

// Show results in html
const outputHtml = matches => 
{
    if (matches.length > 0) 
    {
        const html = matches.map(match => `
            <div class="card card-body mb-1">
              <h4>${match.symbol} <span class="text-primary">${match.price}</span> </h4>
            </div>
        
        `)
        .join('');
    matchList.innerHTML = html;   
    }


};


search.addEventListener('input', () => buscadatos(search.value));
