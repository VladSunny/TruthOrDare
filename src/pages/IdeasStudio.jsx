import React from 'react';
import TextField from '@mui/material/TextField';
import { Alert, Button, FormControlLabel, Radio, RadioGroup, Snackbar } from '@mui/material';
import { supabase } from '../database/Database';
import { useUser } from '../UserContext';

function IdeasStudio() {
    const { lastSubmissionTime, setLastSubmissionTime } = useUser();
    const [isDare, setIsDare] = React.useState(false);
    const [idea, setIdea] = React.useState('');
    const [correctState, setCorrectState] = React.useState({
        open: false
    });
    const [errorState, setErorState] = React.useState({
        open: false,
        text: ""
    });

    const handleClick = (newState) => async () => {
        if (!idea) return;

        const currentTime = new Date().getTime();
        const freezeDuration = 1 * 60 * 1000; // 1 minute in milliseconds

        if (lastSubmissionTime && currentTime - lastSubmissionTime < freezeDuration) {
            setErorState({ ...errorState, open: true, text: "Секуд до возможности отправления идеи: " + (freezeDuration - (currentTime - lastSubmissionTime)) / 1000});
            return
        }
        
        const { data, error } = await supabase.from("ideas").insert({
            idea: idea,
            is_dare: isDare,
        });

        console.log(data, error);

        if (error) {
            setErorState({ ...errorState, open: true, text: "Что-то пошло не так..." });
            return;
        }

        setLastSubmissionTime(currentTime);
        setErorState({ ...errorState, open: false });
        setCorrectState({ ...newState, open: true });
    };

    const handleCorrectClose = () => {
        setCorrectState({ ...correctState, open: false });
    };

    const handleErrorClose = () => {
        setErorState({ ...errorState, open: false });
    };

    return (
        <div className="h-screen flex flex-col items-center font-sans variantfill-four">
            <div className="w-11/12 md:w-2/3 rounded-2xl mt-5 flex items-center justify-center py-10 md:py-10 variantfill-two shadow-lg" >
                <h1 className='text-3xl md:text-5xl lg:text-6xl text-center'>
                    Поделись своей идеей, возможно она попадет в общий список!
                </h1>
            </div>
            <div className='mt-10 w-full flex flex-col items-center justify-center gap-5'>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Опиши свою идею"
                    multiline
                    className='w-5/6 md:w-1/2'
                    onChange={(e) => setIdea(e.target.value)}
                />
                <div>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        onChange={(event) => setIsDare(event.target.value === 'dare')}
                        defaultValue={'truth'}
                    >
                        <FormControlLabel value="truth" control={<Radio />} label="Правда" />
                        <FormControlLabel value="dare" control={<Radio />} label="Действие" />
                    </RadioGroup>
                </div>

                <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center', error: false, text: "Предложение успешно отправленно!" })} color="success" variant='contained' size='large'>Отправить</Button>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={correctState.open}
                onClose={handleCorrectClose}
                key={'correct'}
                autoHideDuration={3000}
            >
                <Alert
                    onClose={handleCorrectClose}
                    severity={'success'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Предложение успешно отправленно
                </Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={errorState.open}
                onClose={handleErrorClose}
                key={'error'}
                autoHideDuration={5000}
            >
                <Alert
                    onClose={handleErrorClose}
                    severity={'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorState.text}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default IdeasStudio;
