const result=document.querySelector('.result');
const number=document.querySelectorAll('.numb');
const otherMathOperation=document.querySelectorAll('.mathOperation')
const operationMath =document.querySelectorAll('.math');
const equalBtn=document.querySelector('.equal');
const clearBtn=document.querySelector('.clear');
const decimalSeparatorBtn=document.querySelector('.decimalSep');

let operator='';
let previousValue=0;
let currentValue=0;
let transitionValue=0;

function AddNumber (eventKey) {
  let firstNumber;
  if(typeof(eventKey)=='string'){
    firstNumber=eventKey;
  }
  else{
 
    firstNumber =eventKey.target.innerText;
  }

   if (transitionValue !==''){

    result.value=''
    transitionValue =''
   }
     
   result.value +=firstNumber;
   
   };

 number.forEach( (item) => {
    item.addEventListener('click', AddNumber);
    
  });

  function delet(){
    result.value ='';
    currentValue=0;
    previousValue=0; 
    transitionValue=0;
  }
  
     
clearBtn.addEventListener('click',delet);


decimalSeparatorBtn.addEventListener('click',()=>{
  
  if (result.value.includes('.')){
    return;
  }
  result.value +='.';

});


function Mathround (){
  
  if (result.value.length >13){
  result.value=Number(result.value).toFixed(11);
  }

}


function mathOperationOther (event){
  
  let value =event.target.innerText;
 
 switch(value) {
  case '+/-':
   result.value = result.value*(-1);
   Mathround();
    break;

   case '%':
     result.value =parseFloat(result.value)/100;
     Mathround();
     previousValue = result.value;
    break;

    default:
      return;
  }
};


otherMathOperation.forEach((item)=>{
  item.addEventListener('click', mathOperationOther);
  
});


function mathOperation (event){
  
  if(typeof(event) == 'string'){
  operator = event }
  else{
   
    operator = event.target.innerText;
    
  }
 
      if (parseFloat(previousValue) !==0 ){
 
        currentValue=result.value;
        calculate();
        previousValue=result.value;
      
      }
      else {
         
        previousValue = result.value;
       
          result.value='';
   
     }
}


operationMath.forEach((item)=>{
  item.addEventListener('click', mathOperation);
  
});



function calculate (){

  let currentValue=result.value;
  
  switch (operator) {
   case '÷':
   case '/': 
       
      if (currentValue === 0){
       result.value=`it isn't possible`;
       return;
      }

     result.value =parseFloat(previousValue)/parseFloat(currentValue);
      Mathround();
      transitionValue=result.value;
      previousValue=0;
      
     break;
  
   case '×':
   case '*': 
   
     result.value = parseFloat(previousValue)*parseFloat(currentValue)
     Mathround();
     transitionValue=result.value;
     previousValue=0;
     
     break;

   case '-': 
          
     result.value = parseFloat(previousValue)-parseFloat(currentValue);
     Mathround();
     transitionValue=result.value;
     previousValue=0;

     break;

   case '+': 
     result.value = parseFloat(previousValue)+parseFloat(currentValue);
     Mathround();
     transitionValue=result.value;
     previousValue=0;

      break;

    default :
     return;

}
}


  equalBtn.addEventListener('click',calculate);
 
  
 document.addEventListener('keydown', function (event) {
  
  let operators =/[+\-*\/]/;
  
    if((event.key >=0 || event.key <=9)){
      
      AddNumber(event.key);

    }

    if (event.key === '.') {
      
     result.value += event.key;
    }

    if (event.key.match(operators)) {
      mathOperation (event.key);
     
    }

    if (event.key === 'Enter' || event.key === '=') {
     
      calculate()
    }

    if (event.key === 'Delete') {
    
      delet();
    }

    if (event.key === 'Backspace'){
      result.value=result.value.slice(0,-1);

    }

  event.preventDefault();
  });
 
  