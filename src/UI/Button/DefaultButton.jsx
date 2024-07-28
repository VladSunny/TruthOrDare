import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const EditedButton = styled(Button)({
    textTransform: 'none',
    backgroundColor: '#8A84E2',
    '&:hover': {
        backgroundColor: '#84AFE6'
    },
    boxShadow: '0px 4px 20px rgba(138, 132, 226, 0.25)',
});


function DefaultButton(props) {
    return (
        <EditedButton variant="contained" className={props.className} href={props.href} color={props.color} size={props.size}>
            {props.children}
        </EditedButton>
    );
}

export default DefaultButton;