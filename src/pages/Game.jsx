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
    const [result, setResult] = React.useState('');

    const darePrompt = "Твоя задача сгенерировать интересное задание в виде действия, учитывая пожелания пользовтеля";
    const truthPrompt = "Твоя задача сгенерировать интересный вопрос, учитывая пожелания пользователя"

    const settings = {
        modelUri: "gpt://b1gfks0khjkqtiosesft/yandexgpt/latest",
        completionOptions: {
            stream: false,
            temperature: 0,
            maxTokens: "1000"
        },
        messages: [
        ]
    }

    // const url = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion";
    // const headers = {
    //     "Content-Type": "application/json",
    //     "Authorization": "Api-Key AQVNxR6zGEOE6NwZxLzAg__WTaw2R788WOjcY1Dk"
    // };

    const onSubmit = () => {
        console.log(temperature, prompt, isDare);

        settings.completionOptions.temperature = temperature;
        settings.messages = [];

        if (isDare) {
            settings.messages.push({ role: "user", text: darePrompt });
        } else {
            settings.messages.push({ role: "user", text: truthPrompt });
        }

        if (prompt) settings.messages.push({ role: "user", text: prompt });
        else settings.messages.push({ role: "user", text: "Особых пожеланий нет" });

        axios.post('http://localhost:3001/api/completion', settings)
        .then(response => {
            // console.log(response.data);
            console.log(response.data.result.alternatives[0].message.text);
            setResult(response.data.result.alternatives[0].message.text);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div className='h-fit variantfill-four flex flex-col items-center'>
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
            <div className='variantfill-three rounded-3xl w-11/12 my-10 p-5 flex items-center justify-center flex-col'>
                <h1 className='text-3xl font-extrabold'>Ответ</h1>
                <p className='mt-10 text-2xl'>
                    {result}
                </p>
            </div>
        </div>
    );
}

export default Game;