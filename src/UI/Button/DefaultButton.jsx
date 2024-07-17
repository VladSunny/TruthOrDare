import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const EditedButton = styled(Button)({
    textTransform: 'none',
});


function DefaultButton(props) {
    return (
        <EditedButton variant="contained" className={props.className}>
            {props.children}
        </EditedButton>
    );
}

export default DefaultButton;