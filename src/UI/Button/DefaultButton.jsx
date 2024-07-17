import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const EditedButton = styled(Button)({
    textTransform: 'none',
    backgroundColor: '#8A84E2',
    '&:hover': {
        backgroundColor: '#84AFE6'
    }
});


function DefaultButton(props) {
    return (
        <EditedButton variant="contained" className={props.className} href={props.href}>
            {props.children}
        </EditedButton>
    );
}

export default DefaultButton;