import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
const Buffer = require('buffer').Buffer
const resExt='\nExito';
const resFail='\nEntrada inválida';

const mensaje = "Ctrl + v en cualquier parte \n"


function decodePDF(p){
let text = Buffer.from(p, 'base64')
if (text.toString('utf-8',1,4)=='PDF'){
let pdf = new Blob([text],{ type: "application/pdf" });
let pdfURL = URL.createObjectURL(pdf);
window.open(pdfURL);
return true;

}
else {return false}
}


class Decoder extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
				respuesta:mensaje
		};
	}
	// decod(e){
	// let res = b64.decode(sample);//
	//console.log(res);
	// }

	seHaPasteao(e){
		let res;
		if (decodePDF(e.clipboardData.getData('Text'))) {
			res=resExt
		}
		else {res=resFail}
	// decodePDF(sample);
	// console.log('paste')
	this.setState({
		respuesta:res
	});
	}

	render(){

	return (
			<input className="app" spellCheck="false" role="button" tabIndex="0" onPaste={e => this.seHaPasteao(e)} value={this.state.respuesta} />
		);




	}



}







const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Decoder />);
