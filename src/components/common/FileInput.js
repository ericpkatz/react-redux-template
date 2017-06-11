import React, { Component } from 'react';

class FileInput extends Component{
  constructor(){
    super();
    this.onChangeFile = this.onChangeFile.bind(this);
  }
  componentDidUpdate(){
    if(!this.props.imageData){
      this.refs.fileInput.value = null;
    }
  }
  onChangeFile(ev){
    const { onChangeFile } = this.props;
    const reader = new FileReader();
    reader.onloadend = (output)=> {
      const imageData = output.target.result;
      onChangeFile(imageData);
    };
    reader.readAsDataURL(ev.target.files[0]);
  }
  render(){
    return (
      <div>
        <input ref='fileInput' accept="image/*" onChange={ this.onChangeFile } type='file'/>
      </div>
    );
  }
}

export default FileInput;
