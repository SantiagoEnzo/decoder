import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
const Buffer = require('buffer').Buffer
const resExt='\nExito';
const resFail='\nEntrada inválida';
let regexB64 = new RegExp('([-A-Za-z0-9+/=]){2000,}')
const mensaje = "Ctrl + v en cualquier parte \n"

function save(filename, data) {
    const blob = new Blob([data], {type: 'text/plain'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}

function decodeToFile(pasted){
let text = Buffer.from(pasted, 'base64')
if (text.toString('utf-8',1,4)==='PDF'){
	return makePDF(text);
}
else if (text.toString('utf-8',0,1)==='0'){
	return makeCer(text)
}
	else return false
}

function makeCer(text){
	//let cer = new Blob([text],{ type: "text/plain" });
	//console.log(cer)
	let today = new Date();
	let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	let time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
	let filename = "cer"+date+" "+time+" .cer";
	save(filename,text);
	return true
}

function makePDF(text){
	let pdf = new Blob([text],{ type: "application/pdf" });
	return serveFile(pdf);
}

function serveFile(f){
	let objURL = URL.createObjectURL(f);
	window.open(objURL);
	return true;
}


class Decoder extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
				respuesta:mensaje
		};
	}

	seHaPasteao(e){
		let res=resFail;
		let text = e.clipboardData.getData('Text');
		// console.log(text);
		// console.log(text.match(regexB64))
		let b64Text = text.match(regexB64);
		if(b64Text[0] !== undefined){
			// console.log(b64Text[0]);
			if (decodeToFile(b64Text[0])) {
				res=resExt
			}
		}
		else {res=resFail}
	this.setState({
		respuesta:res
	});
	}

	render(){

	return (
			<input className="app" spellCheck="false" role="button" tabIndex="0" 
			onChange={function noop(){}}
			onPaste={e => this.seHaPasteao(e)} 
			value={this.state.respuesta} 
			/>
		);




	}



}







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Decoder />);
