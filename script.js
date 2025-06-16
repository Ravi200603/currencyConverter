const currencies = [
  { code: "AUD", country: "Australia", flag: "🇦🇺" },
  { code: "BGN", country: "Bulgaria", flag: "🇧🇬" },
  { code: "BRL", country: "Brazil", flag: "🇧🇷" },
  { code: "CAD", country: "Canada", flag: "🇨🇦" },
  { code: "CHF", country: "Switzerland", flag: "🇨🇭" },
  { code: "CNY", country: "China", flag: "🇨🇳" },
  { code: "CZK", country: "Czech Republic", flag: "🇨🇿" },
  { code: "DKK", country: "Denmark", flag: "🇩🇰" },
  { code: "EUR", country: "Eurozone", flag: "🇪🇺" },
  { code: "GBP", country: "United Kingdom", flag: "🇬🇧" },
  { code: "HKD", country: "Hong Kong", flag: "🇭🇰" },
  { code: "HUF", country: "Hungary", flag: "🇭🇺" },
  { code: "IDR", country: "Indonesia", flag: "🇮🇩" },
  { code: "ILS", country: "Israel", flag: "🇮🇱" },
  { code: "INR", country: "India", flag: "🇮🇳" },
  { code: "ISK", country: "Iceland", flag: "🇮🇸" },
  { code: "JPY", country: "Japan", flag: "🇯🇵" },
  { code: "KRW", country: "South Korea", flag: "🇰🇷" },
  { code: "MXN", country: "Mexico", flag: "🇲🇽" },
  { code: "MYR", country: "Malaysia", flag: "🇲🇾" },
  { code: "NOK", country: "Norway", flag: "🇳🇴" },
  { code: "NZD", country: "New Zealand", flag: "🇳🇿" },
  { code: "PHP", country: "Philippines", flag: "🇵🇭" },
  { code: "PLN", country: "Poland", flag: "🇵🇱" },
  { code: "RON", country: "Romania", flag: "🇷🇴" },
  { code: "SEK", country: "Sweden", flag: "🇸🇪" },
  { code: "SGD", country: "Singapore", flag: "🇸🇬" },
  { code: "THB", country: "Thailand", flag: "🇹🇭" },
  { code: "TRY", country: "Turkey", flag: "🇹🇷" },
  { code: "USD", country: "United States", flag: "🇺🇸" },
  { code: "ZAR", country: "South Africa", flag: "🇿🇦" }
];

const from = document.querySelector('#From')
const to = document.querySelector('#To');
const submit = document.querySelector('#submit')
const amount = document.querySelector('#amount')
const div = document.querySelector('#div')
let submitted = false;

currencies.forEach((currency)=>{
    const option = document.createElement('option');
    option.value = `${currency.code}`;
    option.textContent = `${currency.code} --- ${currency.country} ${currency.flag}`;
    from.appendChild(option);
})
currencies.forEach((currency) => {
    const option = document.createElement('option');
    option.value = `${currency.code}`
    option.textContent= `${currency.code} --- ${currency.country} ${currency.flag}` 
    to.appendChild(option);
});

async function convertedAmount(){
    if(!amount.value || !to.value ||!from.value ||amount.value == NaN|| to.value === from.value){
        div.innerHTML = `Please Enter the Valid input fields`
    }
    else{
    try{
    const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from.value}&symbols=${to.value}`).then();
    const readableresponse = await response.json();
    const rate = readableresponse.rates[to.value];
    div.innerHTML = `${amount.value} ${from.value} is equal to ${(amount.value*rate).toFixed(2)} ${to.value} <br> 
    1${from.value} = ${rate}${to.value}`;
    }
    catch{
        div.innerHTML = `Sorry our server is down cannot process your request at this point
        please try again later`
    }
}
}

submit.addEventListener('click',(e)=>{
    e.preventDefault();
    submitted = true;
    convertedAmount();
})

from.addEventListener('change', ()=>{
    if(submitted){
        convertedAmount()}
    });
to.addEventListener('change', ()=>{
    if(submitted){
        convertedAmount()}
    });
amount.addEventListener('change', ()=>{
    if(submitted ){
        convertedAmount()}
    });




