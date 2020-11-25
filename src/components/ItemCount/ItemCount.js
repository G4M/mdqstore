import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'

function ItemCount({ inmaxmin, thisCart, updateThisCart}) {
    return (
        <React.Fragment>
            <div className="btn-toolbar d-flex justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                <ButtonGroup>
                    <Button disabled={thisCart === inmaxmin[0]} onClick={() => (updateThisCart(-1))} >-</Button>
                    <Button disabled>{thisCart}</Button>
                    <Button disabled={thisCart === inmaxmin[2]} onClick={() => (updateThisCart(1))}>+</Button>
                </ButtonGroup>
            </div>
        </React.Fragment>
    )
}

export default ItemCount;