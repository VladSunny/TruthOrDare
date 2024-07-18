import React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Slider from '@mui/material/Slider';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import axios from 'axios';


function Game() {
    const [temperature, setTemperature] = React.useState(0.5);
    const [prompt, setPrompt] = React.useState('');
    const [isDare, setIsDare] = React.useState(false);

    const settings = {
        modelUri: "gpt://b1gfks0khjkqtiosesft/yandexgpt-lite",
        completionOptions: {
            stream: false,
            temperature: 0,
            maxTokens: "2000"
        },
        messages: [
        ]
    }

    const url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion";
    const headers = {
        "Content-Type": "text/plain",
        "Authorization": "Api-Key AQVNxR6zGEOE6NwZxLzAg__WTaw2R788WOjcY1Dk"
    };

    const onSubmit = () => {
        console.log(temperature, prompt, isDare);

        settings.completionOptions.temperature = temperature;
        settings.messages.push({ role: "user", text: prompt });

        axios.post(url, JSON.stringify(settings), { headers: { headers } })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div className='h-screen variantfill-four flex flex-col items-center'>
            <h1 className='text-3xl md:text-4xl lg:text-6xl w-11/12 md:w-2/3 py-10 variantfill-two p-5 mt-5 rounded-2xl flex justify-center shadow-lg'>
                Правда или действие?
            </h1>
            <div className='mt-10 w-11/12 py-10 variantfill-one shadow-md rounded-3xl flex flex-col justify-center items-center gap-10'>
                <h1 className='text-2xl'>Настройки</h1>
                <TextField
                    id="standard-multiline-flexible"
                    label="Ваше пожелание"
                    helperText="Необязательно"
                    multiline
                    variant="filled"
                    className='w-5/6 md:w-2/5'
                    onChange={(e) => setPrompt(e.target.value)}
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
                <div class="flex flex-row w-full items-center justify-center">
                    <ThermostatIcon sx={{fontSize: '2rem', marginRight: '1vw'}} />
                    <div class="w-2/3 md:w-1/3 lg:w-1/4">
                        <Slider
                            defaultValue={0.5}
                            valueLabelDisplay="auto"
                            shiftStep={30}
                            step={0.1}
                            marks
                            min={0.1}
                            max={1}
                            onChange={(e) => setTemperature(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <Button color="success" variant='contained' onClick={onSubmit}>сгенерировать</Button>
            </div>
        </div>
    );
}

export default Game;