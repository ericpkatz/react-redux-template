import React from 'react';

const ConfirmationModal = ( { onConfirm, children, message })=> {
  let modal;
  const openModal = ()=> {
    window.$(modal).modal().show();
  };
  return (
    <div>
      <div ref={ (ref)=> modal = ref } id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Confirmation</h4>
              </div>
              <div className="modal-body">
                <p>{ message }</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
                <button type="button" className="btn btn-success" data-dismiss='modal' onClick={ onConfirm }>Yes</button>
              </div>
            </div>
          </div>
        </div>
      <div onClick={ openModal }>{ children }</div>
    </div>
  );
};


export default ConfirmationModal; 
