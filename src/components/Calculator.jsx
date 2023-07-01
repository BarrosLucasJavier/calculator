import { useRef, useState } from 'react';
import './calculator.css';
import { theme1, theme2, theme3 } from '../models/themeColors'

const Calculator = () => {
    
    const keyboard = ["7","8","9","DEL","4","5","6","+","1","2","3","-",".","0","/","x","RESET","="];
    
    
    const [calculator, setCalculator ] = useState({
        number:0,
        result:0,
        sign:""
    });
    
    const calcTitle = useRef();
    const screen = useRef();
    const keys = useRef();
    

    const delHandler = ()=>{
        setCalculator({
            number: calculator.number.toString().substring(0, calculator.number.length - 1 )
        })
    }
    const resetHandler = ()=>{
        setCalculator({
            number:0,
            result:0,
            sign:""
        })
    }
    const comaHandler = (e)=>{
        e.preventDefault();
        const value = e.target.innerHTML;

        if (calculator.number === "0" || calculator.number === 0) {
            setCalculator({
                ...calculator,
                number:  calculator.number + value
            })
        } else {
            setCalculator({
                ...calculator,
                number: !calculator.number.includes(".") ? calculator.number + value : calculator.number
            }) 
        }
    }
    const equalHandler = (e)=>{
        e.preventDefault();
        
        if (calculator.sign && calculator.number) {
            const operation = (a, b, sign) =>{
                switch (sign) {
                    case "+":
                        return a + b
                    case "-":
                        return a - b
                    case "x":
                        return a * b
                    case "/":
                        return a / b
                    default:
                        break;
                }
            }

            setCalculator({
                ...calculator,
                result: calculator.number === "0" && calculator.sign === "/"
                ? "Error: Can't divide with 0"
                : operation(+calculator.result, +calculator.number, calculator.sign),
                sign:"",
                number:0
            })
        }
        console.log(calculator.result);
        console.log(calculator.number);
    }
    const operationHandler = (e)=>{
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalculator({
            sign: value,
            result: !calculator.result && calculator.number ? calculator.number : calculator.result,
            number:0
        })
    }
    const numberHandler = (e)=>{
        e.preventDefault();
        const value = e.target.innerHTML;
        if(calculator.number === 0){
            setCalculator({
            ...calculator,
            number: value
        })}else{
            setCalculator({
                ...calculator,
                number: calculator.number + value
            })
        }
        
        
    }
    const handleTheme = (t)=>{
        switch (t) {
            case "1":
                theme1.map(theme =>{
                    document.documentElement.style.setProperty(theme.var , theme.value);
                })
                calcTitle.current.style.color = 'white'
                screen.current.style.color = 'white'
                document.getElementsByClassName('equal')[0].style.color='white';
                document.getElementsByClassName('toggle-container')[0].style.justifyContent = "start"
                break;
            case "2":
                theme2.map(theme =>{
                    document.documentElement.style.setProperty(theme.var , theme.value);
                })
                calcTitle.current.style.color = 'hsl(60, 10%, 19%)'
                screen.current.style.color = 'hsl(60, 10%, 19%)'
                document.getElementsByClassName('equal')[0].style.color='white'
                document.getElementsByClassName('toggle-container')[0].style.justifyContent = "center"
                break;
            case "3":
                theme3.map(theme =>{
                    document.documentElement.style.setProperty(theme.var , theme.value);
                })
                calcTitle.current.style.color = 'hsl(52, 100%, 62%)'
                screen.current.style.color = 'hsl(52, 100%, 62%)'
                document.documentElement.style.setProperty("--text-dark" , "hsl(52, 100%, 62%)");
                document.getElementsByClassName('equal')[0].style.color='black'
                document.getElementsByClassName('toggle-container')[0].style.justifyContent = "end"
                break;
            default:
                break;
        }
        
    }
    
    return (
        <main className='calc'>
            <div ref={calcTitle} className='calc-title'>
                <h1>calc</h1>
                <p>THEME</p>
                <div>
                    <div className='theme-opt'>
                        <span onClick={() =>handleTheme("1")}>1</span>
                        <span onClick={() =>handleTheme("2")}>2</span>
                        <span onClick={() =>handleTheme("3")}>3</span>
                    </div>
                    <div className='toggle-container'><button></button></div>
                </div>
            </div>
            <div ref={screen} className='calc-screen'>
                <p>{calculator.number ? calculator.number : calculator.result
                }</p>
            </div>
            <div ref={keys} className='calc-keyboard'>
                {keyboard.map((btn, index) =>{
                    return <button className={btn === '=' ? 'equal': btn}
                                    key={index}
                                    onClick={ btn === "DEL"
                                    ? delHandler
                                    : btn === "RESET"
                                    ? resetHandler
                                    : btn === "."
                                    ? comaHandler
                                    : btn === "="
                                    ? equalHandler
                                    : btn === "-" || btn === "+" || btn === "/" || btn === "x"
                                    ? operationHandler
                                    : numberHandler
                                    }>{btn}</button>
                })}
            </div>
        </main>
    );
}

export default Calculator;
