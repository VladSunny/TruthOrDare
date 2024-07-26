import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, {useEffect} from "react";
import { supabase } from "../database/database";

function Idea() {
    const [isDare, setIsDare] = React.useState(false);
    const [result, setResult] = React.useState('');
    const [ideas, setIdeas] = React.useState([]);

    useEffect(() => {
        const fetchIdeas = async () => {
            const { data } = await supabase.from("ideas").select("*").eq("accepted", true);
            setIdeas(data);
        };

        fetchIdeas();
    }, []);

    const getRandomIdea = () => {
        if (isDare) {
            const dares = ideas.filter(idea => idea.is_dare);
            return dares[Math.floor(Math.random() * dares.length)].idea;
        }
        else {
            const truths = ideas.filter(idea => !idea.is_dare);
            return truths[Math.floor(Math.random() * truths.length)].idea;
        }
    }

    return (
        <div className='h-fit variantfill-four flex flex-col items-center'>
            <h1 className='text-3xl md:text-4xl lg:text-6xl w-11/12 md:w-2/3 py-10 variantfill-two p-5 my-5 rounded-2xl flex justify-center shadow-lg'>
                Правда или действие?
            </h1>

            <p className="flex justify-center text-1xl md:text-2xl lg:text-3xl w-11/12 md:w-2/3 variantfill-one p-5 rounded-2xl text-center mb-5">
                В базе данных сайта собраны лучшие вопросы для комфортной игры в "Правда или действие".
                Нажмите на кнопку ниже, и получите слуйчаный вопрос или действие из списка
            </p>

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

            <div className="my-5">
                <Button color="success" variant='contained' size='large' onClick={() => setResult(getRandomIdea())}>получить идею</Button>
            </div>

            <div className='variantfill-three rounded-3xl w-11/12 my-10 p-5 flex items-center justify-center flex-col'>
                {result}
            </div>
        </div>
    )
}

export default Idea;
