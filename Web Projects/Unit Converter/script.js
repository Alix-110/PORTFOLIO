function convert(){
  const val = parseFloat(document.getElementById("inputValue").value);
  const from = document.getElementById("unitFrom").value;
  const to = document.getElementById("unitTo").value;
  const resultElem = document.getElementById("result");

  if(isNaN(val)){
    resultElem.innerText = "Please enter a valid number";
    return;
  }

  let converted = val;

  // Length conversions
  const length = {
    m:1, km:1000, cm:0.01, mm:0.001
  };

  // Weight conversions
  const weight = {
    kg:1, g:0.001, lb:0.453592, oz:0.0283495
  };

  if(from in length && to in length){
    converted = val * length[from] / length[to];
  } else if(from in weight && to in weight){
    converted = val * weight[from] / weight[to];
  } else if(from==='c' || from==='f' || from==='k'){
    let tempC;
    if(from==='c') tempC = val;
    if(from==='f') tempC = (val -32)*5/9;
    if(from==='k') tempC = val -273.15;

    if(to==='c') converted = tempC;
    if(to==='f') converted = tempC*9/5 +32;
    if(to==='k') converted = tempC +273.15;
  } else {
    resultElem.innerText = "Cannot convert between these units";
    return;
  }

  resultElem.innerText = `${val} ${from} = ${converted.toFixed(4)} ${to}`;
}
